"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CanvasFrameScrubberProps {
  videoId: string; // "video-1", "video-2", etc.
  frameCount?: number; // default 180
  triggerRef: React.RefObject<HTMLElement | null>;
  onProgress?: (progress: number) => void;
  className?: string;
  priority?: boolean;
}

export function CanvasFrameScrubber({
  videoId,
  frameCount = 180,
  triggerRef,
  onProgress,
  className = "",
  priority = false,
}: CanvasFrameScrubberProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState(1);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [loadedPercent, setLoadedPercent] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const trigger = triggerRef.current;
    if (!canvas || !trigger) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let isVisible = false;
    let scrubTimeout: NodeJS.Timeout;
    const images: (HTMLImageElement | null)[] = new Array(frameCount).fill(null);
    let lastRenderedIndex = -1;

    // Helper to format frame path: /frames/video-1/frame_0001.jpg
    const getFrameUrl = (index: number) => {
      const pad = String(index + 1).padStart(4, "0");
      return `/frames/${videoId}/frame_${pad}.jpg`;
    };

    // Draw image with object-fit: cover onto canvas
    const drawImageProp = (img: HTMLImageElement) => {
      if (!canvas || !ctx) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth || 1280;
      const ih = img.naturalHeight || 720;

      const hRatio = cw / iw;
      const vRatio = ch / ih;
      const ratio = Math.max(hRatio, vRatio);

      const nw = iw * ratio;
      const nh = ih * ratio;
      const cx = (cw - nw) / 2;
      const cy = (ch - nh) / 2;

      ctx.drawImage(img, 0, 0, iw, ih, cx, cy, nw, nh);
    };

    // Resize canvas with high-DPI scaling
    const resizeCanvas = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);

      // Redraw current frame if available
      if (lastRenderedIndex >= 0 && images[lastRenderedIndex]?.complete) {
        drawImageProp(images[lastRenderedIndex]!);
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // 1. Immediately load frame 0 to paint canvas instantaneously
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    images[0] = firstImg;
    firstImg.onload = () => {
      drawImageProp(firstImg);
      lastRenderedIndex = 0;
    };

    // 2. Preload remaining frames in batches
    let loadedCount = 1;
    const loadRemaining = () => {
      // Priority step loading: load every 4th frame first, then fill rest
      const order: number[] = [];
      for (let i = 4; i < frameCount; i += 4) order.push(i);
      for (let i = 2; i < frameCount; i += 4) order.push(i);
      for (let i = 1; i < frameCount; i += 2) order.push(i);

      let batchIdx = 0;
      const loadNextBatch = () => {
        const batchSize = 10;
        const end = Math.min(order.length, batchIdx + batchSize);

        for (let i = batchIdx; i < end; i++) {
          const idx = order[i];
          if (!images[idx]) {
            const img = new Image();
            img.src = getFrameUrl(idx);
            images[idx] = img;
            img.onload = () => {
              loadedCount++;
              setLoadedPercent(Math.round((loadedCount / frameCount) * 100));
              // If we are currently holding this frame index, paint it
              if (lastRenderedIndex === idx) {
                drawImageProp(img);
              }
            };
          }
        }

        batchIdx = end;
        if (batchIdx < order.length) {
          if (typeof window.requestIdleCallback === "function") {
            window.requestIdleCallback(loadNextBatch);
          } else {
            setTimeout(loadNextBatch, 25);
          }
        }
      };

      if (priority) {
        loadNextBatch();
      } else {
        setTimeout(loadNextBatch, 150);
      }
    };

    loadRemaining();

    // 3. Render requested frame
    const renderFrame = (index: number) => {
      const targetIdx = Math.min(frameCount - 1, Math.max(0, index));
      if (targetIdx === lastRenderedIndex) return;

      // Find closest loaded frame if requested frame is not yet fully loaded
      let imgToDraw = images[targetIdx];
      if (!imgToDraw || !imgToDraw.complete) {
        // Search backwards
        for (let b = targetIdx - 1; b >= 0; b--) {
          if (images[b]?.complete) {
            imgToDraw = images[b];
            break;
          }
        }
      }

      if (imgToDraw && imgToDraw.complete) {
        drawImageProp(imgToDraw);
        lastRenderedIndex = targetIdx;
        setCurrentFrameDisplay(targetIdx + 1);
      }
    };

    // 4. Intersection Observer to only process when in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.01 }
    );
    observer.observe(trigger);

    // 5. GSAP ScrollTrigger - 100% synchronous frame binding
    const st = ScrollTrigger.create({
      trigger: trigger,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.05, // Ultra-crisp instantaneous binding
      onUpdate: (self) => {
        if (!isVisible) return;

        const progress = Math.max(0, Math.min(1, self.progress));
        const frameIdx = Math.min(frameCount - 1, Math.floor(progress * frameCount));

        setIsScrubbing(true);
        clearTimeout(scrubTimeout);
        scrubTimeout = setTimeout(() => {
          setIsScrubbing(false);
        }, 120);

        if (onProgress) {
          onProgress(progress);
        }

        renderFrame(frameIdx);
      },
    });

    return () => {
      clearTimeout(scrubTimeout);
      st.kill();
      observer.disconnect();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [triggerRef, videoId, frameCount, onProgress, priority]);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#FAFAF8] ${className}`}>
      {/* 60FPS Apple-Grade HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block relative z-10"
        style={{
          backgroundColor: "#FAFAF8",
        }}
      />

      {/* Seamless Studio Cyclorama Soft Radial Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 65%, rgba(250, 250, 248, 0.45) 88%, rgba(250, 250, 248, 0.95) 100%)",
        }}
      />

      {/* Frame Status Micro-Badge */}
      <div className="absolute bottom-6 left-6 z-30 hidden md:flex items-center space-x-2 bg-[#FAFAF8]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[rgba(43,35,32,0.1)] text-[9px] font-mono text-[#574B46] tracking-wider uppercase shadow-sm">
        <span
          className={`w-1.5 h-1.5 rounded-full transition-colors ${
            isScrubbing ? "bg-[#C27838] animate-ping" : "bg-[#2B2320]"
          }`}
        />
        <span>
          FRAME: {String(currentFrameDisplay).padStart(3, "0")} / {frameCount}
        </span>
        <span className="text-[rgba(43,35,32,0.25)]">|</span>
        <span className={isScrubbing ? "text-[#C27838] font-bold" : "text-[#574B46]"}>
          {isScrubbing ? "ACTIVE 60FPS SCRUB" : "FRAME HELD"}
        </span>
      </div>
    </div>
  );
}
