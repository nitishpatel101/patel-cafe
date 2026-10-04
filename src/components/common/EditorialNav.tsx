"use client";

import React, { useEffect, useState } from "react";
import { Volume2, VolumeX, ShoppingBag } from "lucide-react";
import { useTastingBag } from "@/context/TastingBagContext";

export function EditorialNav() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);
  const { totalCount, setIsBagOpen } = useTastingBag();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Web Audio API ambient room generator (pure client-side warm harmonic resonance, zero external files)
  const toggleAudio = () => {
    if (!audioContext) {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.04, ctx.currentTime);
      masterGain.connect(ctx.destination);

      // Warm culinary hearth drone - 108Hz & 216Hz gentle harmonic sine
      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(108, ctx.currentTime);

      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(216, ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);

      osc1.start();
      osc2.start();

      setAudioContext(ctx);
      setGainNode(masterGain);
      setIsAudioPlaying(true);
    } else {
      if (isAudioPlaying && gainNode) {
        gainNode.gain.setTargetAtTime(0, audioContext.currentTime, 0.2);
        setTimeout(() => audioContext.suspend(), 250);
        setIsAudioPlaying(false);
      } else if (gainNode) {
        audioContext.resume();
        gainNode.gain.setTargetAtTime(0.04, audioContext.currentTime, 0.2);
        setIsAudioPlaying(true);
      }
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#FAFAF8]/90 backdrop-blur-md border-b border-[rgba(43,35,32,0.06)] transition-all duration-300">
      {/* Top 1px scroll progress bar */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[rgba(43,35,32,0.05)]">
        <div
          className="h-full bg-[#2B2320] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        {/* Brand Monogram */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-left group focus:outline-none"
        >
          <div className="font-serif text-lg md:text-2xl font-normal tracking-tight text-[#2B2320] group-hover:opacity-75 transition-opacity">
            PATEL
          </div>
          <div className="font-mono text-[9px] tracking-[0.22em] text-[#574B46] uppercase">
            Artisanal Café & Gastronomy
          </div>
        </button>

        {/* Editorial Index Links (Desktop) */}
        <nav className="hidden xl:flex items-center space-x-6 font-mono text-[10px] uppercase tracking-[0.16em] text-[#574B46]">
          <button
            onClick={() => scrollTo("section-thali")}
            className="hover:text-[#2B2320] transition-colors relative py-1"
          >
            01 Thali
          </button>
          <button
            onClick={() => scrollTo("section-heritage")}
            className="hover:text-[#2B2320] transition-colors relative py-1"
          >
            02 Heritage
          </button>
          <button
            onClick={() => scrollTo("section-samosa")}
            className="hover:text-[#2B2320] transition-colors relative py-1"
          >
            03 Samosa
          </button>
          <button
            onClick={() => scrollTo("section-spices")}
            className="hover:text-[#2B2320] transition-colors relative py-1"
          >
            04 Spices
          </button>
          <button
            onClick={() => scrollTo("section-craft")}
            className="hover:text-[#2B2320] transition-colors relative py-1"
          >
            05 Blueprint
          </button>
          <button
            onClick={() => scrollTo("section-sauces")}
            className="hover:text-[#2B2320] transition-colors relative py-1"
          >
            06 Chutneys
          </button>
          <button
            onClick={() => scrollTo("section-dining")}
            className="hover:text-[#2B2320] transition-colors relative py-1"
          >
            07 Atelier
          </button>
          <button
            onClick={() => scrollTo("section-cafe-menu")}
            className="hover:text-[#2B2320] transition-colors relative py-1 font-semibold text-[#2B2320]"
          >
            08 Menu
          </button>
          <button
            onClick={() => scrollTo("section-visit")}
            className="hover:text-[#2B2320] transition-colors relative py-1"
          >
            09 Hours
          </button>
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Ambient Sound Button */}
          <button
            onClick={toggleAudio}
            data-cursor="SOUND"
            aria-label={isAudioPlaying ? "Mute culinary ambience" : "Unmute culinary ambience"}
            className="flex items-center space-x-1.5 border border-[rgba(43,35,32,0.15)] rounded-full px-2.5 py-1.5 hover:border-[#2B2320] transition-colors text-[#2B2320]"
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#C27838]" />
                <span className="font-mono text-[9px] uppercase tracking-widest hidden sm:inline">
                  Ambience
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#574B46]" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#574B46] hidden sm:inline">
                  Sound Off
                </span>
              </>
            )}
          </button>

          {/* Tasting Bag Trigger Button */}
          <button
            onClick={() => setIsBagOpen(true)}
            data-cursor="BAG"
            aria-label="Open Tasting Bag"
            className="relative flex items-center space-x-2 border border-[rgba(43,35,32,0.18)] hover:border-[#2B2320] rounded-full px-3 py-1.5 bg-[#FAFAF8] text-[#2B2320] transition-all shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#C27838]" />
            <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">
              Bag ({totalCount})
            </span>
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#C27838] rounded-full ring-2 ring-[#FAFAF8]" />
            )}
          </button>

          {/* Reserve CTA */}
          <button
            onClick={() => scrollTo("section-reservation")}
            data-cursor="RESERVE"
            className="bg-[#2B2320] text-[#FAFAF8] font-mono text-[10px] uppercase tracking-[0.2em] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:bg-[#574B46] transition-colors duration-300 shadow-sm whitespace-nowrap"
          >
            Reserve Table
          </button>
        </div>
      </div>
    </header>
  );
}
