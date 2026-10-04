"use client";

import React, { useState } from "react";
import { Clock, MapPin, Phone, Mail, ArrowUpRight, Check, Sparkles, Compass } from "lucide-react";
import { motion } from "framer-motion";

export function CafeVisitSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  const schedule = [
    {
      session: "Morning Roast & Artisanal Brews",
      time: "08:00 – 12:00",
      description: "Pour-overs, nitro cold brews, freshly baked khamir buns, and Kashmiri saffron tea.",
      icon: "☕",
    },
    {
      session: "The Royal Luncheon",
      time: "12:30 – 15:30",
      description: "Deconstructed royal thalis, clay-pot lentils, and seasonal botanical salads.",
      icon: "🍲",
    },
    {
      session: "High-Tea & Savoury Hours",
      time: "16:00 – 18:00",
      description: "Crisp artisanal samosas, dahi puri spheres, and single-estate Nilgiri flushes.",
      icon: "🫖",
    },
    {
      session: "Imperial Night Gastronomy",
      time: "18:30 – 23:30",
      description: "The 36-dish banquet experience, tandoor masterworks, and aged digestifs.",
      icon: "✨",
    },
  ];

  return (
    <section
      id="section-visit"
      className="relative w-full py-28 md:py-40 bg-[#FAFAF8] border-b border-[rgba(43,35,32,0.06)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header Strip */}
        <div className="flex items-center space-x-3 mb-16 border-b border-[rgba(43,35,32,0.08)] pb-4">
          <span className="font-mono text-xs tracking-[0.25em] text-[#C27838] uppercase font-semibold">
            10 // VISIT & EXPERIENCE
          </span>
          <span className="w-8 h-[1px] bg-[rgba(43,35,32,0.15)]" />
          <span className="font-mono text-xs tracking-[0.2em] text-[#574B46] uppercase">
            Service Timings // Atelier Sanctuary
          </span>
        </div>

        {/* 2-Column Split: Hours vs 3D Interactive Location & Compass Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Operating Timetable with Micro-Hover Glow */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-serif text-3xl sm:text-4xl text-[#2B2320] tracking-tight">
              A Rhythm Orchestrated by Fire & Dawn
            </h3>
            <p className="text-sm text-[#574B46] leading-relaxed max-w-xl font-light">
              Service begins with the first roast of aged beans at sunrise and concludes as the charcoal embers of our 24-hour Dal Bukhara settle into embers.
            </p>

            <div className="space-y-4 pt-4">
              {schedule.map((slot, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 6, backgroundColor: "rgba(43, 35, 32, 0.03)" }}
                  className="p-5 sm:p-6 rounded-2xl border border-[rgba(43,35,32,0.1)] bg-[#FAFAF8] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2.5">
                      <span className="text-base">{slot.icon}</span>
                      <h4 className="font-serif text-lg text-[#2B2320]">
                        {slot.session}
                      </h4>
                    </div>
                    <p className="text-xs text-[#574B46] max-w-md leading-relaxed font-light">
                      {slot.description}
                    </p>
                  </div>
                  <div className="shrink-0 font-mono text-xs text-[#C27838] font-bold px-3 py-1.5 rounded-full bg-[#C27838]/10 border border-[#C27838]/20 self-start sm:self-center">
                    {slot.time}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: 3D Interactive Location Card & Atelier Dispatch */}
          <div className="lg:col-span-5 space-y-6">
            {/* 3D Spatial Compass & Coordinate Plaque */}
            <motion.div
              whileHover={{ rotateY: -4, rotateX: 4, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FAFAF8] border border-[rgba(43,35,32,0.14)] rounded-3xl p-8 shadow-xl space-y-6 relative overflow-hidden"
              style={{ perspective: 800 }}
            >
              {/* Top Status Beacon */}
              <div className="flex items-center justify-between border-b border-[rgba(43,35,32,0.08)] pb-4">
                <div className="flex items-center space-x-2 text-[9px] font-mono uppercase tracking-widest text-[#5A6B48]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5A6B48] animate-pulse" />
                  <span>KITCHEN HEARTH FIRING // WELCOMING PATRONS</span>
                </div>
                {/* 3D Rotating Compass Dial */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 rounded-full border border-[rgba(43,35,32,0.2)] flex items-center justify-center text-[#C27838]"
                >
                  <Compass className="w-4 h-4" />
                </motion.div>
              </div>

              {/* Atelier Address Coordinates */}
              <div className="space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#C27838] font-bold">
                  SANCTUARY COORDINATES
                </span>
                <h4 className="font-serif text-2xl text-[#2B2320]">
                  Patel Flavour Atelier & Café
                </h4>
                <p className="text-xs text-[#574B46] leading-relaxed">
                  Heritage Quarters, Civil Lines, Court Road <br />
                  Jaipur / Delhi NCR Culinary Corridor, India
                </p>
                <div className="font-mono text-[10px] text-[#574B46] pt-1">
                  LAT: 26.9124° N // LONG: 75.7873° E // ELEV: 431M
                </div>
              </div>

              {/* Direct Concierge Access */}
              <div className="pt-2 border-t border-[rgba(43,35,32,0.08)] space-y-2 text-xs">
                <div className="flex items-center space-x-3 text-[#574B46]">
                  <Phone className="w-3.5 h-3.5 text-[#C27838]" />
                  <span className="font-mono text-[11px]">+91 (0141) 880-PATEL</span>
                </div>
                <div className="flex items-center space-x-3 text-[#574B46]">
                  <Mail className="w-3.5 h-3.5 text-[#C27838]" />
                  <span className="font-mono text-[11px]">concierge@patelatelier.in</span>
                </div>
              </div>

              {/* Interactive Direction Anchor */}
              <a
                href="#section-reservation"
                className="w-full py-3 rounded-full bg-[#2B2320] text-[#FAFAF8] font-mono text-[10px] uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-[#C27838] transition-colors"
              >
                <span>Navigate to Reservation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            {/* Newsletter Dispatch Card */}
            <div className="bg-[#2B2320]/[0.03] border border-[rgba(43,35,32,0.08)] rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#C27838] font-bold">
                  PRIVATE ATELIER DISPATCH
                </span>
                <h4 className="font-serif text-xl text-[#2B2320]">
                  Rare Harvest & Harvest Invitations
                </h4>
                <p className="text-xs text-[#574B46] leading-relaxed font-light">
                  Receive private seasonal notices for foraged Himalayan morels, solera vinegar releases, and exclusive culinary seatings.
                </p>
              </div>

              {subscribed ? (
                <div className="flex items-center space-x-2 text-xs text-[#5A6B48] font-mono">
                  <Check className="w-4 h-4 text-[#5A6B48]" />
                  <span>Enrolled into Patel Private Gazette.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter private email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-[#FAFAF8] border border-[rgba(43,35,32,0.18)] rounded-full px-4 py-2.5 text-xs text-[#2B2320] focus:outline-none focus:border-[#2B2320]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-[#2B2320] text-[#FAFAF8] font-mono text-[10px] uppercase tracking-widest hover:bg-[#C27838] transition-colors shrink-0"
                  >
                    Enroll
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
