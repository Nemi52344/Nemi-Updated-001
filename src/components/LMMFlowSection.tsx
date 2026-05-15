"use client";

interface LMMFlowSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

interface Step {
  num: string;
  label: string;
  img: string;
  tradMonths: number;     // traditional time in months (for bar scale)
  tradLabel?: string;     // override display label (e.g. "6-12 mo")
  lmmFraction: number;    // 0..1 of traditional bar to show LMM bar width
  lmmLabel: string;       // human-readable LMM time
}

// Bar scale: max 12 months → 100% width
const MAX_MONTHS = 12;

const STEPS: Step[] = [
  { num: "01", label: "Sketch",      img: "/Images/lmm-flow/01-sketch.png",     tradMonths: 1,    tradLabel: "1 mo",     lmmFraction: 0.02, lmmLabel: "Days" },
  { num: "02", label: "Render",      img: "/Images/lmm-flow/02-render.png",     tradMonths: 1,    tradLabel: "1 mo",     lmmFraction: 0.02, lmmLabel: "Days" },
  { num: "03", label: "CAD",         img: "/Images/lmm-flow/03-cad.png",        tradMonths: 6,    tradLabel: "6+ mo",    lmmFraction: 0.08, lmmLabel: "Weeks" },
  { num: "04", label: "Simulation",  img: "/Images/lmm-flow/04-simulation.png", tradMonths: 2,    tradLabel: "2+ mo",    lmmFraction: 0.03, lmmLabel: "Weeks" },
  { num: "05", label: "Tooling",     img: "/Images/lmm-flow/06-tooling.png",    tradMonths: 6,    tradLabel: "6+ mo",    lmmFraction: 0.17, lmmLabel: "3 mo" },
  { num: "06", label: "Production",  img: "/Images/lmm-flow/07-production.png", tradMonths: 12,   tradLabel: "Manual Coding",   lmmFraction: 0.08, lmmLabel: "AI Orchestrated" },
];

const ROW1 = [STEPS[0], STEPS[1], STEPS[2]];
const ROW2_VISUAL = [STEPS[5], STEPS[4], STEPS[3]]; // snake: Production ← Tooling ← Simulation

const formatMonths = (m: number) => (m === 1 ? "1 mo" : `${m} mo`);

