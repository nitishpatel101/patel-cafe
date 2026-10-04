"use client";

import React, { useRef, useState } from "react";
import { CanvasFrameScrubber } from "../motion/CanvasFrameScrubber";
import { FloatingSpiceCanvas } from "../three/FloatingSpiceCanvas";

export function CraftProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const steps = [
    {
      phase: "PHASE I",
      title: "Botanical Selection & Terroir",
      temperature: "22°C AMBIENT",
      desc: "Heirloom plum tomatoes, cold-mountain ginger roots, and hand-cracked Kashmiri walnuts selected at dawn. Ingredients float in zero-contact purity before touching the hearth.",
      threshold: [0, 0.25],
    },
    {
      phase: "PHASE II",
      title: "The Alchemy of Tadka",
      temperature: "185°C FLASH POINT",
      desc: "Tempering whole cumin, fenugreek, and brown mustard seeds in smoking A2 cow ghee. Heat releases essential aromatic volatile oils within a precise 8-second window.",
      threshold: [0.25, 0.5],
    },
    {
      phase: "PHASE III",
      title: "Slow Emulsion & Clay Simmer",
      temperature: "94°C GENTLE BUBBLE",
      desc: "Hand-churned cultured cream and slow-simmered onion purée fold into artisanal copper handis. Dal and reductions simmer over embers for 24 uninterrupted hours.",
      threshold: [0.5, 0.75],
    },
    {
      phase: "PHASE IV",
      title: "Architectural Symmetry",
      temperature: "65°C PLATING OPTIMAL",
      desc: "Every component descends into its calculated coordinate on the brass royal platter. Zero touch, total culinary balance preserved for the guest.",
      threshold: [0.75, 1.0],
    },
  ];

  // Determine current active step
  const activeStepIdx = Math.min(3, Math.floor(scrollProgress * 4));
  const currentStep = steps[activeStepIdx];

  return (
    <section
      id="section-craft"
      ref={containerRef}
      className="relative w-full h-[300vh] bg-[#FAFAF8]"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        {/* Background Scrubbed Frame Sequence (Video 4 - Ingredient Assembly) */}
        <div className="absolute inset-0 z-0">
          <CanvasFrameScrubber
            videoId="video-4"
            frameCount={180}
            triggerRef={containerRef}
            nextSectionId="section-sauces"
            onProgress={setScrollProgress}
          />
        </div>

        {/* Floating Particles */}
        <FloatingSpiceCanvas intensity={0.6} />

        {/* Section Header & Horizontal Timeline Indicator */}
        <div className="relative z-30 pt-24 px-6 md:px-16">
          <div className="flex items-center justify-between border-b border-[rgba(43,35,32,0.06)] pb-4 mb-6">
            <div>
              <div className="font-mono text-xs tracking-[0.25em] text-[#C27838] uppercase font-semibold">
                04 // ENGINEERING BLUEPRINT
              </div>
              <h2 className="font-serif text-2xl md:text-4xl text-[#2B2320] tracking-tight mt-1">
                The Assembly Timeline
              </h2>
            </div>
            <div className="font-mono text-xs text-[#574B46] tracking-widest uppercase hidden sm:block">
              BLUEPRINT DISCIPLINE: 04 RIGOROUS PHASES
            </div>
          </div>

          {/* Horizontal Step Progress Bar */}
          <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-4xl">
            {steps.map((st, i) => {
              const isPastOrActive = scrollProgress >= i * 0.25;
              const isCurrent = activeStepIdx === i;
              return (
                <div key={i} className="flex flex-col space-y-2">
                  <div className="h-[2px] w-full bg-[rgba(43,35,32,0.1)] relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-[#2B2320] transition-all duration-300"
                      style={{
                        transform: isPastOrActive
                          ? "scaleX(1)"
                          : "scaleX(0)",
                        transformOrigin: "left",
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                    <span
                      className={
                        isCurrent
                          ? "text-[#C27838] font-bold"
                          : isPastOrActive
                          ? "text-[#2B2320]"
                          : "text-[#574B46]/60"
                      }
                    >
                      {st.phase}
                    </span>
                    <span className="hidden md:inline text-[9px] text-[#574B46]">
                      {st.temperature}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Step Floating Narrative Card - Positioned at Bottom-Left to leave center video 100% visible */}
        <div className="absolute left-4 sm:left-8 md:left-14 bottom-20 sm:bottom-24 z-30 max-w-sm sm:max-w-md">
          <div className="bg-[#FAFAF8]/90 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-[rgba(43,35,32,0.12)] shadow-xl transition-all duration-500">
            <div className="flex items-center space-x-2.5 mb-1.5 font-mono text-[10px] uppercase tracking-widest text-[#C27838]">
              <span className="font-bold">{currentStep.phase}</span>
              <span>·</span>
              <span>{currentStep.temperature}</span>
            </div>

            <h3 className="font-serif text-lg sm:text-2xl text-[#2B2320] mb-2 leading-snug">
              {currentStep.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#574B46] leading-relaxed mb-3 font-normal">
              {currentStep.desc}
            </p>

            <div className="flex items-center justify-between pt-2.5 border-t border-[rgba(43,35,32,0.08)] text-[9px] font-mono text-[#574B46] uppercase tracking-wider">
              <span>EXPLODED SCHEMATIC</span>
              <span>SCROLL TO PROCEED ↘</span>
            </div>
          </div>
        </div>

        {/* Bottom Status */}
        <div className="relative z-30 px-6 md:px-16 pb-8 flex items-center justify-between border-t border-[rgba(43,35,32,0.06)] text-[10px] font-mono uppercase tracking-widest text-[#574B46]">
          <div>
            <span>FIG. 04 // TIMELINE PROGRESSION: {Math.round(scrollProgress * 100)}%</span>
          </div>
          <div>
            <span>NEXT: FLUID DYNAMICS // SIGNATURE SAUCES ↘</span>
          </div>
        </div>
      </div>
    </section>
  );
}
