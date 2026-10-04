"use client";

import React, { useState } from "react";
import { Star, Award, Quote, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export function AccoladesReviewsSection() {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const accolades = [
    {
      institution: "MICHELIN GUIDE 2026",
      award: "Editorial Recommended Selection",
      citation: "Recognized for exemplary craftsmanship in deconstructed Indian gastronomy.",
    },
    {
      institution: "THE WORLD'S 50 BEST",
      award: "Discovery Selection",
      citation: "A monumental reinvention of royal hospitality and single-origin café terroir.",
    },
    {
      institution: "ARCHITECTURAL DIGEST",
      award: "Gastronomic Interior Excellence",
      citation: "Warm cyclorama minimalism marrying stone, walnut and natural daylight.",
    },
    {
      institution: "VOGUE LIVING",
      award: "Atelier Experience of the Year",
      citation: "Choreographed dining where time slows down to the rhythm of tempering spices.",
    },
  ];

  const reviews = [
    {
      quote:
        "At Patel, culinary deconstruction feels not like an intellectual exercise, but a sensual revelation. The samosa alone rewrites Indian pastry technique.",
      author: "Eleanor Vance",
      publication: "The New York Times Dining",
      stars: 5,
    },
    {
      quote:
        "An awe-inspiring symphony of 36 dishes suspended between royal Indian history and surgical precision. The 24-hour Dal Bukhara is transcendent.",
      author: "Michelin Guide Inspector",
      publication: "Haute Gastronomy Evaluation",
      stars: 5,
    },
    {
      quote:
        "The single-origin Monsooned Malabar nitro pour-over followed by the Imperial Thali is the finest transition in modern gastronomy.",
      author: "Marcus Lindqvist",
      publication: "Financial Times Weekend",
      stars: 5,
    },
    {
      quote:
        "Every spice particle, every pour of aged tamarind sauce is calculated like fine clockwork. Patel is an unmissable world-class destination.",
      author: "Ananya Deshmukh",
      publication: "Epicurean Quarterly",
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
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header Strip */}
        <div className="flex items-center space-x-3 mb-16 border-b border-[rgba(43,35,32,0.08)] pb-4">
          <span className="font-mono text-xs tracking-[0.25em] text-[#C27838] uppercase font-semibold">
            ACCOLADES & CRITIQUE
          </span>
          <span className="w-8 h-[1px] bg-[rgba(43,35,32,0.15)]" />
          <span className="font-mono text-xs tracking-[0.2em] text-[#574B46] uppercase">
            Global Recognition // Critical Acclaim
          </span>
        </div>

        {/* Accolades 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {accolades.map((acc, idx) => (
            <div
              key={idx}
              className="bg-[#FAFAF8] p-6 rounded-2xl border border-[rgba(43,35,32,0.1)] hover:border-[#2B2320] transition-colors shadow-xs"
            >
              <div className="flex items-center space-x-2 text-[#C27838] mb-4">
                <Award className="w-4 h-4" />
                <span className="font-mono text-[9px] uppercase tracking-widest font-bold">
                  {acc.institution}
                </span>
              </div>
              <h4 className="font-serif text-lg text-[#2B2320] mb-2 leading-snug">
                {acc.award}
              </h4>
              <p className="text-xs text-[#574B46] leading-relaxed">
                {acc.citation}
              </p>
            </div>
          ))}
        </div>

        {/* Editorial Critic Carousel */}
        <div className="bg-[#2B2320]/[0.02] border border-[rgba(43,35,32,0.09)] rounded-3xl p-8 sm:p-14 md:p-20 relative">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-1 text-[#C27838]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="font-mono text-xs text-[#2B2320] font-bold ml-2">5.0 / 5.0</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={prevReview}
                aria-label="Previous quote"
                className="w-10 h-10 rounded-full border border-[rgba(43,35,32,0.15)] flex items-center justify-center hover:bg-[#2B2320] hover:text-[#FAFAF8] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextReview}
                aria-label="Next quote"
                className="w-10 h-10 rounded-full border border-[rgba(43,35,32,0.15)] flex items-center justify-center hover:bg-[#2B2320] hover:text-[#FAFAF8] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quote Content */}
          <div className="min-h-[140px] flex flex-col justify-between">
            <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#2B2320] leading-snug tracking-tight mb-8">
              &ldquo;{reviews[activeReviewIndex].quote}&rdquo;
            </blockquote>

            <div className="flex items-center justify-between border-t border-[rgba(43,35,32,0.08)] pt-6">
              <div>
                <div className="font-serif text-base text-[#2B2320] font-semibold">
                  {reviews[activeReviewIndex].author}
                </div>
                <div className="font-mono text-xs uppercase tracking-wider text-[#C27838]">
                  {reviews[activeReviewIndex].publication}
                </div>
              </div>

              <div className="font-mono text-xs text-[#574B46] tracking-widest uppercase">
                CRITIC DISPATCH 0{activeReviewIndex + 1} / 0{reviews.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