const Card = ({ step, p }: { step: Step; p: number }) => {
  const tradWidth = (step.tradMonths / MAX_MONTHS) * 100;
  const lmmWidth = tradWidth * step.lmmFraction;

  return (
    <div
      className="relative flex flex-col"
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * 16}px)`,
      }}
    >
      {/* Step label */}
      <div className="mb-1 px-0.5 text-center">
        <span className="text-[11px] md:text-[13px] tracking-[0.18em] uppercase font-bold text-foreground">
          {step.label}
        </span>
      </div>

      {/* Image - compact, fits single viewport */}
      <div
        className="relative w-full overflow-hidden rounded-lg"
        style={{
          aspectRatio: "16 / 9",
          maxHeight: "140px",
          background: "hsl(220 20% 6%)",
        }}
      >
        <img
          src={step.img}
          alt={step.label}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.85) saturate(0.9)" }}
        />
      </div>

      {/* Comparison bars */}
      <div className="mt-1 px-2 py-1.5 flex flex-col gap-1">
        {/* Traditional */}
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.12em] font-semibold" style={{ color: "hsl(0 0% 72%)" }}>
              Traditional
            </span>
            <span className="text-[12px] tabular-nums font-bold whitespace-nowrap" style={{ color: "hsl(0 0% 95%)" }}>
              {step.tradLabel ?? formatMonths(step.tradMonths)}
            </span>
          </div>
          <div className="relative h-[2px] rounded-full overflow-hidden mt-0.5" style={{ background: "hsl(0 0% 100% / 0.08)" }}>
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${tradWidth * p}%`,
                background: "hsl(0 0% 70%)",
                transition: "width 0.2s ease-out",
              }}
            />
          </div>
        </div>

        {/* NEMI LMM */}
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.12em] font-bold" style={{ color: "hsl(275 70% 70%)" }}>
              NEMI LMM
            </span>
            <span className="text-[12px] tabular-nums font-bold whitespace-nowrap" style={{ color: "hsl(275 80% 78%)" }}>
              {step.lmmLabel}
            </span>
          </div>
          <div className="relative h-[2px] rounded-full overflow-hidden mt-0.5" style={{ background: "hsl(0 0% 100% / 0.08)" }}>
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${Math.max(lmmWidth * p, p > 0.1 ? 2 : 0)}%`,
                background: "hsl(275 75% 60%)",
                transition: "width 0.2s ease-out",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// 6 arrows in flow order — gradient from dark purple (first) to lighter purple (last)
const arrowColor = (i: number) => {
  const TOTAL = 6;
  const lightness = 32 + (i / (TOTAL - 1)) * 50; // 32% → 82%
  return `hsl(275 75% ${lightness}%)`;
};

// Arrowhead-only chevrons between cards
const HArrow = ({ direction, opacity, color }: { direction: "right" | "left"; opacity: number; color: string }) => (
  <div className="flex items-center justify-center" style={{ opacity, padding: "2px 4px" }}>
    <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
      {direction === "right" ? (
        <path d="M2 2 L11 10 L2 18" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M12 2 L3 10 L12 18" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  </div>
);

const LMMFlowSection = ({ scrollProgress }: LMMFlowSectionProps) => {
  const sectionVisible = scrollProgress > 0.455 && scrollProgress < 0.61;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.465, 0.50));
  const exitP = easeOut(rangeProgress(scrollProgress, 0.585, 0.61));
  const opacity = enterP * (1 - exitP);

  const headP = easeOut(rangeProgress(scrollProgress, 0.47, 0.50));

  if (!sectionVisible) return null;

  const cardP = (idx: number) => {
    const delay = idx * 0.003;
    return easeOut(rangeProgress(scrollProgress, 0.48 + delay, 0.52 + delay));
  };

  // Grid template: card | arrow | card | arrow | card
  const gridCols = "1fr 28px 1fr 28px 1fr";

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden"
      style={{ zIndex: 42, opacity, background: "hsl(0 0% 2%)" }}
    >
      <div className="w-full max-w-[1380px] mx-auto px-4 md:px-8" style={{ marginTop: "20px" }}>
        {/* Header */}
        <div
          className="text-center mb-2"
          style={{ opacity: headP, transform: `translateY(${(1 - headP) * 14}px)` }}
        >
          <h2
            className="text-lg md:text-2xl lg:text-3xl font-bold tracking-tight"
            style={{
              letterSpacing: "-0.02em",
              textShadow: "0 0 40px hsl(275 80% 60% / 0.3), 0 0 80px hsl(270 70% 50% / 0.15)",
            }}
          >
            From Months to Hours
          </h2>
          <p className="text-[13px] text-muted-foreground mt-1 tracking-wide">
            From fragmented workflows to a unified manufacturing system that learns faster every cycle, connecting every stage from design to delivery.
          </p>
        </div>

        {/* Flow container */}
        <div className="relative">
          {/* Row 1: Sketch → Render → CAD */}
          <div className="grid items-stretch gap-y-2" style={{ gridTemplateColumns: gridCols }}>
            <Card step={ROW1[0]} p={cardP(0)} />
            <HArrow direction="right" opacity={cardP(0)} color={arrowColor(0)} />
            <Card step={ROW1[1]} p={cardP(1)} />
            <HArrow direction="right" opacity={cardP(1)} color={arrowColor(1)} />
            <Card step={ROW1[2]} p={cardP(2)} />
          </div>

          {/* Loop-up chevron under Sketch (Production→Sketch) + Down chevron above Simulation (CAD→Simulation) */}
          <div className="grid" style={{ gridTemplateColumns: gridCols, margin: "2px 0" }}>
            <div className="flex justify-center" style={{ opacity: cardP(5) }}>
              <svg width="18" height="13" viewBox="0 0 20 14" fill="none" style={{ display: "block" }}>
                <path d="M2 11 L10 2 L18 11" stroke={arrowColor(5)} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div /><div /><div />
            <div className="flex justify-center">
              <svg width="18" height="13" viewBox="0 0 20 14" fill="none" style={{ opacity: cardP(2), display: "block" }}>
                <path d="M2 2 L10 11 L18 2" stroke={arrowColor(2)} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Row 2 visual: Production ← Tooling ← Simulation */}
          <div className="grid items-stretch gap-y-2" style={{ gridTemplateColumns: gridCols }}>
            <Card step={ROW2_VISUAL[0]} p={cardP(5)} />
            <HArrow direction="left" opacity={cardP(4)} color={arrowColor(4)} />
            <Card step={ROW2_VISUAL[1]} p={cardP(4)} />
            <HArrow direction="left" opacity={cardP(3)} color={arrowColor(3)} />
            <Card step={ROW2_VISUAL[2]} p={cardP(3)} />
          </div>
        </div>

        {/* Footer caption */}
        <div className="text-center mt-3" style={{ opacity: enterP }}>
          <span className="text-[11px] md:text-[12px] tracking-[0.3em] uppercase" style={{ color: "hsl(275 60% 65% / 0.7)" }}>
            NEMI LMM LOOP · EVERY CYCLE COMPOUNDS KNOWLEDGE, PRECISION, SPEED & COST REDUCTION
          </span>
        </div>
      </div>
    </div>
  );
};

export default LMMFlowSection;
