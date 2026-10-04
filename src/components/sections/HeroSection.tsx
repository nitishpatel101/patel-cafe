"use client";

import React, { useRef, useState } from "react";
import { CanvasFrameScrubber } from "../motion/CanvasFrameScrubber";
import { FloatingSpiceCanvas } from "../three/FloatingSpiceCanvas";
import { MagneticButton } from "../common/MagneticButton";
import { ArrowDown, Sparkles } from "lucide-react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Floating culinary element callouts pushed to outer edges so central thali is 100% visible
  const elements = [
    { label: "01/36 · Saffron Dum Rice", desc: "Long-grain aged basmati steeped in Kashmir saffron", top: "20%", left: "4%", trigger: 0.15 },
    { label: "02/36 · Dal Bukhara 24H", desc: "Slow simmered over charcoal with churned butter", top: "20%", right: "4%", trigger: 0.28 },
    { label: "03/36 · Tandoori Paneer Tikka", desc: "Aged cow's milk paneer, crushed coriander roast", top: "70%", left: "4%", trigger: 0.42 },
    { label: "04/36 · Khamir Naan & Papad", desc: "Stone-ground flour fired in clay tandoor", top: "70%", right: "4%", trigger: 0.55 },
    { label: "05/36 · Royal Condiments & Raita", desc: "Wild cucumber, toasted cumin, mango relish", top: "45%", left: "3%", trigger: 0.68 },
    { label: "06/36 · Kesar Phirni Bowl", desc: "Hand-pounded rice pudding, silver leaf & pistachio", top: "45%", right: "3%", trigger: 0.78 },
  ];

  return (
    <section
      id="section-thali"
      ref={containerRef}
      className="relative w-full h-[300vh] bg-[#FAFAF8]"
    >
      {/* Sticky Fullscreen Scrubber Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        {/* Background Scrubbed Frame Sequence (Hero Exploded Royal Thali) */}
        <div className="absolute inset-0 z-0">
          <CanvasFrameScrubber
            videoId="video-1"
            frameCount={180}
            triggerRef={containerRef}
            nextSectionId="section-heritage"
            onProgress={setScrollProgress}
            priority={true}
          />
        </div>

        {/* Floating 3D Spice Dust Canvas */}
        <FloatingSpiceCanvas intensity={0.9} />

        {/* Floating Ingredient Depth Pins (Fade in as thali explodes) */}
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          {elements.map((el, i) => {
            const isVisible = scrollProgress >= el.trigger;
            return (
              <div
                key={i}
                style={{
                  top: el.top,
                  left: el.left,
                  right: el.right,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? `translateY(0px) scale(1)`
                    : `translateY(16px) scale(0.94)`,
                  transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="absolute hidden md:block max-w-[210px] bg-[#FAFAF8]/92 backdrop-blur-md p-3 rounded-lg border border-[rgba(43,35,32,0.08)] shadow-sm pointer-events-auto"
              >
                <div className="flex items-center space-x-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C27838]" />
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#2B2320] font-semibold">
                    {el.label}
                  </span>
                </div>
                <p className="text-[10.5px] leading-relaxed text-[#574B46]">
                  {el.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Top Spacer for Nav */}
        <div className="relative z-30 pt-20 px-6 md:px-14" />

        {/* Hero Editorial Header - Positioned at Top-Left to keep center thali 100% visible */}
        <div
          className="absolute top-24 md:top-28 left-6 md:left-14 z-30 max-w-md pointer-events-none transition-all duration-300"
          style={{
            transform: `translateY(-${scrollProgress * 40}px)`,
            opacity: Math.max(0, 1 - scrollProgress * 3.2),
          }}
        >
          <div className="inline-flex items-center space-x-2 font-mono text-[9px] uppercase tracking-[0.24em] text-[#574B46] mb-2.5 bg-[#FAFAF8]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[rgba(43,35,32,0.1)] shadow-xs">
            <Sparkles className="w-3 h-3 text-[#C27838]" />
            <span>PATEL ATELIER · 36 ELEMENTS</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2B2320] tracking-tight leading-[1.02] mb-3">
            PATEL <br />
            <span className="font-serif italic font-light text-[#574B46]">FLAVOUR ATELIER</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#574B46] font-normal leading-relaxed mb-5 max-w-xs">
            Royal Indian culinary architecture deconstructed in zero-gravity equilibrium.
          </p>

          {/* Interactive Compact CTAs */}
          <div className="flex items-center gap-3 pointer-events-auto">
            <MagneticButton
              onClick={() => {
                document.getElementById("section-reservation")?.scrollIntoView({ behavior: "smooth" });
              }}
              dataCursor="BOOK TABLE"
              className="bg-[#2B2320] text-[#FAFAF8] font-mono text-[10px] uppercase tracking-[0.2em] px-5 py-2.5 rounded-full hover:bg-[#574B46] transition-all shadow-sm"
            >
              Reserve Table
            </MagneticButton>
            <MagneticButton
              onClick={() => {
                document.getElementById("section-cafe-menu")?.scrollIntoView({ behavior: "smooth" });
              }}
              dataCursor="MENU"
              className="border border-[rgba(43,35,32,0.25)] text-[#2B2320] font-mono text-[10px] uppercase tracking-[0.2em] px-5 py-2.5 rounded-full hover:bg-[rgba(43,35,32,0.06)] transition-all bg-[#FAFAF8]/90 backdrop-blur-sm"
            >
              Café Menu
            </MagneticButton>
          </div>
        </div>

        {/* Bottom Status & Scrub Indicator */}
        <div className="relative z-30 px-6 md:px-16 pb-8 flex items-end justify-between border-t border-[rgba(43,35,32,0.06)] text-[10px] font-mono uppercase tracking-widest text-[#574B46]">
          <div className="hidden sm:flex items-center space-x-3">
            <span>SCENE 01 // HERO THALI</span>
            <span>·</span>
            <span>LINEAR FRAME SCRUB</span>
            <span>·</span>
            <span>{Math.round(scrollProgress * 100)}% EXPLODED</span>
          </div>

          <div className="flex items-center space-x-2 ml-auto">
            <span className="text-[#2B2320]">SCROLL DOWN TO DECONSTRUCT</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#C27838]" />
          </div>
        </div>
      </div>
    </section>
  );
}
