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
  tradMonths: number;     // traditional time in months (for bar scale + label)
  lmmFraction: number;    // 0..1 of traditional bar to show LMM bar width
  lmmLabel: string;       // human-readable LMM time
}

// Bar scale: max 3 months → 100% width
const MAX_MONTHS = 3;

const STEPS: Step[] = [
  { num: "01", label: "Sketch",     img: "/Images/lmm-flow/01-sketch.png",     tradMonths: 1,    lmmFraction: 0.02, lmmLabel: "Days" },
  { num: "02", label: "Render",     img: "/Images/lmm-flow/02-render.png",     tradMonths: 1,    lmmFraction: 0.02, lmmLabel: "Days" },
  { num: "03", label: "CAD",        img: "/Images/lmm-flow/03-cad.png",        tradMonths: 2,    lmmFraction: 0.03, lmmLabel: "Hours" },
  { num: "04", label: "Simulation", img: "/Images/lmm-flow/04-simulation.png", tradMonths: 1.5,  lmmFraction: 0.03, lmmLabel: "Hours" },
  { num: "05", label: "BOM",        img: "/Images/lmm-flow/05-bom.png",        tradMonths: 1,    lmmFraction: 0.02, lmmLabel: "Days" },
  { num: "06", label: "Tooling",    img: "/Images/lmm-flow/06-tooling.png",    tradMonths: 3,    lmmFraction: 0.18, lmmLabel: "2 weeks" },
  { num: "07", label: "Production", img: "/Images/lmm-flow/07-production.png", tradMonths: 1.5,  lmmFraction: 0.05, lmmLabel: "Days" },
  { num: "08", label: "Dashboard",  img: "/Images/lmm-flow/08-dashboard.png",  tradMonths: 1,    lmmFraction: 0.01, lmmLabel: "Real-time" },
];

