"use client";

import React, { useRef, useState } from "react";
import { VideoScrubber } from "../motion/VideoScrubber";
import { FloatingSpiceCanvas } from "../three/FloatingSpiceCanvas";

export function ExplodedSamosaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Apple-hardware style exploded callouts with precise SVG line trajectories
  const callouts = [
    {
      id: "crust",
      title: "01 // CRUST LAMINATION",
      subtitle: "0.4mm Ajwain-Infused Shell",
      description: "Crispy multi-layer pastry fried gently in clarified cow's butter. Carom seeds deliver pungent medicinal warmth.",
      top: "20%",
      left: "8%",
      originX: 25,
      originY: 26,
      midX: 34,
      midY: 26,
      targetX: 43,
      targetY: 37,
      triggerStart: 0.16,
      triggerEnd: 0.95,
    },
    {
      id: "core",
      title: "02 // AROMATIC CORE",
      subtitle: "Crushed Yukon Potato & Cumin Bloom",
      description: "Steamed mountain potatoes hand-crushed, tempered in cold-pressed mustard oil with roasted royal cumin and ginger.",
      top: "28%",
      right: "8%",
      originX: 74,
      originY: 35,
      midX: 65,
      midY: 35,
      targetX: 55,
      targetY: 43,
      triggerStart: 0.28,
      triggerEnd: 0.95,
    },
    {
      id: "botanical",
      title: "03 // BOTANICAL RELIEF",
      subtitle: "Heirloom Green Peas & Wild Anardana",
      description: "Sweet winter peas balanced against sun-dried Himalayan pomegranate seeds for sharp bursts of natural acidity.",
      top: "62%",
      left: "10%",
      originX: 27,
      originY: 68,
      midX: 36,
      midY: 68,
      targetX: 46,
      targetY: 57,
      triggerStart: 0.44,
      triggerEnd: 0.95,
    },
    {
      id: "particles",
      title: "04 // SUSPENDED PARTICULATES",
      subtitle: "Micro Pastry Flakes & Coriander Dust",
      description: "Delicate pastry crumbs and cracked coriander husks hovering in scientific micro-gravity.",
      top: "68%",
      right: "10%",
      originX: 73,
      originY: 74,
      midX: 64,
      midY: 74,
      targetX: 56,
      targetY: 63,
      triggerStart: 0.58,
      triggerEnd: 0.95,
    },
  ];

  return (
    <section
      id="section-samosa"
      ref={containerRef}
      className="relative w-full h-[220vh] bg-[#FAFAF8]"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        {/* Background Scrubbed Video (Video 2 - Exploded Samosa) */}
        <div className="absolute inset-0 z-0">
          <VideoScrubber
            src="/videos/video-2.mp4"
            posterSrc="/images/image-2.webp"
            triggerRef={containerRef}
            onProgress={setScrollProgress}
          />
        </div>

        {/* Floating Spice Dust Canvas */}
        <FloatingSpiceCanvas intensity={0.7} />

        {/* Section Header Strip */}
        <div className="relative z-30 pt-24 px-6 md:px-16 flex items-center justify-between border-b border-[rgba(43,35,32,0.06)] pb-4">
          <div>
            <div className="font-mono text-xs tracking-[0.25em] text-[#C27838] uppercase font-semibold">
              03 // ANATOMY OF A DELICACY
            </div>
            <h2 className="font-serif text-2xl md:text-4xl text-[#2B2320] tracking-tight mt-1">
              The Deconstructed Samosa
            </h2>
          </div>
          <div className="font-mono text-[10px] md:text-xs text-[#574B46] tracking-widest uppercase hidden sm:block">
            CALIBRATION: 0.4MM SHELL // STEAM EXTRACTION
          </div>
        </div>

        {/* Apple-hardware SVG connector lines overlay */}
        <svg
          className="pointer-events-none absolute inset-0 w-full h-full z-15 hidden md:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {callouts.map((item) => {
            const isVisible =
              scrollProgress >= item.triggerStart && scrollProgress <= item.triggerEnd;
            return (
              <g
                key={item.id}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {/* Connecting polyline */}
                <polyline
                  points={`${item.originX},${item.originY} ${item.midX},${item.midY} ${item.targetX},${item.targetY}`}
                  fill="none"
                  stroke="#2B2320"
                  strokeWidth="0.18"
                  strokeDasharray="0.6 0.6"
                  opacity="0.45"
                />

                {/* Card connection node */}
                <circle
                  cx={item.originX}
                  cy={item.originY}
                  r="0.5"
                  fill="#C27838"
                />

                {/* Focal target pulsing radar rings */}
                <circle
                  cx={item.targetX}
                  cy={item.targetY}
                  r="1.4"
                  fill="none"
                  stroke="#C27838"
                  strokeWidth="0.16"
                  opacity="0.6"
                  className="animate-ping"
                />
                <circle
                  cx={item.targetX}
                  cy={item.targetY}
                  r="0.75"
                  fill="#FAFAF8"
                  stroke="#2B2320"
                  strokeWidth="0.18"
                />
                <circle
                  cx={item.targetX}
                  cy={item.targetY}
                  r="0.35"
                  fill="#C27838"
                />
              </g>
            );
          })}
        </svg>

        {/* Exploded Hardware Style Interactive Pins & Cards */}
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          {callouts.map((item, idx) => {
            const isVisible =
              scrollProgress >= item.triggerStart && scrollProgress <= item.triggerEnd;
            return (
              <div
                key={idx}
                style={{
                  top: item.top,
                  left: item.left,
                  right: item.right,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translateY(0px) scale(1)"
                    : "translateY(12px) scale(0.96)",
                  transition:
                    "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="absolute hidden md:block max-w-[280px] bg-[#FAFAF8]/95 backdrop-blur-md p-4 rounded-xl border border-[rgba(43,35,32,0.12)] shadow-md pointer-events-auto group hover:border-[#2B2320] transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5 border-b border-[rgba(43,35,32,0.06)] pb-1">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#C27838] font-bold">
                    {item.title}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2B2320]" />
                </div>
                <h4 className="font-serif text-sm font-semibold text-[#2B2320] mb-1">
                  {item.subtitle}
                </h4>
                <p className="text-[11px] leading-relaxed text-[#574B46]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Progress Status */}
        <div className="relative z-30 px-6 md:px-16 pb-8 flex items-center justify-between border-t border-[rgba(43,35,32,0.06)] text-[10px] font-mono uppercase tracking-widest text-[#574B46]">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-[#C27838] animate-pulse" />
            <span>CRISP LAYER CLEAVE: {Math.round(scrollProgress * 100)}%</span>
          </div>

          <div>
            <span>APPLE HARDWARE INVENTED EDITORIAL // GSAP TIME-SCRUB</span>
          </div>
        </div>
      </div>
    </section>
  );
}
