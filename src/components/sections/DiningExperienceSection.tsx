"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { CanvasFrameScrubber } from "../motion/CanvasFrameScrubber";
import { FloatingSpiceCanvas } from "../three/FloatingSpiceCanvas";

export function DiningExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  return (
    <section
      id="section-dining"
      ref={containerRef}
      className="relative w-full h-[300vh] bg-[#FAFAF8]"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        {/* Background Scrubbed Frame Sequence (Video 6 - Dining Table Materialization) */}
        <div className="absolute inset-0 z-0">
          <CanvasFrameScrubber
            videoId="video-6"
            frameCount={180}
            triggerRef={containerRef}
            nextSectionId="section-cafe-menu"
            currentChapter="The Grand Atelier Dining"
            nextSectionTitle="Artisanal Café Repertoire"
            onProgress={setScrollProgress}
          />
        </div>

        {/* Floating particles */}
        <FloatingSpiceCanvas intensity={0.7} />

        {/* Header */}
        <div className="relative z-30 pt-24 px-6 md:px-16 flex items-center justify-between border-b border-[rgba(43,35,32,0.06)] pb-4">
          <div>
            <div className="font-mono text-xs tracking-[0.25em] text-[#C27838] uppercase font-semibold">
              06 // THE GRAND SALON
            </div>
            <h2 className="font-serif text-2xl md:text-4xl text-[#2B2320] tracking-tight mt-1">
              Materialized Dining
            </h2>
          </div>
          <div className="font-mono text-xs text-[#574B46] tracking-widest uppercase hidden md:block">
            ARCHITECTURAL COMPLETION: {Math.round(scrollProgress * 100)}%
          </div>
        </div>

        {/* Center Editorial Narrative & Stills - Positioned on Outer Edges to leave center dining table 100% visible */}
        <div className="pointer-events-none absolute inset-0 z-30">
          {/* Left Narrative Card */}
          <div className="pointer-events-auto absolute left-4 sm:left-8 md:left-14 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-sm space-y-3 bg-[#FAFAF8]/90 backdrop-blur-xl p-5 md:p-6 rounded-2xl border border-[rgba(43,35,32,0.12)] shadow-xl">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#C27838] font-bold">
              CONVIVIAL ARCHITECTURE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#2B2320] leading-tight">
              Where royal heritage <br />
              <span className="font-serif italic font-light text-[#574B46]">meets restraint.</span>
            </h3>
            <p className="text-xs text-[#574B46] leading-relaxed">
              Handcrafted walnut tables, artisanal stoneware, linen from Maheshwar, and natural daylight flooding through cyclorama studio windows.
            </p>
            <div className="pt-2.5 border-t border-[rgba(43,35,32,0.08)] flex items-center justify-between font-mono text-[9px] text-[#574B46] uppercase">
              <span>24 GUESTS ONLY</span>
              <span>ATELIER SERVICE</span>
            </div>
          </div>

          {/* Right Top Parallax Still (Tucked into top-right corner) */}
          <div className="pointer-events-auto absolute top-24 md:top-28 right-6 md:right-14 hidden lg:block w-52 aspect-[4/3] rounded-xl overflow-hidden border border-[rgba(43,35,32,0.12)] shadow-lg bg-[#FAFAF8]">
            <Image
              src="/images/image-2.webp"
              alt="Culinary macro still"
              fill
              className="object-cover"
              sizes="220px"
            />
            <div className="absolute bottom-2 left-2 bg-[#2B2320]/80 text-[#FAFAF8] font-mono text-[8px] uppercase tracking-wider px-2 py-0.5 rounded">
              ARCHIVAL MACRO
            </div>
          </div>
        </div>

        {/* Bottom Status */}
        <div className="relative z-30 px-6 md:px-16 pb-8 flex items-center justify-between border-t border-[rgba(43,35,32,0.06)] text-[10px] font-mono uppercase tracking-widest text-[#574B46]">
          <div>
            <span>FIG. 06 // THE IMPERIAL COMMENSALITY COMPLETED</span>
          </div>
          <div>
            <span>NEXT: INQUIRE & RESERVE TABLE ↘</span>
          </div>
        </div>
      </div>
    </section>
  );
}
