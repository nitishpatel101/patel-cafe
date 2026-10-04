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
            onProgress={setScrollProgress}
          />
        </div>

        {/* Floating particles */}
        <FloatingSpiceCanvas intensity={0.7} />

        {/* Header */}
        <div className="relative z-30 pt-24 px-6 md:px-16 flex items-center justify-between border-b border-[rgba(43,35,32,0.06)] pb-4">
          <div>
            <div className="font-mono text-xs tracking-[0.25em] text-[#C27838] uppercase font-semibold">
              07 // THE GRAND SALON
            </div>
            <h2 className="font-serif text-2xl md:text-4xl text-[#2B2320] tracking-tight mt-1">
              Materialized Dining
            </h2>
          </div>
          <div className="font-mono text-xs text-[#574B46] tracking-widest uppercase hidden md:block">
            ARCHITECTURAL COMPLETION: {Math.round(scrollProgress * 100)}%
          </div>
        </div>

        {/* Center Editorial Narrative & Overlapping Parallax Image Gallery */}
        <div className="relative z-30 px-6 md:px-16 my-auto max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Typography */}
            <div className="lg:col-span-5 space-y-6 bg-[#FAFAF8]/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-[rgba(43,35,32,0.08)] shadow-lg">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C27838] font-bold">
                CONVIVIAL ARCHITECTURE
              </span>
              <h3 className="font-serif text-3xl sm:text-5xl text-[#2B2320] leading-tight">
                Where royal heritage <br />
                <span className="font-serif italic font-light text-[#574B46]">meets modern restraint.</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#574B46] leading-relaxed">
                The suspended ingredients settle onto handcrafted walnut tables and artisanal stoneware. Linen woven in Maheshwar, copper cups hammered in Jaipur, and natural daylight flooding through floor-to-ceiling studio windows.
              </p>
              <div className="pt-4 border-t border-[rgba(43,35,32,0.08)] flex items-center justify-between font-mono text-[10px] text-[#574B46] uppercase">
                <span>SEATING: 24 GUESTS ONLY</span>
                <span>CHEF ATELIER SERVICE</span>
              </div>
            </div>

            {/* Right Overlapping Parallax Cards */}
            <div className="lg:col-span-7 relative h-[260px] sm:h-[340px] hidden sm:block">
              {/* Card 1: Spice Geometry */}
              <div
                style={{
                  transform: `translate(${scrollProgress * 20}px, -${scrollProgress * 15}px) rotate(-2deg)`,
                  transition: "transform 0.2s ease-out",
                }}
                className="absolute top-0 right-16 w-56 md:w-64 aspect-[4/3] rounded-xl overflow-hidden border border-[rgba(43,35,32,0.12)] shadow-xl bg-[#FAFAF8]"
              >
                <Image
                  src="/images/image-3.webp"
                  alt="Spice Geometry Still"
                  fill
                  className="object-cover"
                  sizes="260px"
                />
                <div className="absolute bottom-2 left-2 bg-[#2B2320]/80 text-[#FAFAF8] font-mono text-[8px] uppercase tracking-wider px-2 py-0.5 rounded">
                  SPICE GEOMETRY
                </div>
              </div>

              {/* Card 2: Samosa Macro */}
              <div
                style={{
                  transform: `translate(-${scrollProgress * 25}px, ${scrollProgress * 20}px) rotate(3deg)`,
                  transition: "transform 0.2s ease-out",
                }}
                className="absolute bottom-0 right-0 w-60 md:w-72 aspect-[4/3] rounded-xl overflow-hidden border border-[rgba(43,35,32,0.12)] shadow-2xl bg-[#FAFAF8] z-10"
              >
                <Image
                  src="/images/image-2.webp"
                  alt="Samosa Macro Still"
                  fill
                  className="object-cover"
                  sizes="300px"
                />
                <div className="absolute bottom-2 left-2 bg-[#2B2320]/80 text-[#FAFAF8] font-mono text-[8px] uppercase tracking-wider px-2 py-0.5 rounded">
                  MACRO LAMINATION
                </div>
              </div>
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
