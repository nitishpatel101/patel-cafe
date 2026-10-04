"use client";

import React, { useRef, useState } from "react";
import { VideoScrubber } from "../motion/VideoScrubber";
import { FloatingSpiceCanvas } from "../three/FloatingSpiceCanvas";
import { MagneticButton } from "../common/MagneticButton";
import { ArrowDown, Sparkles } from "lucide-react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Floating culinary element callouts that fade in as thali explodes
  const elements = [
    { label: "01/36 · Saffron Dum Rice", desc: "Long-grain aged basmati steeped in Kashmir saffron", top: "24%", left: "12%", trigger: 0.15 },
    { label: "02/36 · Dal Bukhara 24H", desc: "Slow simmered over charcoal with churned butter", top: "28%", right: "12%", trigger: 0.28 },
    { label: "03/36 · Tandoori Paneer Tikka", desc: "Aged cow's milk paneer, crushed coriander roast", top: "68%", left: "14%", trigger: 0.42 },
    { label: "04/36 · Khamir Naan & Papad", desc: "Stone-ground flour fired in clay tandoor", top: "72%", right: "14%", trigger: 0.55 },
    { label: "05/36 · Royal Condiments & Raita", desc: "Wild cucumber, toasted cumin, mango relish", top: "48%", left: "8%", trigger: 0.68 },
    { label: "06/36 · Kesar Phirni Bowl", desc: "Hand-pounded rice pudding, silver leaf & pistachio", top: "48%", right: "8%", trigger: 0.78 },
  ];

  return (
    <section
      id="section-thali"
      ref={containerRef}
      className="relative w-full h-[220vh] bg-[#FAFAF8]"
    >
      {/* Sticky Fullscreen Scrubber Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        {/* Background Scrubbed Video (Hero Exploded Royal Thali) */}
        <div className="absolute inset-0 z-0">
          <VideoScrubber
            src="/videos/video-1.mp4"
            posterSrc="/images/image-1.webp"
            triggerRef={containerRef}
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
        <div className="relative z-30 pt-24 px-6 md:px-16" />

        {/* Hero Headline Overlay (moves gracefully as scrub progresses) */}
        <div
          className="relative z-30 max-w-7xl mx-auto px-6 md:px-16 w-full text-center pointer-events-none transition-all duration-300"
          style={{
            transform: `translateY(-${scrollProgress * 65}px)`,
            opacity: Math.max(0, 1 - scrollProgress * 1.8),
          }}
        >
          <div className="inline-flex items-center space-x-2 font-mono text-[10px] md:text-xs uppercase tracking-[0.28em] text-[#574B46] mb-3 bg-[#FAFAF8]/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[rgba(43,35,32,0.08)]">
            <Sparkles className="w-3 h-3 text-[#C27838]" />
            <span>PATEL ATELIER & CAFÉ // 36 DECONSTRUCTED ELEMENTS</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-9xl text-[#2B2320] tracking-tight leading-[0.92] mb-6">
            PATEL <br />
            <span className="font-serif italic font-light text-[#574B46]">FLAVOUR ATELIER</span>
          </h1>

          <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-[#574B46] font-normal leading-relaxed mb-8">
            A bespoke meeting of royal Indian gastronomy and artisanal café culture. Every brass katori, single-origin brew, and fragile spice particle suspended in frame-accurate equilibrium.
          </p>

          {/* Interactive CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
            <MagneticButton
              onClick={() => {
                document.getElementById("section-reservation")?.scrollIntoView({ behavior: "smooth" });
              }}
              dataCursor="BOOK TABLE"
              className="bg-[#2B2320] text-[#FAFAF8] font-mono text-[11px] uppercase tracking-[0.22em] px-8 py-4 rounded-full hover:bg-[#574B46] transition-all duration-300 shadow-md"
            >
              Reserve Table
            </MagneticButton>
            <MagneticButton
              onClick={() => {
                document.getElementById("section-cafe-menu")?.scrollIntoView({ behavior: "smooth" });
              }}
              dataCursor="EXPLORE MENU"
              className="border border-[rgba(43,35,32,0.25)] text-[#2B2320] font-mono text-[11px] uppercase tracking-[0.22em] px-8 py-4 rounded-full hover:bg-[rgba(43,35,32,0.04)] transition-all duration-300 bg-[#FAFAF8]/60 backdrop-blur-sm"
            >
              Explore Café Menu
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
