"use client";

import React, { useState } from "react";
import { Check, Sparkles, Users, Clock, Compass, Calendar, Utensils } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DiningTable {
  id: string;
  name: string;
  capacity: number;
  ambiance: string;
  gridArea: string; // Coordinate representation in 3D floor plan
  available: boolean;
}

const TABLES: DiningTable[] = [
  {
    id: "table-01",
    name: "Chef’s Hearth Counter",
    capacity: 2,
    ambiance: "Direct view of tandoor embers & spice tempering",
    gridArea: "top-4 left-6",
    available: true,
  },
  {
    id: "table-02",
    name: "Royal Courtyard Alcove",
    capacity: 4,
    ambiance: "Intimate stone arches & brass lanterns",
    gridArea: "top-4 right-8",
    available: true,
  },
  {
    id: "table-03",
    name: "Cyclorama Daylight Salon",
    capacity: 2,
    ambiance: "Flooded with soft natural studio daylight",
    gridArea: "bottom-8 left-10",
    available: true,
  },
  {
    id: "table-04",
    name: "Solera Grand Chamber",
    capacity: 6,
    ambiance: "Centuries-aged walnut long banquet table",
    gridArea: "bottom-8 right-6",
    available: true,
  },
  {
    id: "table-05",
    name: "Spice Herb Verandah",
    capacity: 2,
    ambiance: "Jasmine breeze with potted green cardamom",
    gridArea: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    available: false,
  },
];

