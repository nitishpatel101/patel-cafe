"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 320, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("[data-cursor]");
      if (interactive) {
        const text = interactive.getAttribute("data-cursor") || "";
        setCursorText(text);
        setIsHovered(true);
      } else if (target.closest("button, a, input, select")) {
        setCursorText("");
        setIsHovered(true);
      } else {
        setCursorText("");
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[1000] overflow-hidden">
      {/* Outer follow ring / badge */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? (cursorText ? 2.6 : 1.6) : 1,
          backgroundColor: cursorText ? "rgba(43, 35, 32, 0.92)" : isHovered ? "rgba(43, 35, 32, 0.08)" : "rgba(0, 0, 0, 0)",
          borderColor: cursorText ? "rgba(0, 0, 0, 0)" : "rgba(43, 35, 32, 0.35)",
        }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-center rounded-full border border-[rgba(43,35,32,0.3)] backdrop-blur-[1px] w-9 h-9"
      >
        {cursorText && (
          <span className="text-[7.5px] uppercase tracking-widest text-[#FAFAF8] font-medium px-1 text-center select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center pinpoint */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorText ? 0 : isHovered ? 0.4 : 1,
          opacity: cursorText ? 0 : 0.85,
        }}
        className="w-1.5 h-1.5 rounded-full bg-[#2B2320]"
      />
    </div>
  );
}
