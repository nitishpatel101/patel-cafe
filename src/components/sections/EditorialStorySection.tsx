"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export function EditorialStorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-15% 0px -15% 0px" });

  const paragraphs = [
    "In the imperial courts of Rajasthan, a royal thali was never merely cooked; it was calculated like a celestial instrument.",
    "The imperial Khansamas balanced the six canonical tastes (Shad Rasa)—Madhu (Sweet), Amla (Sour), Lavana (Salty), Katu (Pungent), Tikta (Bitter), and Kashaya (Astringent)—arranging every copper katori according to Ayurvedic astronomy and digestion rhythms.",
    "When deconstructed in mid-air, each element reveals an uncompromising architecture: stone-ground whole spices tempered at exact flash points, hand-churned cultured ghee, and heirloom grains preserved across five centuries of gastronomic heritage.",
  ];

  return (
    <section
      id="section-heritage"
      ref={ref}
      className="relative w-full py-28 md:py-40 bg-[#FAFAF8] border-b border-[rgba(43,35,32,0.06)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Section Header Tag */}
        <div className="flex items-center space-x-3 mb-16 border-b border-[rgba(43,35,32,0.08)] pb-4">
          <span className="font-mono text-xs tracking-[0.25em] text-[#C27838] uppercase font-semibold">
            02 // PHILOSOPHY
          </span>
          <span className="w-8 h-[1px] bg-[rgba(43,35,32,0.15)]" />
          <span className="font-mono text-xs tracking-[0.2em] text-[#574B46] uppercase">
            The Geometry of the Royal Khansama
          </span>
        </div>

        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Editorial Narrative */}
          <div className="lg:col-span-6 space-y-8">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2B2320] leading-[1.05] tracking-tight">
              A feast calibrated <br />
              <span className="italic font-light text-[#574B46]">like celestial clockwork.</span>
            </h2>

            <div className="space-y-6 text-[#574B46] text-base md:text-lg leading-relaxed font-normal">
              {paragraphs.map((p, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: idx * 0.18, ease: [0.16, 1, 0.3, 1] }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Scientific Flavor Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[rgba(43,35,32,0.08)]">
              <div>
                <div className="font-mono text-2xl font-serif text-[#2B2320]">36</div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-[#574B46] mt-1">
                  Individual Bowls
                </div>
              </div>
              <div>
                <div className="font-mono text-2xl font-serif text-[#2B2320]">06</div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-[#574B46] mt-1">
                  Sacred Rasas
                </div>
              </div>
              <div>
                <div className="font-mono text-2xl font-serif text-[#2B2320]">108°</div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-[#574B46] mt-1">
                  Copper Roasting
                </div>
              </div>
              <div>
                <div className="font-mono text-2xl font-serif text-[#2B2320]">24H</div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-[#574B46] mt-1">
                  Dal Bukhara Simmer
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Reveal (Image 1) */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
              animate={
                isInView
                  ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }
                  : { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }
              }
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[rgba(43,35,32,0.08)] shadow-lg bg-[#FAFAF8]"
              data-cursor="INSPECT"
            >
              <Image
                src="/images/image-1.webp"
                alt="Deconstructed Royal Thali Composition"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B2320]/25 via-transparent to-transparent pointer-events-none" />

              {/* Fine overlay badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[#FAFAF8] text-[10px] font-mono tracking-widest uppercase">
                <span className="bg-[#2B2320]/80 backdrop-blur-md px-3 py-1 rounded-full">
                  PLATE DECONSTRUCTION // ARCHIVAL
                </span>
                <span className="bg-[#2B2320]/80 backdrop-blur-md px-3 py-1 rounded-full hidden sm:inline">
                  STUDIO CYCLORAMA 16:9
                </span>
              </div>
            </motion.div>

            {/* Archival Note */}
            <p className="font-mono text-[10px] text-[#574B46] tracking-wider uppercase mt-4 flex items-center justify-between">
              <span>FIG. 01 — FULL SUSPENSION STATE</span>
              <span>MICHELIN GUIDE EDITORIAL ARCHIVE</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
