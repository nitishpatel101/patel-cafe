"use client";

import React, { useRef, useState } from "react";
import { CanvasFrameScrubber } from "../motion/CanvasFrameScrubber";
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
      className="relative w-full h-[300vh] bg-[#FAFAF8]"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        {/* Background Scrubbed Frame Sequence (Video 5 - Pouring Chutney ribbons) */}
        <div className="absolute inset-0 z-0">
          <CanvasFrameScrubber
            videoId="video-5"
            frameCount={180}
            triggerRef={containerRef}
            nextSectionId="section-dining"
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

        {/* Floating 3D Tilt Cards - Placed at Far Left and Far Right to keep the center chutney stream 100% clear */}
        <div className="pointer-events-none absolute inset-0 z-30">
          {/* Card 1: Imperial Saunth (Left Edge) */}
          <div
            onMouseMove={(e) => handleTilt(e, setCard1Tilt)}
            onMouseLeave={() => resetTilt(setCard1Tilt)}
            style={{
              transform: `perspective(1000px) rotateX(${card1Tilt.y}deg) rotateY(${card1Tilt.x}deg)`,
              transition: "transform 0.15s ease-out",
            }}
            data-cursor="TASTE"
            className="pointer-events-auto absolute left-4 sm:left-8 md:left-14 top-1/2 -translate-y-1/2 max-w-[260px] sm:max-w-[290px] bg-[#FAFAF8]/90 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-[rgba(43,35,32,0.12)] shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-[rgba(43,35,32,0.08)] pb-1.5 mb-2.5">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#A9442C] font-bold">
                REDUCTION NO. 01
              </span>
              <span className="font-mono text-[9px] text-[#574B46]">
                30-DAY SOLERA
              </span>
            </div>

            <h3 className="font-serif text-lg sm:text-2xl text-[#2B2320] mb-0.5">
              Imperial Saunth
            </h3>
            <p className="font-serif italic text-xs text-[#574B46] mb-2.5">
              Aged Tamarind & Sun-Dried Sonth
            </p>

            <p className="text-[11px] text-[#574B46] leading-relaxed mb-3 font-normal">
              Slow-cooked in clay pots with organic sugarcane jaggery. Pours in velvety ribbons suspended in mid-air.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-[rgba(43,35,32,0.08)] font-mono text-[9px] text-[#574B46] uppercase">
              <div>
                <span className="text-[#C27838]">VISCOSITY:</span> 48 cP
              </div>
              <div>
                <span className="text-[#C27838]">PROFILE:</span> Sweet-Tart
              </div>
            </div>
          </div>

          {/* Card 2: Wild Mountain Mint (Right Edge) */}
          <div
            onMouseMove={(e) => handleTilt(e, setCard2Tilt)}
            onMouseLeave={() => resetTilt(setCard2Tilt)}
            style={{
              transform: `perspective(1000px) rotateX(${card2Tilt.y}deg) rotateY(${card2Tilt.x}deg)`,
              transition: "transform 0.15s ease-out",
            }}
            data-cursor="TASTE"
            className="pointer-events-auto absolute right-4 sm:right-8 md:right-14 top-1/2 -translate-y-1/2 max-w-[260px] sm:max-w-[290px] bg-[#FAFAF8]/90 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-[rgba(43,35,32,0.12)] shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-[rgba(43,35,32,0.08)] pb-1.5 mb-2.5">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#5A6B48] font-bold">
                EXTRACT NO. 02
              </span>
              <span className="font-mono text-[9px] text-[#574B46]">
                HIMALAYAS
              </span>
            </div>

            <h3 className="font-serif text-lg sm:text-2xl text-[#2B2320] mb-0.5">
              Himalayan Pudina
            </h3>
            <p className="font-serif italic text-xs text-[#574B46] mb-2.5">
              Wild Mint & Raw Mango Coulis
            </p>

            <p className="text-[11px] text-[#574B46] leading-relaxed mb-3 font-normal">
              Mountain mint hand-pounded with tart green mango and green chillies. Electric verdant herbaceous acidity.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-[rgba(43,35,32,0.08)] font-mono text-[9px] text-[#574B46] uppercase">
              <div>
                <span className="text-[#5A6B48]">ACIDITY:</span> pH 3.8
              </div>
              <div>
                <span className="text-[#5A6B48]">PROFILE:</span> Cool Herb
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
