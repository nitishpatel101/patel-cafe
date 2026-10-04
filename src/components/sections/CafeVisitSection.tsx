"use client";

import React, { useState } from "react";
import { Clock, MapPin, Phone, Mail, ArrowUpRight, Check, Sparkles } from "lucide-react";

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
    },
    {
      session: "The Royal Luncheon",
      time: "12:30 – 15:30",
      description: "Deconstructed royal thalis, clay-pot lentils, and seasonal botanical salads.",
    },
    {
      session: "High-Tea & Savoury Hours",
      time: "16:00 – 18:00",
      description: "Crisp artisanal samosas, dahi puri spheres, and single-estate Nilgiri flushes.",
    },
    {
      session: "Imperial Night Gastronomy",
      time: "18:30 – 23:30",
      description: "The 36-dish banquet experience, tandoor masterworks, and aged digestifs.",
    },
  ];

  return (
    <section
      id="section-visit"
      className="relative w-full py-28 md:py-40 bg-[#FAFAF8] border-b border-[rgba(43,35,32,0.06)]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header Strip */}
        <div className="flex items-center space-x-3 mb-16 border-b border-[rgba(43,35,32,0.08)] pb-4">
          <span className="font-mono text-xs tracking-[0.25em] text-[#C27838] uppercase font-semibold">
            VISIT & EXPERIENCE
          </span>
          <span className="w-8 h-[1px] bg-[rgba(43,35,32,0.15)]" />
          <span className="font-mono text-xs tracking-[0.2em] text-[#574B46] uppercase">
            Service Timings // Atelier Sanctuary
          </span>
        </div>

        {/* 2-Column Split: Hours vs Location & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Operating Timetable */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-serif text-3xl sm:text-4xl text-[#2B2320] tracking-tight">
              Hours of Culinary Service
            </h3>
            <p className="text-sm text-[#574B46] leading-relaxed">
              We welcome walk-ins for café brews and savouries. Dinner banquets are strictly limited to twenty-four patrons nightly to ensure unhurried hospitality.
            </p>

            <div className="space-y-4 pt-4">
              {schedule.map((slot, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAFAF8] p-5 rounded-xl border border-[rgba(43,35,32,0.08)] hover:border-[rgba(43,35,32,0.2)] transition-colors shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <span className="font-serif text-base font-semibold text-[#2B2320]">
                      {slot.session}
                    </span>
                    <span className="font-mono text-xs text-[#C27838] font-bold bg-[#C27838]/10 px-2.5 py-0.5 rounded-full w-fit">
                      {slot.time}
                    </span>
                  </div>
                  <p className="text-xs text-[#574B46] leading-relaxed font-normal">
                    {slot.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Location Card & Salon Dispatch Newsletter */}
          <div className="lg:col-span-5 space-y-6">
            {/* Location Card */}
            <div className="bg-[#2B2320] text-[#FAFAF8] p-8 rounded-3xl space-y-6 shadow-xl">
              <div>
                <div className="flex items-center space-x-2 text-[#C27838] mb-2 font-mono text-[10px] uppercase tracking-widest">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>THE FLAGSHIP ATELIER</span>
                </div>
                <h4 className="font-serif text-2xl text-[#FAFAF8]">
                  Patel Café & Atelier
                </h4>
                <p className="text-xs text-[#FAFAF8]/75 leading-relaxed mt-2 font-light">
                  14 Heritage Promenade, Diplomatic Enclave, Chanakyapuri, New Delhi 110021, India
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3 font-mono text-xs text-[#FAFAF8]/85">
                <div className="flex items-center space-x-3">
                  <Phone className="w-3.5 h-3.5 text-[#C27838]" />
                  <span>+91 (0) 11 4982 7700</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-3.5 h-3.5 text-[#C27838]" />
                  <span>concierge@patel-cafe.com</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#section-reservation"
                  className="inline-flex items-center space-x-2 text-[#C27838] font-mono text-xs uppercase tracking-widest hover:text-[#FAFAF8] transition-colors"
                >
                  <span>Request Table Seating</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Newsletter Dispatch Card */}
            <div className="bg-[#FAFAF8] p-8 rounded-3xl border border-[rgba(43,35,32,0.1)] shadow-xs space-y-4">
              <div className="flex items-center space-x-2 text-[#C27838] font-mono text-[10px] uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                <span>ATELIER DISPATCH</span>
              </div>
              <h4 className="font-serif text-xl text-[#2B2320]">
                Private Tastings & Seasonal Harvests
              </h4>
              <p className="text-xs text-[#574B46] leading-relaxed">
                Receive invitations to seasonal spice harvest unveilings, single-estate tea auctions, and guest chef residency dinners.
              </p>

              {subscribed ? (
                <div className="flex items-center space-x-2 text-xs font-mono text-[#4A7C59] bg-[#4A7C59]/10 p-3 rounded-xl">
                  <Check className="w-4 h-4" />
                  <span>Inscribed into the Patel Gastronomy Journal.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Your email address..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-[#FAFAF8] border border-[rgba(43,35,32,0.15)] rounded-full px-4 py-2.5 text-xs text-[#2B2320] focus:outline-none focus:border-[#2B2320]"
                    />
                    <button
                      type="submit"
                      className="bg-[#2B2320] text-[#FAFAF8] font-mono text-[10px] uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-[#574B46] transition-colors shrink-0"
                    >
                      Join
                    </button>
                  </div>
                  <span className="text-[9px] font-mono text-[#574B46]/80 block">
                    Zero spam. Unsubscribe anytime with one click.
                  </span>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
