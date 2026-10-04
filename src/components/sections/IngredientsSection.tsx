"use client";

import React, { useRef, useState } from "react";
import { VideoScrubber } from "../motion/VideoScrubber";
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
      className="relative w-full h-[220vh] bg-[#FAFAF8]"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        {/* Background Scrubbed Video (Video 3 - Spice Explosion) */}
        <div className="absolute inset-0 z-0">
          <VideoScrubber
            src="/videos/video-3.mp4"
            posterSrc="/images/image-3.webp"
            triggerRef={containerRef}
            onProgress={setScrollProgress}
          />
        </div>

        {/* ThreeJS Floating Spice Cloud Layer */}
        <FloatingSpiceCanvas intensity={1.3} />

        {/* Top Header */}
        <div className="relative z-30 pt-24 px-6 md:px-16 flex items-center justify-between border-b border-[rgba(43,35,32,0.06)] pb-4">
          <div>
            <div className="font-mono text-xs tracking-[0.25em] text-[#C27838] uppercase font-semibold">
              04 // BOTANICAL PHYSICS
            </div>
            <h2 className="font-serif text-2xl md:text-4xl text-[#2B2320] tracking-tight mt-1">
              The Spice Constellation
            </h2>
          </div>
          <div className="font-mono text-[10px] md:text-xs text-[#574B46] tracking-widest uppercase hidden md:block">
            ACTIVE SUSPENSION: {Math.round(scrollProgress * 100)}% DISPERSION
          </div>
        </div>

        {/* Interactive Constellation Card Strip (Desktop & Tablet) */}
        <div className="relative z-30 px-6 md:px-16 my-auto max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 perspective-1000">
            {spices.map((spice, idx) => {
              const isActive = activeSpice === idx;
              return (
                <div
                  key={spice.id}
                  onMouseEnter={() => setActiveSpice(idx)}
                  onMouseLeave={() => setActiveSpice(null)}
                  data-cursor="SPICE"
                  style={{
                    transform: isActive ? "translateY(-8px) rotateY(6deg) rotateX(-4deg) scale(1.03)" : "none",
                    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease",
                  }}
                  className={`cursor-pointer rounded-xl p-4 border bg-[#FAFAF8]/92 backdrop-blur-md flex flex-col justify-between h-[180px] sm:h-[220px] shadow-sm ${
                    isActive
                      ? "border-[#2B2320] shadow-xl"
                      : "border-[rgba(43,35,32,0.08)] hover:border-[rgba(43,35,32,0.25)]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#574B46]">
                        SP-{spice.id.toString().padStart(2, "0")}
                      </span>
                      <span
                        className="w-2.5 h-2.5 rounded-full ring-2 ring-white/60 shadow-sm"
                        style={{ backgroundColor: spice.color }}
                      />
                    </div>
                    <h3 className="font-serif text-sm sm:text-base font-semibold text-[#2B2320] leading-tight">
                      {spice.name}
                    </h3>
                    <p className="font-serif italic text-xs text-[#574B46] mt-0.5">
                      {spice.vernacular}
                    </p>
                  </div>

                  <div className="mt-auto border-t border-[rgba(43,35,32,0.06)] pt-2 text-[10px] font-mono text-[#574B46]">
                    <div className="truncate font-medium">{spice.compound}</div>
                    <div className="text-[9px] text-[#C27838] mt-0.5 font-semibold">
                      {isActive ? "ACTIVE SELECTION" : "HOVER TO EXAMINE"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Spice Inspector Drawer */}
          {activeSpice !== null && (
            <div className="mt-4 bg-[#FAFAF8]/95 backdrop-blur-lg border border-[rgba(43,35,32,0.15)] rounded-2xl p-5 md:p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-[#C27838]" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#C27838] font-bold">
                    {spices[activeSpice].origin}
                  </span>
                </div>
                <h4 className="font-serif text-xl text-[#2B2320]">
                  {spices[activeSpice].name} — {spices[activeSpice].compound}
                </h4>
                <p className="text-xs md:text-sm text-[#574B46] max-w-3xl leading-relaxed">
                  {spices[activeSpice].tasting}
                </p>
              </div>
              <div className="shrink-0 font-mono text-[10px] uppercase tracking-widest bg-[#2B2320] text-[#FAFAF8] px-4 py-2 rounded-full">
                HARVEST CERTIFIED
              </div>
            </div>
          )}
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
