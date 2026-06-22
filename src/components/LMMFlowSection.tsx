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
  { num: "01", label: "Sketch",      img: "/Images/lmm-flow/01-sketch.webp",     tradMonths: 1,    tradLabel: "1 mo",     lmmFraction: 0.02, lmmLabel: "Days" },
  { num: "02", label: "Render",      img: "/Images/lmm-flow/02-render.webp",     tradMonths: 1,    tradLabel: "1 mo",     lmmFraction: 0.02, lmmLabel: "Days" },
  { num: "03", label: "CAD",         img: "/Images/lmm-flow/03-cad.webp",        tradMonths: 6,    tradLabel: "6+ mo",    lmmFraction: 0.08, lmmLabel: "Weeks" },
  { num: "04", label: "Simulation",  img: "/Images/lmm-flow/04-simulation.webp", tradMonths: 2,    tradLabel: "2+ mo",    lmmFraction: 0.03, lmmLabel: "Weeks" },
  { num: "05", label: "Tooling",     img: "/Images/lmm-flow/06-tooling.webp",    tradMonths: 6,    tradLabel: "6+ mo",    lmmFraction: 0.17, lmmLabel: "3 mo" },
  { num: "06", label: "Production",  img: "/Images/lmm-flow/07-production.webp", tradMonths: 12,   tradLabel: "Manual Orchestration",   lmmFraction: 0.08, lmmLabel: "AI Orchestrated" },
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
        className="relative w-full overflow-hidden rounded-lg lmm-flow-card-img"
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
      <div className="mt-1 px-1 sm:px-2 py-1.5 flex flex-col gap-1">
        {/* Traditional */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0 sm:gap-2">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.12em] font-semibold" style={{ color: "hsl(0 0% 72%)" }}>
              Traditional
            </span>
            <span className="text-[11px] sm:text-[12px] tabular-nums font-bold leading-tight sm:whitespace-nowrap" style={{ color: "hsl(0 0% 95%)" }}>
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0 sm:gap-2">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.12em] font-bold" style={{ color: "hsl(275 70% 70%)" }}>
              NEMI LMM
            </span>
            <span className="text-[11px] sm:text-[12px] tabular-nums font-bold leading-tight sm:whitespace-nowrap" style={{ color: "hsl(275 80% 78%)" }}>
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

// Compact mobile arrow component (right / left / down / up)
const MobileArrow = ({
  direction,
  opacity,
  color,
}: {
  direction: "right" | "left" | "down" | "up";
  opacity: number;
  color: string;
}) => {
  if (direction === "down" || direction === "up") {
    return (
      <div className="flex items-center justify-center" style={{ opacity }}>
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          {direction === "down" ? (
            <path d="M2 2 L9 10 L16 2" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <path d="M2 10 L9 2 L16 10" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </svg>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center shrink-0" style={{ opacity, width: 18 }}>
      <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
        {direction === "right" ? (
          <path d="M2 2 L9 8 L2 14" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M10 2 L3 8 L10 14" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </div>
  );
};

// Compact card for mobile single-viewport layout
const MobileCard = ({ step, p }: { step: Step; p: number }) => {
  const tradWidth = (step.tradMonths / MAX_MONTHS) * 100;
  const lmmWidth = tradWidth * step.lmmFraction;

  return (
    <div
      className="relative flex flex-col flex-1 min-w-0"
      style={{ opacity: p, transform: `translateY(${(1 - p) * 12}px)` }}
    >
      {/* Step label */}
      <div className="text-center mb-0.5">
        <span className="text-[9px] tracking-[0.16em] uppercase font-bold text-foreground">
          {step.label}
        </span>
      </div>

      {/* Image */}
      <div
        className="relative w-full overflow-hidden rounded-md"
        style={{ aspectRatio: "16 / 9", background: "hsl(220 20% 6%)" }}
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

      {/* Comparison bars (compact) */}
      <div className="mt-1 px-0.5 flex flex-col gap-1">
        {/* Traditional */}
        <div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-[7px] uppercase tracking-[0.1em] font-semibold leading-none" style={{ color: "hsl(0 0% 65%)" }}>
              Traditional
            </span>
            <span className="text-[8.5px] tabular-nums font-bold leading-[1.1] text-right" style={{ color: "hsl(0 0% 95%)" }}>
              {step.tradLabel ?? formatMonths(step.tradMonths)}
            </span>
          </div>
          <div className="relative h-[2px] rounded-full overflow-hidden mt-0.5" style={{ background: "hsl(0 0% 100% / 0.08)" }}>
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ width: `${tradWidth * p}%`, background: "hsl(0 0% 70%)" }}
            />
          </div>
        </div>

        {/* NEMI LMM */}
        <div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-[7px] uppercase tracking-[0.1em] font-bold leading-none" style={{ color: "hsl(275 70% 70%)" }}>
              NEMI LMM
            </span>
            <span className="text-[8.5px] tabular-nums font-bold leading-[1.1] text-right" style={{ color: "hsl(275 80% 78%)" }}>
              {step.lmmLabel}
            </span>
          </div>
          <div className="relative h-[2px] rounded-full overflow-hidden mt-0.5" style={{ background: "hsl(0 0% 100% / 0.08)" }}>
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${Math.max(lmmWidth * p, p > 0.1 ? 2 : 0)}%`,
                background: "hsl(275 75% 60%)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const LMMFlowSection = ({ scrollProgress }: LMMFlowSectionProps) => {
  // Enter window synced to LMMIntroSection's exit window (0.43 → 0.455) so the
  // crossfade has no blank moment. sectionVisible extends back to 0.43 so this
  // section is mounted during the crossfade.
  // Exit is tightened to 0.598 → 0.61 (12ms wide) so the section stays at full
  // opacity right up to the SEGS-boundary jump (0.61 → 0.75) — prevents a
  // dim/blank zone in raw scroll while the user is still in segment 2.
  // Enter is tightened to 0.43→0.45 so this section (opaque background, rendered
  // ON TOP of LMMIntro) reaches full opacity and covers the screen BEFORE
  // LMMIntro fades out underneath it — no half-faded overlap during the 3rd→4th
  // transition. The enter slide is reduced from 100vh to 10vh so it rises gently
  // into place instead of travelling a full viewport and leaving a gap.
  const sectionVisible = scrollProgress > 0.43 && scrollProgress < 0.61;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.43, 0.45));
  const exitP = easeOut(rangeProgress(scrollProgress, 0.607, 0.61));
  const opacity = enterP * (1 - exitP);
  const slideVh = (1 - enterP) * 10 + exitP * -80;

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
      style={{ zIndex: 42, opacity, background: "hsl(0 0% 2%)", transform: `translateY(${slideVh}vh)` }}
    >
      {/* No inline margin-top here: it would override the global
          `.fixed.inset-0 > div { margin-top:auto }` and, with margin-bottom
          still auto, shove the whole block to the top — hiding the heading
          behind the fixed navbar. Both margins auto → vertically centered. */}
      <div className="w-full max-w-[1180px] mx-auto px-3 sm:px-6 md:px-10 max-h-full">
        {/* Header */}
        <div
          className="text-center mb-1.5 sm:mb-2"
          style={{ opacity: headP, transform: `translateY(${(1 - headP) * 14}px)` }}
        >
          <h2
            className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold tracking-tight"
            style={{
              letterSpacing: "-0.02em",
              textShadow: "0 0 40px hsl(275 80% 60% / 0.3), 0 0 80px hsl(270 70% 50% / 0.15)",
            }}
          >
            From Months to Hours
          </h2>
          <p className="hidden sm:block text-[12px] md:text-[13px] text-muted-foreground mt-1 tracking-wide px-2">
            From fragmented workflows to a unified manufacturing system that learns faster every cycle, connecting every stage from design to delivery.
          </p>
          <p className="block sm:hidden text-[10px] text-muted-foreground mt-0.5 tracking-wide px-2 leading-snug">
            A unified system that learns faster every cycle, connecting design to delivery.
          </p>
        </div>

        {/* Desktop / tablet snake flow */}
        <div className="relative hidden sm:block">
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

        {/* Mobile: clockwise loop 1→2→3→4→5→6→1, fits one viewport */}
        <div className="block sm:hidden flex flex-col gap-1">
          {/* Row 1 (positions 1, 2): Sketch → Render */}
          <div className="flex items-stretch gap-1.5">
            <MobileCard step={STEPS[0]} p={cardP(0)} />
            <MobileArrow direction="right" opacity={cardP(1)} color={arrowColor(0)} />
            <MobileCard step={STEPS[1]} p={cardP(1)} />
          </div>

          {/* Inter-row arrows: ↑ on left (6→1), ↓ on right (2→3) */}
          <div className="grid grid-cols-2 gap-1.5 py-0.5">
            <div className="flex justify-center">
              <MobileArrow direction="up" opacity={cardP(5)} color={arrowColor(5)} />
            </div>
            <div className="flex justify-center">
              <MobileArrow direction="down" opacity={cardP(2)} color={arrowColor(1)} />
            </div>
          </div>

          {/* Row 2 (positions 6, 3): Production (left) | CAD (right) — no inter-card arrow */}
          <div className="grid grid-cols-2 gap-1.5">
            <MobileCard step={STEPS[5]} p={cardP(5)} />
            <MobileCard step={STEPS[2]} p={cardP(2)} />
          </div>

          {/* Inter-row arrows: ↑ on left (5→6), ↓ on right (3→4) */}
          <div className="grid grid-cols-2 gap-1.5 py-0.5">
            <div className="flex justify-center">
              <MobileArrow direction="up" opacity={cardP(4)} color={arrowColor(4)} />
            </div>
            <div className="flex justify-center">
              <MobileArrow direction="down" opacity={cardP(3)} color={arrowColor(2)} />
            </div>
          </div>

          {/* Row 3 (positions 5, 4): Tooling ← Simulation */}
          <div className="flex items-stretch gap-1.5">
            <MobileCard step={STEPS[4]} p={cardP(4)} />
            <MobileArrow direction="left" opacity={cardP(3)} color={arrowColor(3)} />
            <MobileCard step={STEPS[3]} p={cardP(3)} />
          </div>
        </div>

        {/* Footer caption */}
        <div className="text-center mt-2 sm:mt-3 px-2" style={{ opacity: enterP }}>
          <span className="text-[8px] sm:text-[10px] md:text-[12px] tracking-[0.16em] sm:tracking-[0.2em] md:tracking-[0.3em] uppercase leading-snug sm:leading-relaxed" style={{ color: "hsl(275 60% 65% / 0.7)" }}>
            NEMI LMM LOOP · EVERY CYCLE COMPOUNDS KNOWLEDGE, PRECISION, SPEED & COST REDUCTION
          </span>
        </div>
      </div>
    </div>
  );
};

export default LMMFlowSection;
