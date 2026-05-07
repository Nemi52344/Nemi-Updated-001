"use client";

import { useEffect, useRef, useState } from "react";

interface KPIBannerProps {
  scrollProgress: number;
}

const kpis = [
  { value: 36, suffix: "+", label: "Enterprise Customers" },
  { value: 300, suffix: "K+", label: "Sq Ft Manufacturing" },
  { value: 40, suffix: "+", label: "Patents" },
  { value: 90, suffix: "%+", label: "Gross Revenue Retention" },
];

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);

  return count;
}

function KPIStat({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const count = useCountUp(value, active);

  return (
    <div className="flex flex-col items-center gap-2 px-4 py-6 md:py-8">
      <span
        className="text-3xl md:text-5xl font-extrabold tracking-tight"
        style={{
          background: "linear-gradient(135deg, hsl(275 80% 65%), hsl(var(--foreground)))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "none",
          filter: "drop-shadow(0 0 20px hsl(275 80% 60% / 0.3))",
        }}
      >
        {count}{suffix}
      </span>
      <span className="text-[0.65rem] md:text-xs tracking-[0.15em] uppercase text-muted-foreground font-semibold text-center">
        {label}
      </span>
    </div>
  );
}

const KPIBanner = ({ scrollProgress }: KPIBannerProps) => {
  const sectionVisible = scrollProgress > 0.885 && scrollProgress < 0.94;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.89, 0.91));
  const exitP = easeOut(rangeProgress(scrollProgress, 0.925, 0.94));
  const opacity = enterP * (1 - exitP);

  if (!sectionVisible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 44, opacity }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "hsl(230 25% 4%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 60% at 50% 50%, hsl(275 80% 40% / 0.15) 0%, transparent 70%)`,
        }}
      />
      <div className="relative z-[2] max-w-5xl w-full px-6">
        <p
          className="text-center text-xs tracking-[0.25em] uppercase text-primary font-semibold mb-8"
          style={{ transform: `translateY(${(1 - enterP) * 20}px)` }}
        >
          By the Numbers
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-0 md:divide-x md:divide-border/20">
          {kpis.map((kpi, i) => (
            <div
              key={kpi.label}
              style={{
                transform: `translateY(${(1 - enterP) * (20 + i * 8)}px)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <KPIStat {...kpi} active={sectionVisible} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KPIBanner;