export function ReservationSection() {
  const [selectedTable, setSelectedTable] = useState<string>("table-01");
  const [journey, setJourney] = useState("imperial-thali");
  const [seatingTime, setSeatingTime] = useState("dinner-first");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialNote, setSpecialNote] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeTableObj = TABLES.find((t) => t.id === selectedTable) || TABLES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubmitted(true);
  };

  return (
    <section
      id="section-reservation"
      className="relative w-full py-32 md:py-48 bg-[#FAFAF8] border-t border-[rgba(43,35,32,0.06)] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
        {/* Section Index */}
        <div className="inline-flex items-center space-x-2 font-mono text-[10px] md:text-xs uppercase tracking-[0.28em] text-[#C27838] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#C27838]" />
          <span>09 // INVITATION TO DINE</span>
        </div>

        {/* Large Editorial Headline */}
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#2B2320] tracking-tight leading-[1.05] mb-6">
          A Seat at the <br />
          <span className="font-serif italic font-light text-[#574B46]">
            Imperial Hearth.
          </span>
        </h2>

        <p className="max-w-xl mx-auto text-sm sm:text-base text-[#574B46] font-normal leading-relaxed mb-16">
          Limited to twenty-four patrons nightly. Select your desired 3D table coordinate in the atelier and reserve your seat.
        </p>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#FAFAF8] border border-[#2B2320]/20 rounded-3xl p-10 md:p-14 shadow-2xl text-center max-w-lg mx-auto"
          >
            <div className="w-16 h-16 rounded-full bg-[#2B2320] text-[#FAFAF8] flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Check className="w-8 h-8 text-[#C27838]" />
            </div>
            <h3 className="font-serif text-3xl text-[#2B2320] mb-2">
              Seat Confirmed
            </h3>
            <p className="text-sm text-[#574B46] leading-relaxed mb-6 font-normal">
              Thank you, <span className="font-bold text-[#2B2320]">{name}</span>. Your reservation for{" "}
              <span className="font-semibold text-[#C27838]">{activeTableObj.name}</span> ({activeTableObj.capacity} Guests) is recorded.
              Our Maître d’ has sent confirmation details to <span className="underline">{email}</span>.
            </p>
            <div className="p-4 bg-[rgba(43,35,32,0.04)] rounded-xl border border-[rgba(43,35,32,0.1)] text-left space-y-1 font-mono text-[11px] text-[#574B46] mb-6">
              <div>SERVICE: {seatingTime === "dinner-first" ? "First Service (6:30 PM)" : "Royal Service (8:45 PM)"}</div>
              <div>JOURNEY: {journey.toUpperCase()}</div>
              <div>TABLE: {activeTableObj.name.toUpperCase()}</div>
            </div>
            <button
              onClick={() => setIsSubmitted(false)}
              className="font-mono text-[10px] uppercase tracking-widest text-[#C27838] underline hover:text-[#2B2320]"
            >
              Reserve Another Table
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
            {/* LEFT 5 COLS: 3D INTERACTIVE SEATING BLUEPRINT */}
            <div className="lg:col-span-5 bg-[#FAFAF8] rounded-3xl p-6 sm:p-8 border border-[rgba(43,35,32,0.12)] shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-[rgba(43,35,32,0.08)] pb-3">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#C27838] font-bold">
                    SPATIAL ARCHITECTURE
                  </span>
                  <h4 className="font-serif text-xl text-[#2B2320]">3D Seating Plan</h4>
                </div>
                <div className="flex items-center space-x-1.5 text-[9px] font-mono text-[#5A6B48]">
                  <span className="w-2 h-2 rounded-full bg-[#5A6B48] animate-ping" />
                  <span>LIVE FLOOR</span>
                </div>
              </div>

              {/* 3D Isometric Atelier Blueprint Canvas */}
              <div
                className="relative w-full h-80 rounded-2xl border border-[rgba(43,35,32,0.1)] bg-[#2B2320]/[0.02] p-4 overflow-hidden"
                style={{
                  perspective: 800,
                }}
              >
                {/* 3D Perspective Plane */}
                <motion.div
                  animate={{ rotateX: [18, 14, 18], rotateY: [-4, 4, -4] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-full h-full rounded-xl border border-dashed border-[rgba(43,35,32,0.2)] bg-[#FAFAF8] shadow-inner flex flex-col justify-between p-4"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Hearth Fire Indicator at Top */}
                  <div className="w-full flex items-center justify-center space-x-2 py-1 bg-[#A9442C]/10 rounded-md border border-[#A9442C]/30 text-[9px] font-mono text-[#A9442C]">
                    <Sparkles className="w-3 h-3" />
                    <span>ROYAL CHARCOAL HEARTH & TANDOOR</span>
                  </div>

                  {/* Interactive Table Nodes */}
                  <div className="relative w-full h-44">
                    {TABLES.map((t) => {
                      const isSelected = selectedTable === t.id;
                      return (
                        <motion.button
                          key={t.id}
                          type="button"
                          onClick={() => t.available && setSelectedTable(t.id)}
                          whileHover={{ scale: 1.12, z: 20 }}
                          className={`absolute ${t.gridArea} p-2 rounded-xl transition-all shadow-md flex items-center space-x-2 text-left ${
                            isSelected
                              ? "bg-[#2B2320] text-[#FAFAF8] ring-2 ring-[#C27838] scale-105"
                              : t.available
                              ? "bg-[#FAFAF8] text-[#2B2320] border border-[rgba(43,35,32,0.18)] hover:bg-[#C27838]/10"
                              : "bg-[rgba(43,35,32,0.06)] text-[#574B46]/50 cursor-not-allowed border border-dashed border-[rgba(43,35,32,0.1)]"
                          }`}
                        >
                          <Utensils className="w-3.5 h-3.5 text-[#C27838]" />
                          <div>
                            <div className="font-mono text-[9px] font-bold leading-none">{t.name}</div>
                            <div className="text-[8px] opacity-70">{t.capacity} Seats {t.available ? "• Free" : "• Booked"}</div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Entrance Door at Bottom */}
                  <div className="w-full flex items-center justify-center py-1 bg-[rgba(43,35,32,0.05)] rounded-md text-[8px] font-mono text-[#574B46]">
                    CYCLORAMA SALON ENTRANCE
                  </div>
                </motion.div>
              </div>

              {/* Active Selected Table Specs */}
              <div className="bg-[#2B2320]/[0.03] p-4 rounded-xl border border-[rgba(43,35,32,0.08)] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-base text-[#2B2320] font-semibold">
                    {activeTableObj.name}
                  </span>
                  <span className="font-mono text-[10px] text-[#C27838] font-bold">
                    CAPACITY: {activeTableObj.capacity} GUESTS
                  </span>
                </div>
                <p className="text-xs text-[#574B46] leading-relaxed">
                  {activeTableObj.ambiance}
                </p>
              </div>
            </div>

            {/* RIGHT 7 COLS: RESERVATION FORM */}
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-7 bg-[#FAFAF8] p-6 sm:p-10 rounded-3xl border border-[rgba(43,35,32,0.12)] shadow-xl space-y-8"
            >
              {/* 1. Journey Selection */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-[#574B46] mb-3">
                  01 // Choose Gastronomic Journey
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "imperial-thali", title: "The Royal Thali", desc: "36 elements & 24K gold" },
                    { id: "shakahari", title: "Botanical Feast", desc: "Ayurvedic plant alchemy" },
                    { id: "atelier", title: "Khansama Atelier", desc: "Bespoke tasting counter" },
                  ].map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setJourney(item.id)}
                      className={`cursor-pointer p-3.5 rounded-xl border transition-all ${
                        journey === item.id
                          ? "border-[#2B2320] bg-[#2B2320]/[0.04] shadow-sm ring-1 ring-[#2B2320]"
                          : "border-[rgba(43,35,32,0.12)] hover:border-[rgba(43,35,32,0.3)]"
                      }`}
                    >
                      <div className="font-serif text-sm font-semibold text-[#2B2320] mb-0.5">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-[#574B46] leading-tight">
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Seating Service & Seating Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-widest text-[#574B46] mb-2">
                    02 // Evening Service
                  </label>
                  <select
                    value={seatingTime}
                    onChange={(e) => setSeatingTime(e.target.value)}
                    className="w-full bg-[#FAFAF8] border border-[rgba(43,35,32,0.18)] rounded-xl px-4 py-3 text-xs text-[#2B2320] focus:outline-none focus:border-[#2B2320]"
                  >
                    <option value="dinner-first">First Service — 6:30 PM to 8:30 PM</option>
                    <option value="dinner-second">Royal Service — 8:45 PM to 11:15 PM</option>
                    <option value="afternoon">Atelier High Tea — 4:00 PM to 5:45 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-widest text-[#574B46] mb-2">
                    03 // Preferred Date
                  </label>
                  <input
                    type="date"
                    defaultValue="2026-10-08"
                    className="w-full bg-[#FAFAF8] border border-[rgba(43,35,32,0.18)] rounded-xl px-4 py-2.5 text-xs text-[#2B2320] focus:outline-none focus:border-[#2B2320]"
                  />
                </div>
              </div>

              {/* 3. Patron Contact Details */}
              <div className="space-y-4">
                <label className="block font-mono text-xs uppercase tracking-widest text-[#574B46]">
                  04 // Patron Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FAFAF8] border border-[rgba(43,35,32,0.18)] rounded-xl px-4 py-3 text-xs text-[#2B2320] placeholder:text-[#574B46]/50 focus:outline-none focus:border-[#2B2320]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FAFAF8] border border-[rgba(43,35,32,0.18)] rounded-xl px-4 py-3 text-xs text-[#2B2320] placeholder:text-[#574B46]/50 focus:outline-none focus:border-[#2B2320]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Contact Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FAFAF8] border border-[rgba(43,35,32,0.18)] rounded-xl px-4 py-3 text-xs text-[#2B2320] placeholder:text-[#574B46]/50 focus:outline-none focus:border-[#2B2320]"
                  />
                  <input
                    type="text"
                    placeholder="Dietary Requests or Allergens"
                    value={specialNote}
                    onChange={(e) => setSpecialNote(e.target.value)}
                    className="w-full bg-[#FAFAF8] border border-[rgba(43,35,32,0.18)] rounded-xl px-4 py-3 text-xs text-[#2B2320] placeholder:text-[#574B46]/50 focus:outline-none focus:border-[#2B2320]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#2B2320] text-[#FAFAF8] font-mono text-xs uppercase tracking-widest hover:bg-[#C27838] transition-all shadow-xl hover:shadow-2xl font-bold flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4 text-[#C27838]" />
                  <span>Reserve Selected Table & Journey</span>
                </button>
                <p className="text-[10px] text-[#574B46] text-center mt-3 font-mono">
                  CONFIRMATION SENT IMMEDIATELY // ZERO RESERVATION DEPOSIT REQUIRED
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
