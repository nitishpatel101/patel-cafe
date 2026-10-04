"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EditorialLoaderProps {
  onComplete: () => void;
}

export function EditorialLoader({ onComplete }: EditorialLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Non-linear organic acceleration
      const increment = current < 30 ? 3 : current < 70 ? 4 : current < 90 ? 2 : 5;
      current = Math.min(100, current + increment);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 800);
        }, 300);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
            transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#FAFAF8] p-8 md:p-16 select-none"
        >
          {/* Top metadata */}
          <div className="flex items-center justify-between border-b border-[rgba(43,35,32,0.08)] pb-4">
            <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-[#574B46] uppercase">
              ÉDITION IMPERIALE · VOL. I
            </span>
            <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-[#574B46] uppercase">
              28°36&apos;N 77°12&apos;E // CYCLORAMA STUDIO
            </span>
          </div>

          {/* Center typography and large counter */}
          <div className="my-auto max-w-4xl mx-auto w-full text-center">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif italic text-lg md:text-2xl text-[#574B46] mb-4"
            >
              The Architecture of Royal Indian Flavour
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="font-serif text-5xl md:text-8xl lg:text-9xl text-[#2B2320] tracking-tight leading-none mb-8"
            >
              PATEL
            </motion.h1>

            {/* Editorial Progress Bar */}
            <div className="relative w-48 md:w-64 h-[1px] bg-[rgba(43,35,32,0.12)] mx-auto overflow-hidden">
              <motion.div
                className="h-full bg-[#2B2320]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>

            <div className="mt-4 font-mono text-xs md:text-sm tracking-[0.3em] text-[#2B2320]">
              {progress.toString().padStart(3, "0")} %
            </div>
          </div>

          {/* Bottom disclaimer */}
          <div className="flex flex-col md:flex-row items-center justify-between text-[11px] font-mono tracking-wider text-[#574B46] border-t border-[rgba(43,35,32,0.08)] pt-4 gap-2">
            <span>PREPARING 36 GASTRONOMIC ELEMENTS</span>
            <span>60 FPS EDITORIAL FRAME-SCRUBBING ENGINE</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
