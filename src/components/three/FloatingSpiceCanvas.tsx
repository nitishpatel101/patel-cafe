"use client";

import React, { useEffect, useRef } from "react";

interface FloatingSpiceCanvasProps {
  className?: string;
  intensity?: number;
}

export function FloatingSpiceCanvas({
  className = "",
  intensity = 1,
}: FloatingSpiceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;

    const count = Math.floor(40 * intensity);
    const colors = ["#C27838", "#9E3C1B", "#4A3B32", "#6A784B", "#E2B870"];

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth || window.innerWidth;
      canvas.height = canvas.offsetHeight || window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * (canvas.width || window.innerWidth),
      y: Math.random() * (canvas.height || window.innerHeight),
      size: Math.random() * 2.2 + 1.0,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.4 + 0.15,
      speedY: -(Math.random() * 0.35 + 0.15),
      speedX: (Math.random() - 0.5) * 0.25,
    }));

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible || !canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-10 w-full h-full ${className}`}
    />
  );
}
