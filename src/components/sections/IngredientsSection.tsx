"use client";

import React, { useRef, useState } from "react";
import { CanvasFrameScrubber } from "../motion/CanvasFrameScrubber";
import { FloatingSpiceCanvas } from "../three/FloatingSpiceCanvas";
import { Sparkles } from "lucide-react";

export function IngredientsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSpice, setActiveSpice] = useState<number | null>(null);

  const spices = [
    {
      id: 1,
      name: "Salem Turmeric",
      vernacular: "Kacchi Haldi",
      origin: "Salem, Tamil Nadu (Elev. 278m)",
      compound: "4.8% Pure Curcumin",
      tasting: "Warm earthy bitterness, woody warmth, antioxidant foundation of every imperial curry.",
      color: "#D4AF37",
    },
    {
      id: 2,
      name: "Alleppey Cardamom",
      vernacular: "Choti Elaichi",
      origin: "Cardamom Hills, Kerala (Elev. 1,100m)",
      compound: "Cineole & Terpinyl Acetate",
      tasting: "Crisp eucalyptus top-notes, refreshing floral camphor, essential to royal rice and slow desserts.",
      color: "#6A784B",
    },
    {
      id: 3,
      name: "Star Anise",
      vernacular: "Chakri Phool",
      origin: "Nilgiri Foothills (Elev. 950m)",
      compound: "Trans-Anethole & Shikimic Acid",
      tasting: "Sweet licorice undertone, deep woody warmth, bridge between meat reductions and whole spices.",
      color: "#A9442C",
    },
    {
      id: 4,
      name: "Tellicherry Black Pepper",
      vernacular: "Kali Mirch",
      origin: "Malabar Coast, Kerala (Elev. 400m)",
      compound: "6.2% Volatile Piperine",
      tasting: "Sun-ripened bold berries offering citrus perfume before a clean, lingering thermodynamic heat.",
      color: "#2B2320",
    },
    {
      id: 5,
      name: "Ceylon True Cinnamon",
      vernacular: "Dalchini",
      origin: "Southern Ghats (Elev. 650m)",
      compound: "Pure Cinnamaldehyde",
      tasting: "Delicate paper-thin quills with subtle floral sweetness, devoid of harsh cassia astringency.",
      color: "#C27838",
    },
    {
      id: 6,
      name: "Zanzibar Cloves",
      vernacular: "Laung",
      origin: "Coastal Malabar (Elev. 300m)",
      compound: "85% Distilled Eugenol",
      tasting: "Intense numbing warmth, phenolic aromatic power, tempered directly in smoking cow ghee.",
      color: "#4A3B32",
    },
  ];

  return (
    <section
      id="section-spices"
      ref={containerRef}
      className="relative w-full h-[300vh] bg-[#FAFAF8]"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        {/* Background Scrubbed Frame Sequence (Video 3 - Spice Explosion) */}
        <div className="absolute inset-0 z-0">
          <CanvasFrameScrubber
            videoId="video-3"
            frameCount={180}
            triggerRef={containerRef}
            nextSectionId="section-craft"
            onProgress={setScrollProgress}
          />
        </div>

        {/* ThreeJS Floating Spice Cloud Layer */}
        <FloatingSpiceCanvas intensity={1.3} />

        {/* Top Header */}
        <div className="relative z-30 pt-24 px-6 md:px-16 flex items-center justify-between border-b border-[rgba(43,35,32,0.06)] pb-4">
          <div>
            <div className="font-mono text-xs tracking-[0.25em] text-[#C27838] uppercase font-semibold">
              03 // BOTANICAL PHYSICS
            </div>
            <h2 className="font-serif text-2xl md:text-4xl text-[#2B2320] tracking-tight mt-1">
              The Spice Constellation
            </h2>
          </div>
          <div className="font-mono text-[10px] md:text-xs text-[#574B46] tracking-widest uppercase hidden md:block">
            ACTIVE SUSPENSION: {Math.round(scrollProgress * 100)}% DISPERSION
          </div>
        </div>

        {/* Compact Spice Chips Dock - Docked at Bottom to leave center 100% clear */}
        <div className="relative z-30 px-6 md:px-16 mt-auto pb-4 max-w-7xl mx-auto w-full">
          {/* Top-Right Floating Inspector (only appears on selection, doesn't block center) */}
          {activeSpice !== null && (
            <div className="absolute -top-40 right-6 md:right-16 z-40 bg-[#FAFAF8]/95 backdrop-blur-xl border border-[rgba(43,35,32,0.15)] rounded-2xl p-4 md:p-5 shadow-2xl max-w-sm transition-all duration-300 pointer-events-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#C27838] font-bold">
                  {spices[activeSpice].origin}
                </span>
                <span
                  className="w-2.5 h-2.5 rounded-full ring-2 ring-white/60 shadow-xs"
                  style={{ backgroundColor: spices[activeSpice].color }}
                />
              </div>
              <h4 className="font-serif text-base text-[#2B2320] leading-snug">
                {spices[activeSpice].name} ({spices[activeSpice].vernacular})
              </h4>
              <p className="text-[11px] text-[#574B46] leading-relaxed mt-1">
                {spices[activeSpice].tasting}
              </p>
              <div className="mt-2 pt-2 border-t border-[rgba(43,35,32,0.08)] flex items-center justify-between font-mono text-[9px] text-[#574B46]">
                <span>{spices[activeSpice].compound}</span>
                <span className="text-[#C27838] font-bold">HARVEST CERTIFIED</span>
              </div>
            </div>
          )}

          {/* Bottom Horizontal Minimalist Chips */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            {spices.map((spice, idx) => {
              const isActive = activeSpice === idx;
              return (
                <button
                  key={spice.id}
                  onClick={() => setActiveSpice(activeSpice === idx ? null : idx)}
                  onMouseEnter={() => setActiveSpice(idx)}
                  data-cursor="EXAMINE"
                  className={`flex items-center space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border transition-all text-left shadow-xs ${
                    isActive
                      ? "bg-[#2B2320] text-[#FAFAF8] border-[#2B2320] scale-105 shadow-md"
                      : "bg-[#FAFAF8]/85 backdrop-blur-md text-[#2B2320] border-[rgba(43,35,32,0.12)] hover:border-[#2B2320]"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: spice.color }}
                  />
                  <span className="font-serif text-xs font-medium whitespace-nowrap">
                    {spice.name}
                  </span>
                  <span className={`font-mono text-[9px] hidden md:inline ${isActive ? "text-[#C27838]" : "text-[#574B46]"}`}>
                    · {spice.compound.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Status */}
        <div className="relative z-30 px-6 md:px-16 pb-8 flex items-center justify-between border-t border-[rgba(43,35,32,0.06)] text-[10px] font-mono uppercase tracking-widest text-[#574B46]">
          <div>
            <span>FIG. 03 // 100% UNTOUCHED SPICE MORPHOLOGY</span>
          </div>
          <div>
            <span>SCROLL TO PROCEED TO BLUEPRINT ↘</span>
          </div>
        </div>
      </div>
    </section>
  );
}
