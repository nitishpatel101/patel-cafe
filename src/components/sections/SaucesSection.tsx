"use client";

import React, { useRef, useState } from "react";
import { VideoScrubber } from "../motion/VideoScrubber";
import { FloatingSpiceCanvas } from "../three/FloatingSpiceCanvas";

export function SaucesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 3D tilt hook state
  const [card1Tilt, setCard1Tilt] = useState({ x: 0, y: 0 });
  const [card2Tilt, setCard2Tilt] = useState({ x: 0, y: 0 });

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>, setTilt: typeof setCard1Tilt) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  const resetTilt = (setTilt: typeof setCard1Tilt) => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="section-sauces"
      ref={containerRef}
      className="relative w-full h-[260vh] bg-[#FAFAF8]"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        {/* Background Scrubbed Video (Video 5 - Pouring Chutney ribbons) */}
        <div className="absolute inset-0 z-0">
          <VideoScrubber
            src="/videos/video-5.mp4"
            posterSrc="/images/image-1.webp"
            triggerRef={containerRef}
            onProgress={setScrollProgress}
          />
        </div>

        {/* Floating particles */}
        <FloatingSpiceCanvas intensity={0.5} />

        {/* Header */}
        <div className="relative z-30 pt-24 px-6 md:px-16 flex items-center justify-between border-b border-[rgba(43,35,32,0.06)] pb-4">
          <div>
            <div className="font-mono text-xs tracking-[0.25em] text-[#C27838] uppercase font-semibold">
              06 // FLUID DYNAMICS
            </div>
            <h2 className="font-serif text-2xl md:text-4xl text-[#2B2320] tracking-tight mt-1">
              The Chutney Pour
            </h2>
          </div>
          <div className="font-mono text-xs text-[#574B46] tracking-widest uppercase hidden md:block">
            VISCOSITY EQUILIBRIUM: {Math.round(scrollProgress * 100)}% DISCHARGE
          </div>
        </div>

        {/* Floating 3D Tilt Cards */}
        <div className="relative z-30 px-6 md:px-16 my-auto max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Card 1: Imperial Saunth */}
          <div
            onMouseMove={(e) => handleTilt(e, setCard1Tilt)}
            onMouseLeave={() => resetTilt(setCard1Tilt)}
            style={{
              transform: `perspective(1000px) rotateX(${card1Tilt.y}deg) rotateY(${card1Tilt.x}deg)`,
              transition: "transform 0.15s ease-out",
            }}
            data-cursor="TASTE"
            className="bg-[#FAFAF8]/95 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-[rgba(43,35,32,0.12)] shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-[rgba(43,35,32,0.08)] pb-2 mb-4">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#A9442C] font-bold">
                REDUCTION NO. 01
              </span>
              <span className="font-mono text-[10px] text-[#574B46]">
                AGING: 30-DAY SOLERA
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#2B2320] mb-1">
              Imperial Saunth
            </h3>
            <p className="font-serif italic text-sm text-[#574B46] mb-4">
              Aged Tamarind & Sun-Dried Sonth Ginger
            </p>

            <p className="text-xs sm:text-sm text-[#574B46] leading-relaxed mb-6 font-normal">
              Slow-cooked in clay pots with organic sugarcane jaggery, black rock salt, and toasted cumin. Pours in smooth, velvety ribbons that suspend in mid-air.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[rgba(43,35,32,0.08)] font-mono text-[10px] text-[#574B46] uppercase">
              <div>
                <span className="text-[#C27838]">VISCOSITY:</span> 48 cP Ribbon
              </div>
              <div>
                <span className="text-[#C27838]">PROFILE:</span> Sweet-Tart Warmth
              </div>
            </div>
          </div>

          {/* Card 2: Wild Mountain Mint */}
          <div
            onMouseMove={(e) => handleTilt(e, setCard2Tilt)}
            onMouseLeave={() => resetTilt(setCard2Tilt)}
            style={{
              transform: `perspective(1000px) rotateX(${card2Tilt.y}deg) rotateY(${card2Tilt.x}deg)`,
              transition: "transform 0.15s ease-out",
            }}
            data-cursor="TASTE"
            className="bg-[#FAFAF8]/95 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-[rgba(43,35,32,0.12)] shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-[rgba(43,35,32,0.08)] pb-2 mb-4">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#5A6B48] font-bold">
                EXTRACT NO. 02
              </span>
              <span className="font-mono text-[10px] text-[#574B46]">
                HARVEST: HIMALAYAN FOOTHILLS
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#2B2320] mb-1">
              Himalayan Pudina
            </h3>
            <p className="font-serif italic text-sm text-[#574B46] mb-4">
              Wild Mint, Coriander & Raw Mango Coulis
            </p>

            <p className="text-xs sm:text-sm text-[#574B46] leading-relaxed mb-6 font-normal">
              Fresh mountain mint leaves hand-pounded with tart green mango and green chillies. Electric verdant color with refreshing herbaceous acidity.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[rgba(43,35,32,0.08)] font-mono text-[10px] text-[#574B46] uppercase">
              <div>
                <span className="text-[#5A6B48]">ACIDITY:</span> pH 3.8 Bright
              </div>
              <div>
                <span className="text-[#5A6B48]">PROFILE:</span> Herbaceous Chill
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status */}
        <div className="relative z-30 px-6 md:px-16 pb-8 flex items-center justify-between border-t border-[rgba(43,35,32,0.06)] text-[10px] font-mono uppercase tracking-widest text-[#574B46]">
          <div>
            <span>FIG. 05 // ZERO-CONTACT POURING GEOMETRY</span>
          </div>
          <div>
            <span>NEXT: THE ATELIER DINING EXPERIENCE ↘</span>
          </div>
        </div>
      </div>
    </section>
  );
}
