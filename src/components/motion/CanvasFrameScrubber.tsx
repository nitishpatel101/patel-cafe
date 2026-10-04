"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause, ChevronDown, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CanvasFrameScrubberProps {
  videoId: string; // "video-1", "video-2", etc.
  frameCount?: number; // default 180 frames (10 seconds @ 18fps)
  triggerRef: React.RefObject<HTMLElement | null>;
  nextSectionId?: string; // Automatically scroll to next section after 10s playback
  nextSectionTitle?: string; // E.g. "Chapter 03 // Botanical Physics"
  currentChapter?: string; // E.g. "Chapter 02 // Anatomy of a Delicacy"
  onProgress?: (progress: number) => void;
  className?: string;
  priority?: boolean;
}

export function CanvasFrameScrubber({
  videoId,
  frameCount = 180,
  triggerRef,
  nextSectionId,
  nextSectionTitle,
  currentChapter,
  onProgress,
  className = "",
  priority = false,
}: CanvasFrameScrubberProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const transitionCurtainRef = useRef<HTMLDivElement>(null);
  const transitionBarRef = useRef<HTMLDivElement>(null);
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

    // 5. GSAP ScrollTrigger - Smooth 60fps scrub with Inter-Video Transitions
    const st = ScrollTrigger.create({
      trigger: trigger,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6, // Smooth 60fps interpolation without sudden jump
      onUpdate: (self) => {
        if (!isVisible || isPlayingRef.current) return;

        const progress = Math.max(0, Math.min(1, self.progress));

        // Smoothly map 0.04 -> 0.86 to video frames (180 frames)
        let videoProgress = 0;
        if (progress <= 0.04) {
          videoProgress = 0;
        } else if (progress >= 0.86) {
          videoProgress = 1;
        } else {
          videoProgress = (progress - 0.04) / (0.86 - 0.04);
        }
        const frameIdx = Math.min(frameCount - 1, Math.floor(videoProgress * (frameCount - 1)));

        // 60FPS Hardware-accelerated canvas scale & opacity crossfade
        if (canvasWrapperRef.current) {
          let scale = 1.0;
          let opacity = 1.0;
          if (progress < 0.08) {
            const enterRatio = progress / 0.08;
            scale = 0.95 + 0.05 * enterRatio;
            opacity = 0.25 + 0.75 * enterRatio;
          } else if (progress > 0.84) {
            const exitRatio = (progress - 0.84) / 0.16;
            scale = 1.0 + 0.05 * exitRatio;
            opacity = 1.0 - 0.65 * exitRatio;
          }
          canvasWrapperRef.current.style.transform = `scale(${scale.toFixed(4)})`;
          canvasWrapperRef.current.style.opacity = opacity.toFixed(3);
        }

        // Luxury Chapter Transition Curtain
        if (transitionCurtainRef.current) {
          if (progress > 0.82) {
            const curtainProgress = (progress - 0.82) / 0.16; // 0 to 1
            transitionCurtainRef.current.style.opacity = String(Math.min(1, curtainProgress * 1.35));
            if (transitionBarRef.current) {
              transitionBarRef.current.style.width = `${Math.min(100, Math.round(curtainProgress * 100))}%`;
            }
          } else if (progress < 0.06) {
            const enterCurtain = (0.06 - progress) / 0.06;
            transitionCurtainRef.current.style.opacity = String(Math.min(1, enterCurtain * 0.7));
          } else {
            transitionCurtainRef.current.style.opacity = "0";
          }
        }

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

      // Animate transition curtain near conclusion of 10s playback
      if (transitionCurtainRef.current) {
        if (progress > 0.85) {
          const curtainProg = (progress - 0.85) / 0.15;
          transitionCurtainRef.current.style.opacity = String(Math.min(1, curtainProg * 1.35));
          if (transitionBarRef.current) {
            transitionBarRef.current.style.width = `${Math.min(100, Math.round(curtainProg * 100))}%`;
          }
        } else {
          transitionCurtainRef.current.style.opacity = "0";
        }
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
      {/* 60FPS Apple-Grade HTML5 Canvas with Hardware Scaled Crossfade */}
      <div
        ref={canvasWrapperRef}
        className="w-full h-full will-change-transform origin-center transition-[transform,opacity] duration-75"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block relative z-10"
          style={{
            backgroundColor: "#FAFAF8",
          }}
        />
      </div>

      {/* Seamless Studio Cyclorama Soft Radial Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 65%, rgba(250, 250, 248, 0.45) 88%, rgba(250, 250, 248, 0.95) 100%)",
        }}
      />

      {/* Luxury Editorial Chapter Transition Veil (Smooth handoff between videos) */}
      <div
        ref={transitionCurtainRef}
        className="pointer-events-none absolute inset-0 z-25 flex flex-col items-center justify-center opacity-0 transition-opacity duration-200"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(250, 250, 248, 0.8) 0%, rgba(250, 250, 248, 0.97) 80%, #FAFAF8 100%)",
        }}
      >
        <div className="text-center px-6 max-w-md space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[rgba(43,35,32,0.14)] bg-[#FAFAF8]/95 font-mono text-[9px] uppercase tracking-widest text-[#C27838] shadow-xs">
            <Sparkles className="w-3 h-3 text-[#C27838]" />
            <span>{currentChapter ? `${currentChapter} Concluded` : "Chapter Complete"}</span>
          </div>
          {nextSectionTitle && (
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#574B46] mb-1">
                Entering Next Chapter
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-[#2B2320]">
                {nextSectionTitle}
              </h3>
            </div>
          )}
          <div className="w-40 h-[2px] mx-auto bg-[rgba(43,35,32,0.12)] rounded-full overflow-hidden">
            <div
              ref={transitionBarRef}
              className="h-full bg-[#C27838] w-0 transition-all duration-75"
            />
          </div>
        </div>
      </div>

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
