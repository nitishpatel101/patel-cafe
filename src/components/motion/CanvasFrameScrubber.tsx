"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause, ChevronDown } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CanvasFrameScrubberProps {
  videoId: string; // "video-1", "video-2", etc.
  frameCount?: number; // default 180 frames (10 seconds @ 18fps)
  triggerRef: React.RefObject<HTMLElement | null>;
  nextSectionId?: string; // Automatically scroll to next section after 10s playback
  onProgress?: (progress: number) => void;
  className?: string;
  priority?: boolean;
}

export function CanvasFrameScrubber({
  videoId,
  frameCount = 180,
  triggerRef,
  nextSectionId,
  onProgress,
  className = "",
  priority = false,
}: CanvasFrameScrubberProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState(1);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);

  // References for cross-scope control
  const renderFrameRef = useRef<(idx: number) => void>(() => {});
  const isPlayingRef = useRef(false);
  const autoPlayAnimId = useRef<number | null>(null);

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

    const getFrameUrl = (index: number) => {
      const pad = String(index + 1).padStart(4, "0");
      return `/frames/${videoId}/frame_${pad}.jpg`;
    };

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

    const resizeCanvas = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);

      if (lastRenderedIndex >= 0 && images[lastRenderedIndex]?.complete) {
        drawImageProp(images[lastRenderedIndex]!);
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // 1. Immediately paint frame 0
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    images[0] = firstImg;
    firstImg.onload = () => {
      drawImageProp(firstImg);
      lastRenderedIndex = 0;
    };

    // 2. Preload ALL 180 frames into memory
    for (let i = 0; i < frameCount; i++) {
      if (i === 0) continue;
      const img = new Image();
      img.src = getFrameUrl(i);
      images[i] = img;
      img.onload = () => {
        if (lastRenderedIndex === i) {
          drawImageProp(img);
        }
      };
    }

    // 3. Render target frame
    const renderFrame = (index: number) => {
      const targetIdx = Math.min(frameCount - 1, Math.max(0, Math.round(index)));
      if (targetIdx === lastRenderedIndex) return;

      let imgToDraw = images[targetIdx];
      if (!imgToDraw || !imgToDraw.complete) {
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
        setCurrentTimeSec(Number(((targetIdx / (frameCount - 1)) * 10).toFixed(1)));
      }
    };

    renderFrameRef.current = renderFrame;

    // 4. Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
        if (!isVisible && isPlayingRef.current) {
          stopAutoPlay();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(trigger);

    // 5. GSAP ScrollTrigger - Smooth 60fps scrub
    const st = ScrollTrigger.create({
      trigger: trigger,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6, // Smooth 60fps interpolation without sudden jump
      onUpdate: (self) => {
        if (!isVisible || isPlayingRef.current) return;

        const progress = Math.max(0, Math.min(1, self.progress));
        const frameIdx = Math.min(frameCount - 1, Math.floor(progress * frameCount));

        setIsScrubbing(true);
        clearTimeout(scrubTimeout);
        scrubTimeout = setTimeout(() => {
          setIsScrubbing(false);
        }, 150);

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
      if (autoPlayAnimId.current) {
        cancelAnimationFrame(autoPlayAnimId.current);
      }
    };
  }, [triggerRef, videoId, frameCount, onProgress, priority]);

  // Auto-play the full 10-second sequence (180 frames @ 18fps) then scroll to next
  const startAutoPlay = () => {
    setIsPlayingAuto(true);
    isPlayingRef.current = true;
    setIsScrubbing(true);

    let startTimestamp: number | null = null;
    const durationMs = 10000; // Exact 10.0 seconds

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(1, elapsed / durationMs);

      const frameIdx = Math.min(frameCount - 1, Math.floor(progress * (frameCount - 1)));
      renderFrameRef.current(frameIdx);

      if (onProgress) {
        onProgress(progress);
      }

      if (progress < 1 && isPlayingRef.current) {
        autoPlayAnimId.current = requestAnimationFrame(step);
      } else {
        stopAutoPlay();
        // 10 seconds complete: smoothly advance to the next section!
        if (nextSectionId) {
          setTimeout(() => {
            const nextEl = document.getElementById(nextSectionId);
            if (nextEl) {
              nextEl.scrollIntoView({ behavior: "smooth" });
            }
          }, 350);
        }
      }
    };

    autoPlayAnimId.current = requestAnimationFrame(step);
  };

  const stopAutoPlay = () => {
    setIsPlayingAuto(false);
    isPlayingRef.current = false;
    setIsScrubbing(false);
    if (autoPlayAnimId.current) {
      cancelAnimationFrame(autoPlayAnimId.current);
      autoPlayAnimId.current = null;
    }
  };

  const toggleAutoPlay = () => {
    if (isPlayingAuto) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  };

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

      {/* Frame Status Micro-Badge & 10s Play Controller */}
      <div className="absolute bottom-6 left-6 z-30 flex items-center space-x-3">
        {/* Play 10s Cinematic Sequence Button */}
        <button
          onClick={toggleAutoPlay}
          data-cursor={isPlayingAuto ? "PAUSE" : "PLAY 10S"}
          className="flex items-center space-x-2 bg-[#2B2320] text-[#FAFAF8] px-3.5 py-1.5 rounded-full font-mono text-[9px] uppercase tracking-widest hover:bg-[#574B46] transition-all shadow-md group"
        >
          {isPlayingAuto ? (
            <>
              <Pause className="w-3 h-3 text-[#C27838]" />
              <span>Pause 10s</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-[#C27838] fill-current" />
              <span>Play 10s Film</span>
            </>
          )}
        </button>

        {/* Live Frame / Time Metric */}
        <div className="hidden sm:flex items-center space-x-2 bg-[#FAFAF8]/92 backdrop-blur-md px-3 py-1.5 rounded-full border border-[rgba(43,35,32,0.12)] text-[9px] font-mono text-[#574B46] tracking-wider uppercase shadow-xs">
          <span
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              isScrubbing ? "bg-[#C27838] animate-ping" : "bg-[#2B2320]"
            }`}
          />
          <span>
            {currentTimeSec.toFixed(1)}s / 10.0s (FRAME {String(currentFrameDisplay).padStart(3, "0")})
          </span>
          <span className="text-[rgba(43,35,32,0.25)]">|</span>
          <span className={isScrubbing ? "text-[#C27838] font-bold" : "text-[#574B46]"}>
            {isPlayingAuto ? "10s FILM RUNNING" : isScrubbing ? "SCROLL SCRUBBING" : "FRAME HELD"}
          </span>
        </div>
      </div>

      {/* Auto Next Indicator if nextSectionId present */}
      {nextSectionId && (
        <button
          onClick={() => {
            document.getElementById(nextSectionId)?.scrollIntoView({ behavior: "smooth" });
          }}
          className="absolute bottom-6 right-6 z-30 hidden md:flex items-center space-x-1.5 bg-[#FAFAF8]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[rgba(43,35,32,0.1)] text-[9px] font-mono text-[#574B46] hover:text-[#2B2320] transition-colors shadow-xs"
        >
          <span>NEXT CHAPTER</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
