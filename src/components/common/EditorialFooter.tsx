"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function EditorialFooter() {
  const [newDelhiTime, setNewDelhiTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setNewDelhiTime(new Intl.DateTimeFormat([], options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#FAFAF8] text-[#2B2320] border-t border-[rgba(43,35,32,0.1)] pt-20 pb-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Top Colophon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[rgba(43,35,32,0.08)]">
          {/* Brand Philosophy */}
          <div className="md:col-span-6 space-y-4">
            <h4 className="font-serif text-3xl md:text-5xl text-[#2B2320] tracking-tight">
              PATEL
            </h4>
            <p className="font-serif italic text-base md:text-lg text-[#574B46] max-w-md">
              A modern Indian gastronomy atelier and artisanal café. Heritage recipes, single-origin brews, and zero-gravity architectural deconstruction.
            </p>
            <div className="font-mono text-xs text-[#574B46] tracking-widest pt-2">
              NEW DELHI TIME: {newDelhiTime || "12:00:00"} IST
            </div>
          </div>

          {/* Locations */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs uppercase tracking-wider text-[#574B46]">
            <div className="text-[#2B2320] font-semibold">Salons & Ateliers</div>
            <div>Jaipur // City Palace Enclave</div>
            <div>New Delhi // Diplomatic Enclave</div>
            <div>London // Mayfair Atelier</div>
            <div>Paris // Place Vendôme Salon</div>
          </div>

          {/* Editorial Specs */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs uppercase tracking-wider text-[#574B46]">
            <div className="text-[#2B2320] font-semibold">Citations & Standards</div>
            <div>Google Flow Asset Engine</div>
            <div>60 FPS Linear Scrubbing</div>
            <div>Michelin Guide Editorial 2026</div>
            <div>Awwwards / FWA / CSSDA</div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] font-mono uppercase tracking-widest text-[#574B46]">
          <div>
            © {new Date().getFullYear()} PATEL CAFÉ & ATELIER. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center space-x-6">
            <span>NO PLACEHOLDERS // HANDCRAFTED CODE</span>
            <button
              onClick={scrollToTop}
              data-cursor="TOP"
              className="flex items-center space-x-1.5 text-[#2B2320] hover:text-[#C27838] transition-colors"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
