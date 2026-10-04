"use client";

import React, { useState } from "react";
import { Star, Award, ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Trophy, Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AccoladesReviewsSection() {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [hoveredAccolade, setHoveredAccolade] = useState<number | null>(null);

  const accolades = [
    {
      institution: "MICHELIN GUIDE 2026",
      award: "Editorial Recommended Selection",
      citation: "Recognized for exemplary craftsmanship in deconstructed Indian gastronomy.",
      icon: Crown,
      tier: "3 STARS RATED",
      accent: "#C27838",
    },
    {
      institution: "THE WORLD'S 50 BEST",
      award: "Discovery Selection",
      citation: "A monumental reinvention of royal hospitality and single-origin café terroir.",
      icon: Trophy,
      tier: "GLOBAL DISCOVERY",
      accent: "#A9442C",
    },
    {
      institution: "ARCHITECTURAL DIGEST",
      award: "Gastronomic Interior Excellence",
      citation: "Warm cyclorama minimalism marrying stone, walnut and natural daylight.",
      icon: Award,
      tier: "DESIGN GOLD",
      accent: "#5A6B48",
    },
    {
      institution: "VOGUE LIVING",
      award: "Atelier Experience of the Year",
      citation: "Choreographed dining where time slows down to the rhythm of tempering spices.",
      icon: ShieldCheck,
      tier: "EXPERIENCE CRITIC",
      accent: "#C27838",
    },
  ];

  const reviews = [
    {
      quote:
        "At Patel, culinary deconstruction feels not like an intellectual exercise, but a sensual revelation. The samosa alone rewrites Indian pastry technique.",
      author: "Eleanor Vance",
      publication: "The New York Times Dining",
      city: "New York",
      stars: 5,
    },
    {
      quote:
        "An awe-inspiring symphony of 36 dishes suspended between royal Indian history and surgical precision. The 24-hour Dal Bukhara is transcendent.",
      author: "Michelin Guide Inspector",
      publication: "Haute Gastronomy Evaluation",
      city: "Paris",
      stars: 5,
    },
    {
      quote:
        "The single-origin Monsooned Malabar nitro pour-over followed by the Imperial Thali is the finest transition in modern gastronomy.",
      author: "Marcus Lindqvist",
      publication: "Financial Times Weekend",
      city: "London",
      stars: 5,
    },
    {
      quote:
        "Every spice particle, every pour of aged tamarind sauce is calculated like fine clockwork. Patel is an unmissable world-class destination.",
      author: "Ananya Deshmukh",
      publication: "Epicurean Quarterly",
      city: "Mumbai",
      stars: 5,
    },
  ];

  const nextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="relative w-full py-28 md:py-40 bg-[#FAFAF8] border-b border-[rgba(43,35,32,0.06)] overflow-hidden">
      {/* Ambient 3D floating gold dust */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-[#C27838]/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-[#5A6B48]/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
        {/* Header Strip */}
        <div className="flex items-center space-x-3 mb-16 border-b border-[rgba(43,35,32,0.08)] pb-4">
          <span className="font-mono text-xs tracking-[0.25em] text-[#C27838] uppercase font-semibold">
            08 // ACCOLADES & CRITIQUE
          </span>
          <span className="w-8 h-[1px] bg-[rgba(43,35,32,0.15)]" />
          <span className="font-mono text-xs tracking-[0.2em] text-[#574B46] uppercase">
            Global Recognition // Critical Acclaim
          </span>
        </div>

        {/* 3D Interactive Accolades Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {accolades.map((acc, idx) => {
            const IconComponent = acc.icon;
            const isHovered = hoveredAccolade === idx;

            return (
              <motion.div
                key={idx}
                onMouseEnter={() => setHoveredAccolade(idx)}
                onMouseLeave={() => setHoveredAccolade(null)}
                whileHover={{
                  y: -8,
                  rotateX: 6,
                  rotateY: -4,
                  scale: 1.02,
                  transition: { duration: 0.25 },
                }}
                className="relative bg-[#FAFAF8] p-6 sm:p-7 rounded-3xl border border-[rgba(43,35,32,0.12)] shadow-md hover:shadow-2xl transition-all cursor-pointer overflow-hidden will-change-transform"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: 800,
                }}
              >
                {/* 3D Metallic Medal Coin */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${acc.accent}20 0%, ${acc.accent}40 100%)`,
                      border: `1.5px solid ${acc.accent}60`,
                      transform: isHovered ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    <IconComponent className="w-6 h-6" style={{ color: acc.accent }} />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-[rgba(43,35,32,0.05)] text-[#574B46] font-bold">
                    {acc.tier}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="font-mono text-[10px] uppercase tracking-widest font-bold" style={{ color: acc.accent }}>
                    {acc.institution}
                  </div>
                  <h4 className="font-serif text-xl text-[#2B2320] leading-snug">
                    {acc.award}
                  </h4>
                  <p className="text-xs text-[#574B46] leading-relaxed pt-1 font-light">
                    {acc.citation}
                  </p>
                </div>

                {/* Subtle bottom metallic foil indicator */}
                <div
                  className="absolute bottom-0 inset-x-0 h-1 transition-all duration-300"
                  style={{
                    backgroundColor: isHovered ? acc.accent : "transparent",
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* 3D Spatial Critic Reviews Carousel */}
        <motion.div
          whileHover={{ scale: 1.008 }}
          transition={{ duration: 0.3 }}
          className="relative bg-[#FAFAF8] border border-[rgba(43,35,32,0.12)] rounded-3xl p-8 sm:p-14 md:p-18 shadow-xl overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #FAFAF8 0%, rgba(240, 238, 230, 0.4) 100%)",
          }}
        >
          {/* Top Bar with Star Ratings & Controls */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-[rgba(43,35,32,0.08)]">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 text-[#C27838]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-[#C27838]" />
                ))}
              </div>
              <span className="font-mono text-xs font-bold text-[#2B2320] ml-2">
                5.0 / 5.0 UNANIMOUS
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={prevReview}
                aria-label="Previous quote"
                className="w-11 h-11 rounded-full border border-[rgba(43,35,32,0.18)] flex items-center justify-center hover:bg-[#2B2320] hover:text-[#FAFAF8] transition-all shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextReview}
                aria-label="Next quote"
                className="w-11 h-11 rounded-full border border-[rgba(43,35,32,0.18)] flex items-center justify-center hover:bg-[#2B2320] hover:text-[#FAFAF8] transition-all shadow-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Animated Review Quote */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeReviewIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="min-h-[140px] flex flex-col justify-between"
            >
              <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#2B2320] leading-snug tracking-tight mb-8">
                &ldquo;{reviews[activeReviewIndex].quote}&rdquo;
              </blockquote>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-[rgba(43,35,32,0.08)]">
                <div>
                  <div className="font-serif text-lg text-[#2B2320] font-semibold">
                    {reviews[activeReviewIndex].author}
                  </div>
                  <div className="font-mono text-xs uppercase tracking-wider text-[#C27838]">
                    {reviews[activeReviewIndex].publication} // {reviews[activeReviewIndex].city}
                  </div>
                </div>

                <div className="font-mono text-xs text-[#574B46] tracking-widest uppercase">
                  CRITIC DISPATCH 0{activeReviewIndex + 1} / 0{reviews.length}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