const ROW1 = [STEPS[0], STEPS[1], STEPS[2], STEPS[3]];
const ROW2_VISUAL = [STEPS[7], STEPS[6], STEPS[5], STEPS[4]]; // 08, 07, 06, 05 (snake)

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
      {/* Header above image: step label, centered */}
      <div className="mb-1.5 px-0.5 text-center">
        <span className="text-[12px] md:text-sm tracking-[0.16em] uppercase font-semibold text-foreground">
          {step.label}
        </span>
      </div>

      {/* Image — 3:2 aspect, compact */}
      <div
        className="relative w-full overflow-hidden mx-auto"
        style={{
          aspectRatio: "3 / 2",
          maxHeight: "95px",
          maxWidth: "calc(95px * 3 / 2)",
          flexShrink: 0,
          borderRadius: "8px",
          background: "hsl(220 20% 6%)",
        }}
      >
        <img
          src={step.img}
          alt={step.label}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.9) saturate(0.95)" }}
        />
      </div>

      {/* Comparison box — stacked label/value above the bar so nothing crushes */}
      <div
        className="mt-2 px-3 py-2.5 flex flex-col gap-2.5 border rounded-lg"
        style={{
          flexShrink: 0,
          borderColor: "hsl(0 0% 100% / 0.18)",
          background: "hsl(0 0% 100% / 0.025)",
        }}
      >
        {/* Traditional */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.12em] font-medium" style={{ color: "hsl(0 0% 65%)" }}>
              Traditional
            </span>
            <span className="text-[12px] tabular-nums font-semibold whitespace-nowrap" style={{ color: "hsl(0 0% 88%)" }}>
              {formatMonths(step.tradMonths)}
            </span>
          </div>
          <div className="relative h-[2px] rounded-full overflow-hidden" style={{ background: "hsl(0 0% 100% / 0.06)" }}>
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
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.12em] font-semibold" style={{ color: "hsl(0 70% 58%)" }}>
              NEMI LMM
            </span>
            <span className="text-[12px] tabular-nums font-bold whitespace-nowrap" style={{ color: "hsl(0 75% 70%)" }}>
              {step.lmmLabel}
            </span>
          </div>
          <div className="relative h-[2px] rounded-full overflow-hidden" style={{ background: "hsl(0 0% 100% / 0.06)" }}>
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${Math.max(lmmWidth * p, p > 0.1 ? 2 : 0)}%`,
                background: "hsl(0 70% 50%)",
                transition: "width 0.2s ease-out",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Arrowhead-only chevrons between cards
const HArrow = ({ direction, opacity }: { direction: "right" | "left"; opacity: number }) => (
  <div className="flex items-center justify-center" style={{ opacity }}>
    <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
      {direction === "right" ? (
        <path d="M2 2 L11 10 L2 18" stroke="hsl(275 70% 75%)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M12 2 L3 10 L12 18" stroke="hsl(275 70% 75%)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
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

  // Grid template: card | arrow | card | arrow | card | arrow | card
  const gridCols = "1fr 40px 1fr 40px 1fr 40px 1fr";

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden"
      style={{ zIndex: 42, opacity, background: "hsl(0 0% 2%)" }}
    >
      <div className="w-full max-w-[1380px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div
          className="text-center mb-3"
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
          <p className="text-[10px] md:text-xs text-muted-foreground mt-1 tracking-wide">
            End-to-end manufacturing — every step compressed by NEMI LMM, looping continuously.
          </p>
        </div>

        {/* Flow container */}
        <div className="relative">
          {/* Row 1: 01 → 02 → 03 → 04 */}
          <div className="grid items-stretch gap-y-2" style={{ gridTemplateColumns: gridCols }}>
            <Card step={ROW1[0]} p={cardP(0)} />
            <HArrow direction="right" opacity={cardP(0)} />
            <Card step={ROW1[1]} p={cardP(1)} />
            <HArrow direction="right" opacity={cardP(1)} />
            <Card step={ROW1[2]} p={cardP(2)} />
            <HArrow direction="right" opacity={cardP(2)} />
            <Card step={ROW1[3]} p={cardP(3)} />
          </div>

          {/* Down chevron between rows, centered under card 04 (col 7) — visually nudged down via transform */}
          <div className="grid my-2" style={{ gridTemplateColumns: gridCols }}>
            <div /><div /><div /><div /><div /><div />
            <div style={{ justifySelf: "center" }}>
              <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
                style={{
                  opacity: cardP(3),
                  display: "block",
                  transform: "translateY(28px)",
                }}
              >
                <path d="M2 2 L10 11 L18 2" stroke="hsl(275 70% 75%)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Up chevron centered above card 08 (loop back to 01) */}
          <div className="grid mb-1" style={{ gridTemplateColumns: gridCols }}>
            <div className="flex flex-col items-center gap-0.5" style={{ opacity: cardP(7), justifySelf: "center" }}>
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" style={{ display: "block" }}>
                <path d="M2 11 L10 2 L18 11" stroke="hsl(275 70% 75%)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[8px] tracking-[0.25em] uppercase whitespace-nowrap" style={{ color: "hsl(275 60% 65% / 0.7)" }}>
                Loop
              </span>
            </div>
            <div /><div /><div /><div /><div /><div />
          </div>

          {/* Row 2 visual: 08 ← 07 ← 06 ← 05 */}
          <div className="grid items-stretch gap-y-2" style={{ gridTemplateColumns: gridCols }}>
            <Card step={ROW2_VISUAL[0]} p={cardP(7)} />
            <HArrow direction="left" opacity={cardP(6)} />
            <Card step={ROW2_VISUAL[1]} p={cardP(6)} />
            <HArrow direction="left" opacity={cardP(5)} />
            <Card step={ROW2_VISUAL[2]} p={cardP(5)} />
            <HArrow direction="left" opacity={cardP(4)} />
            <Card step={ROW2_VISUAL[3]} p={cardP(4)} />
          </div>
        </div>

        {/* Footer caption */}
        <div className="text-center mt-3" style={{ opacity: enterP }}>
          <span className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase" style={{ color: "hsl(275 60% 65% / 0.7)" }}>
            Continuous loop · Every cycle compounds knowledge
          </span>
        </div>
      </div>
    </div>
  );
};

export default LMMFlowSection;
