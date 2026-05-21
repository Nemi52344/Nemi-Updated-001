"use client";

import { useEffect, useState } from "react";

type Props = {
  // When true (default), opacity fades from 1.0 → 0.15 over the first viewport
  // height of scroll, so the nebula reads as a hero treatment rather than a
  // distraction during long legal/risk reading on offering pages.
  fadeOnScroll?: boolean;
  // Floor for the scroll fade — what opacity the nebula settles at past the
  // hero. 0 to disappear entirely, 1 to never fade.
  minOpacity?: number;
};

export default function NebulaGlow({
  fadeOnScroll = true,
  minOpacity = 0.2
}: Props) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (!fadeOnScroll) {
      setOpacity(1);
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function update() {
      const y = window.scrollY;
      const fadeOver = window.innerHeight;
      const next = Math.max(minOpacity, 1 - y / fadeOver);
      setOpacity(next);
    }
    update();

    if (reduced) return; // honour reduced-motion — leave opacity static
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [fadeOnScroll, minOpacity]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-[5] motion-safe:animate-[nebula-breathe_4s_ease-in-out_infinite]"
      style={{
        opacity,
        background: `
          radial-gradient(ellipse 18% 22% at 50% 50%, hsl(278 95% 62% / 0.85) 0%, transparent 70%),
          radial-gradient(ellipse 32% 38% at 50% 50%, hsl(275 90% 52% / 0.65) 0%, transparent 70%),
          radial-gradient(ellipse 50% 55% at 50% 50%, hsl(270 85% 42% / 0.45) 0%, transparent 65%),
          radial-gradient(ellipse 75% 80% at 50% 50%, hsl(280 75% 28% / 0.28) 0%, transparent 60%)
        `,
        transition: "opacity 0.05s linear",
        willChange: "transform, opacity"
      }}
    />
  );
}
