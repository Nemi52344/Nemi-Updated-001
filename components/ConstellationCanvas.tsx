"use client";

import { useEffect, useRef } from "react";

type Props = {
  count?: number;
  maxDist?: number;
  // Nemi Violet 100 (#CEC3EC) at 0.55 alpha — particle fill
  particleColor?: string;
  // Nemi Violet 300 (#8A70C8) — link stroke base
  linkColor?: string;
  className?: string;
};

type Particle = { x: number; y: number; vx: number; vy: number; r: number };

export default function ConstellationCanvas({
  count = 80,
  maxDist = 130,
  particleColor = "rgba(206, 195, 236, 0.55)",
  linkColor = "138, 112, 200",
  className = ""
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let running = true;

    function seed() {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.4 + 0.5
      }));
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function step() {
      if (!running) return;
      ctx!.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = particleColor;
        ctx!.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]!;
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDist * maxDist) {
            const dist = Math.sqrt(d2);
            const alpha = 0.18 * (1 - dist / maxDist);
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(q.x, q.y);
            ctx!.strokeStyle = `rgba(${linkColor}, ${alpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      raf = requestAnimationFrame(step);
    }

    function drawStatic() {
      // Single frame when reduced motion is set — no animation loop.
      ctx!.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = particleColor;
        ctx!.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]!;
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDist * maxDist) {
            const dist = Math.sqrt(d2);
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(q.x, q.y);
            ctx!.strokeStyle = `rgba(${linkColor}, ${0.18 * (1 - dist / maxDist)})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }
    }

    function onVisibility() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced.matches) {
        running = true;
        step();
      }
    }

    function onReducedChange() {
      cancelAnimationFrame(raf);
      if (reduced.matches) {
        running = false;
        drawStatic();
      } else {
        running = true;
        step();
      }
    }

    resize();
    if (reduced.matches) {
      drawStatic();
    } else {
      step();
    }

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", onReducedChange);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onReducedChange);
    };
  }, [count, maxDist, particleColor, linkColor]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`h-full w-full ${className}`}
    />
  );
}
