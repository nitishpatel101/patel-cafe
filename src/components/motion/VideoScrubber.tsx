"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface VideoScrubberProps {
  src: string;
  posterSrc?: string;
  triggerRef: React.RefObject<HTMLElement | null>;
  onProgress?: (progress: number) => void;
  className?: string;
  priority?: boolean;
}

export function VideoScrubber({
  src,
  posterSrc,
  triggerRef,
  onProgress,
  className = "",
  priority = false,
}: VideoScrubberProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState<number>(10);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentDisplayTime, setCurrentDisplayTime] = useState<number>(0);
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    const trigger = triggerRef.current;
    if (!video || !trigger) return;

    let targetTime = 0;
    let smoothedTime = 0;
    let isVisible = true;
    let isSeeking = false;
    let pendingTime: number | null = null;
    let animId: number;
    let scrubTimeout: NodeJS.Timeout;

    // Ensure video is paused and ready for scrubbing
    video.pause();

    const onLoadedMeta = () => {
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        setDuration(video.duration);
      }
      setIsLoaded(true);
      video.pause();
      // Prime the initial frame at 0.01s so cyclorama background is visible immediately
      try {
        video.currentTime = 0.01;
      } catch {
        // ignore
      }
    };

    const handleSeeking = () => {
      isSeeking = true;
    };

    const handleSeeked = () => {
      isSeeking = false;
      if (pendingTime !== null) {
        const next = pendingTime;
        pendingTime = null;
        try {
          video.currentTime = next;
        } catch {
          // ignore
        }
      }
    };

    video.addEventListener("loadedmetadata", onLoadedMeta);
    video.addEventListener("seeking", handleSeeking);
    video.addEventListener("seeked", handleSeeked);

    // Intersection observer to pause calculations when out of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting;
        if (!isVisible) {
          video.pause();
        }
      },
      { threshold: 0.02 }
    );
    observer.observe(trigger);

    // GSAP ScrollTrigger to capture precise scroll progress
    const st = ScrollTrigger.create({
      trigger: trigger,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.35, // Ultra-responsive scroll-scrub response
      onUpdate: (self) => {
        const progress = Math.max(0, Math.min(1, self.progress));
        const dur = video.duration && !isNaN(video.duration) && video.duration > 0 ? video.duration : duration;
        targetTime = progress * dur;
        
        setIsScrubbing(true);
        clearTimeout(scrubTimeout);
        scrubTimeout = setTimeout(() => {
          setIsScrubbing(false);
        }, 180);

        if (onProgress) {
          onProgress(progress);
        }
      },
    });

    // Lerp animation loop for smooth frame seeking
    const scrubLoop = () => {
      if (isVisible && video.readyState >= 1) {
        const diff = targetTime - smoothedTime;
        if (Math.abs(diff) > 0.01) {
          smoothedTime += diff * 0.3;
          const clamped = Math.max(0, Math.min(smoothedTime, (video.duration || 10) - 0.02));
          setCurrentDisplayTime(clamped);

          if (!isSeeking) {
            try {
              video.currentTime = clamped;
            } catch {
              // ignore
            }
          } else {
            pendingTime = clamped;
          }
        }
      }
      animId = requestAnimationFrame(scrubLoop);
    };

    animId = requestAnimationFrame(scrubLoop);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(scrubTimeout);
      st.kill();
      observer.disconnect();
      video.removeEventListener("loadedmetadata", onLoadedMeta);
      video.removeEventListener("seeking", handleSeeking);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, [triggerRef, onProgress, duration]);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#FAFAF8] ${className}`}>
      {/* High-res poster fallback while loading */}
      {posterSrc && (
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            isLoaded && !hasError ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <Image
            src={posterSrc}
            alt="Culinary Scene Archival"
            fill
            priority={priority}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      )}

      {/* Scrubbed HTML5 Video */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload={priority ? "auto" : "metadata"}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover object-center relative z-10"
        style={{
          backgroundColor: "#FAFAF8",
        }}
      >
        <source src={src} type="video/mp4" />
        <source
          src={src.startsWith("/videos/") ? src.replace("/videos/", "/") : `/videos${src}`}
          type="video/mp4"
        />
      </video>

      {/* Soft studio cyclorama edge gradient for seamless 100% bleed with #FAFAF8 */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 65%, rgba(250, 250, 248, 0.45) 88%, rgba(250, 250, 248, 0.95) 100%)",
        }}
      />

      {/* Frame Status Micro-Badge (indicates scroll scrubbing & static hold) */}
      <div className="absolute bottom-6 left-6 z-30 hidden md:flex items-center space-x-2 bg-[#FAFAF8]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[rgba(43,35,32,0.1)] text-[9px] font-mono text-[#574B46] tracking-wider uppercase shadow-sm">
        <span
          className={`w-1.5 h-1.5 rounded-full transition-colors ${
            isScrubbing ? "bg-[#C27838] animate-ping" : "bg-[#2B2320]"
          }`}
        />
        <span>
          T: {currentDisplayTime.toFixed(2)}s / {duration.toFixed(1)}s
        </span>
        <span className="text-[rgba(43,35,32,0.25)]">|</span>
        <span className={isScrubbing ? "text-[#C27838] font-bold" : "text-[#574B46]"}>
          {isScrubbing ? "SCRUBBING FRAME" : "FRAME HELD"}
        </span>
      </div>
    </div>
  );
}
