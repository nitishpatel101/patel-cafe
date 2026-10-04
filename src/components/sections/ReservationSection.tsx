"use client";

import React, { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { MagneticButton } from "../common/MagneticButton";

export function ReservationSection() {
  const [journey, setJourney] = useState("imperial-thali");
  const [guests, setGuests] = useState("2");
  const [seatingTime, setSeatingTime] = useState("dinner-first");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dietary, setDietary] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubmitted(true);
  };

  return (
    <section
      id="section-reservation"
      className="relative w-full py-32 md:py-48 bg-[#FAFAF8] border-t border-[rgba(43,35,32,0.06)]"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        {/* Section Index */}
        <div className="inline-flex items-center space-x-2 font-mono text-[10px] md:text-xs uppercase tracking-[0.28em] text-[#C27838] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#C27838]" />
          <span>08 // INVITATION TO DINE</span>
        </div>

        {/* Large Editorial Headline */}
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#2B2320] tracking-tight leading-[1.05] mb-6">
          A Seat at the <br />
          <span className="font-serif italic font-light text-[#574B46]">
            Imperial Hearth.
          </span>
        </h2>

        <p className="max-w-xl mx-auto text-sm sm:text-base text-[#574B46] font-normal leading-relaxed mb-16">
          Limited to twenty-four patrons nightly. Each service is choreographed around the day’s market harvest and centuries of culinary alchemy.
        </p>

        {isSubmitted ? (
          <div className="bg-[#FAFAF8] border border-[#2B2320]/20 rounded-2xl p-10 md:p-14 shadow-lg text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#2B2320] text-[#FAFAF8] flex items-center justify-center mx-auto mb-6">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-[#2B2320] mb-2">
              Inquiry Received
            </h3>
            <p className="text-sm text-[#574B46] leading-relaxed mb-6 font-normal">
              Thank you, {name}. Our Maître d’ will personally review your tasting preferences and contact you at {email} within twenty-four hours.
            </p>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#C27838]">
              PATEL ATELIER // CONCIERGE CONFIRMATION
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="text-left bg-[#FAFAF8] p-6 sm:p-10 md:p-12 rounded-3xl border border-[rgba(43,35,32,0.1)] shadow-sm space-y-10"
          >
            {/* 1. Journey Selection */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-[#574B46] mb-4">
                01. Choose Culinary Journey
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  {
                    id: "imperial-thali",
                    title: "The Patel Royal Thali",
                    desc: "36 deconstructed items, 24K gold vark, slow tandoor pairing",
                  },
                  {
                    id: "shakahari",
                    title: "Patel Shakahari Feast",
                    desc: "Botanical vegetarian feast, cold-pressed oils, rare herbs",
                  },
                  {
                    id: "atelier",
                    title: "Khansama Atelier",
                    desc: "Chef’s counter bespoke service with indigenous wines",
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setJourney(item.id)}
                    data-cursor="SELECT"
                    className={`cursor-pointer p-4 rounded-xl border transition-all ${
                      journey === item.id
                        ? "border-[#2B2320] bg-[#2B2320]/[0.03] shadow-sm"
                        : "border-[rgba(43,35,32,0.1)] hover:border-[rgba(43,35,32,0.3)]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-base text-[#2B2320] font-medium">
                        {item.title}
                      </span>
                      {journey === item.id && (
                        <span className="w-2 h-2 rounded-full bg-[#C27838]" />
                      )}
                    </div>
                    <p className="text-[11px] text-[#574B46] leading-snug">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Seating & Party Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-[#574B46] mb-2">
                  02. Party Size
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-[#FAFAF8] border border-[rgba(43,35,32,0.15)] rounded-xl px-4 py-3 text-sm text-[#2B2320] focus:outline-none focus:border-[#2B2320]"
                >
                  <option value="1">1 Guest (Salon Counter)</option>
                  <option value="2">2 Guests (Intimate Table)</option>
                  <option value="4">4 Guests (Royal Booth)</option>
                  <option value="6">6 Guests (Courtyard Table)</option>
                  <option value="8">8 Guests (Imperial Chamber)</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-[#574B46] mb-2">
                  03. Seating Service
                </label>
                <select
                  value={seatingTime}
                  onChange={(e) => setSeatingTime(e.target.value)}
                  className="w-full bg-[#FAFAF8] border border-[rgba(43,35,32,0.15)] rounded-xl px-4 py-3 text-sm text-[#2B2320] focus:outline-none focus:border-[#2B2320]"
                >
                  <option value="lunch">Luncheon Service (12:30 PM)</option>
                  <option value="dinner-first">First Evening Seating (18:30 PM)</option>
                  <option value="dinner-late">Imperial Night Seating (21:15 PM)</option>
                </select>
              </div>
            </div>

            {/* 3. Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-[#574B46] mb-2">
                  04. Guest Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maharaja Vikramaditya"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FAFAF8] border border-[rgba(43,35,32,0.15)] rounded-xl px-4 py-3 text-sm text-[#2B2320] focus:outline-none focus:border-[#2B2320]"
                >
                </input>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-[#574B46] mb-2">
                  05. Direct Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAFAF8] border border-[rgba(43,35,32,0.15)] rounded-xl px-4 py-3 text-sm text-[#2B2320] focus:outline-none focus:border-[#2B2320]"
                >
                </input>
              </div>
            </div>

            {/* 4. Dietary Notes */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-[#574B46] mb-2">
                06. Sensory Notes & Dietary Inquiries (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Allergies, spice calibration preferences, or commemorative occasion..."
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                className="w-full bg-[#FAFAF8] border border-[rgba(43,35,32,0.15)] rounded-xl px-4 py-3 text-sm text-[#2B2320] focus:outline-none focus:border-[#2B2320]"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-[rgba(43,35,32,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#574B46]">
                COMPLIMENTARY VALET & DRESS CODE ENFORCED (SMART CASUAL)
              </span>

              <MagneticButton
                type="submit"
                dataCursor="CONFIRM"
                className="w-full sm:w-auto bg-[#2B2320] text-[#FAFAF8] font-mono text-xs uppercase tracking-[0.24em] px-9 py-4 rounded-full hover:bg-[#574B46] transition-all duration-300 shadow-md"
              >
                Request Reservation
              </MagneticButton>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
