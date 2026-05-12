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
  { num: "01", label: "Sketch",      img: "/Images/lmm-flow/01-sketch.png",     tradMonths: 2,    tradLabel: "2 mo",     lmmFraction: 0.02, lmmLabel: "<1 week" },
  { num: "02", label: "Render",      img: "/Images/lmm-flow/02-render.png",     tradMonths: 9,    tradLabel: "6-12 mo",  lmmFraction: 0.07, lmmLabel: "12 wks" },
  { num: "03", label: "CAD",         img: "/Images/lmm-flow/03-cad.png",        tradMonths: 9,    tradLabel: "6-12 mo",  lmmFraction: 0.07, lmmLabel: "12 wks" },
  { num: "04", label: "Simulation",  img: "/Images/lmm-flow/04-simulation.png", tradMonths: 1,    tradLabel: "1 mo",     lmmFraction: 0.02, lmmLabel: "<1 week" },
  { num: "05", label: "BOM",         img: "/Images/lmm-flow/05-bom.png",        tradMonths: 1,    tradLabel: "1 mo",     lmmFraction: 0.02, lmmLabel: "<1 week" },
  { num: "06", label: "Tooling",     img: "/Images/lmm-flow/06-tooling.png",    tradMonths: 10,   tradLabel: "9-12 mo",  lmmFraction: 0.08, lmmLabel: "12 wks" },
  { num: "07", label: "Production",  img: "/Images/lmm-flow/07-production.png", tradMonths: 10,   tradLabel: "9-12 mo",  lmmFraction: 0.08, lmmLabel: "12 wks" },
  { num: "08", label: "After Sales", img: "/Images/lmm-flow/08-dashboard.png",  tradMonths: 1,    tradLabel: "1 mo",     lmmFraction: 0.01, lmmLabel: "Real-time" },
];

const ROW1 = [STEPS[0], STEPS[1], STEPS[2], STEPS[3]];
const ROW2_VISUAL = [STEPS[7], STEPS[6], STEPS[5], STEPS[4]]; // 08, 07, 06, 05 (snake)

const formatMonths = (m: number) => (m === 1 ? "1 mo" : `${m} mo`);

const MobileCard = ({ step, p }: { step: Step; p: number }) => {
  const tradWidth = (step.tradMonths / MAX_MONTHS) * 100;
  const lmmWidth = tradWidth * step.lmmFraction;

  return (
    <div
      className="relative flex flex-col rounded-lg border overflow-hidden"
      style={{
        opacity: p,
        borderColor: "hsl(0 0% 100% / 0.1)",
        background: "hsl(220 20% 7% / 0.8)",
      }}
    >
      <div className="relative w-full h-[55px] overflow-hidden">
        <img src={step.img} alt={step.label} loading="lazy" decoding="async" className="w-full h-full object-cover" style={{ filter: "brightness(0.8)" }} />
        <div className="absolute inset-0 flex items-end pb-1 pl-1.5" style={{ background: "linear-gradient(to top, hsl(0 0% 0% / 0.7), transparent 60%)" }}>
          <span className="text-[9px] tracking-[0.12em] uppercase font-bold text-white">{step.label}</span>
        </div>
      </div>
      <div className="px-1.5 py-1 flex flex-col gap-0.5">
        <div className="flex items-center justify-between">
          <span className="text-[7px] uppercase tracking-wide font-semibold" style={{ color: "hsl(0 0% 72%)" }}>Traditional</span>
          <span className="text-[8px] tabular-nums font-bold" style={{ color: "hsl(0 0% 95%)" }}>{step.tradLabel ?? formatMonths(step.tradMonths)}</span>
        </div>
        <div className="relative h-[2px] rounded-full overflow-hidden" style={{ background: "hsl(0 0% 100% / 0.08)" }}>
          <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${tradWidth * p}%`, background: "hsl(0 0% 70%)" }} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[7px] uppercase tracking-wide font-bold" style={{ color: "hsl(0 70% 62%)" }}>NEMI LMM</span>
          <span className="text-[8px] tabular-nums font-bold" style={{ color: "hsl(0 75% 72%)" }}>{step.lmmLabel}</span>
        </div>
        <div className="relative h-[2px] rounded-full overflow-hidden" style={{ background: "hsl(0 0% 100% / 0.08)" }}>
          <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${Math.max(lmmWidth * p, p > 0.1 ? 2 : 0)}%`, background: "hsl(0 70% 50%)" }} />
        </div>
      </div>
    </div>
  );
};

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
      <div className="mb-1 px-0.5 text-center">
        <span className="text-[11px] tracking-[0.15em] uppercase font-bold text-foreground">
          {step.label}
        </span>
      </div>

      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "3 / 2",
          maxHeight: "110px",
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

      <div
        className="mt-1 px-1.5 py-1 flex flex-col gap-1 border rounded-md"
        style={{
          flexShrink: 0,
          borderColor: "hsl(0 0% 100% / 0.18)",
          background: "hsl(0 0% 100% / 0.025)",
        }}
      >
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[0.12em] font-semibold" style={{ color: "hsl(0 0% 72%)" }}>Traditional</span>
            <span className="text-[10px] tabular-nums font-bold whitespace-nowrap" style={{ color: "hsl(0 0% 95%)" }}>{step.tradLabel ?? formatMonths(step.tradMonths)}</span>
          </div>
          <div className="relative h-[2px] rounded-full overflow-hidden" style={{ background: "hsl(0 0% 100% / 0.08)" }}>
            <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${tradWidth * p}%`, background: "hsl(0 0% 70%)", transition: "width 0.2s ease-out" }} />
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-[0.12em] font-bold" style={{ color: "hsl(0 70% 62%)" }}>NEMI LMM</span>
            <span className="text-[10px] tabular-nums font-bold whitespace-nowrap" style={{ color: "hsl(0 75% 72%)" }}>{step.lmmLabel}</span>
          </div>
          <div className="relative h-[2px] rounded-full overflow-hidden" style={{ background: "hsl(0 0% 100% / 0.08)" }}>
            <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${Math.max(lmmWidth * p, p > 0.1 ? 2 : 0)}%`, background: "hsl(0 70% 50%)", transition: "width 0.2s ease-out" }} />
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
  const sectionVisible = scrollProgress > 0.300 && scrollProgress < 0.400;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.308, 0.338));
  const exitP = easeOut(rangeProgress(scrollProgress, 0.383, 0.398));
  const opacity = enterP * (1 - exitP);

  const headP = easeOut(rangeProgress(scrollProgress, 0.310, 0.340));

  if (!sectionVisible) return null;

  const cardP = (idx: number) => {
    const delay = idx * 0.003;
    return easeOut(rangeProgress(scrollProgress, 0.320 + delay, 0.350 + delay));
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
          className="text-center mb-2 md:mb-4"
          style={{ opacity: headP, transform: `translateY(${(1 - headP) * 14}px)` }}
        >
          <h2
            className="text-base md:text-3xl lg:text-4xl font-bold tracking-tight"
            style={{
              letterSpacing: "-0.03em",
              textShadow: "0 0 40px hsl(275 80% 60% / 0.3), 0 0 80px hsl(270 70% 50% / 0.15)",
            }}
          >
            From Months to Hours
          </h2>
          <p className="text-[11px] md:text-[13px] text-muted-foreground mt-2 tracking-wide w-full mx-auto leading-relaxed md:whitespace-nowrap">
            From fragmented workflows to a unified manufacturing system that learns faster every cycle, connecting every stage from design to delivery.
          </p>
        </div>

        {/* Mobile layout - Page 1 (cards 1-4) then Page 2 (cards 5-8) */}
        {(() => {
          const mobilePage2P = rangeProgress(scrollProgress, 0.355, 0.370);
          const page1Opacity = 1 - mobilePage2P;
          const page2Opacity = mobilePage2P;
          return (
            <div className="relative md:hidden" style={{ minHeight: "320px" }}>
              {/* Page 1: cards 01-04 */}
              <div
                className="absolute inset-0 grid grid-cols-2 gap-2"
                style={{ opacity: page1Opacity, pointerEvents: mobilePage2P > 0.5 ? "none" : "auto" }}
              >
                {STEPS.slice(0, 4).map((step, i) => (
                  <MobileCard key={step.num} step={step} p={cardP(i)} />
                ))}
              </div>
              {/* Page 2: cards 05-08 */}
              <div
                className="absolute inset-0 grid grid-cols-2 gap-2"
                style={{ opacity: page2Opacity, pointerEvents: mobilePage2P > 0.5 ? "auto" : "none" }}
              >
                {STEPS.slice(4).map((step, i) => (
                  <MobileCard key={step.num} step={step} p={cardP(i + 4)} />
                ))}
              </div>
            </div>
          );
        })()}

        {/* Desktop layout */}
        <div className="relative hidden md:block">
          {/* Row 1: 01 → 02 → 03 → 04 */}
          <div className="grid items-stretch gap-y-1" style={{ gridTemplateColumns: gridCols }}>
            <Card step={ROW1[0]} p={cardP(0)} />
            <HArrow direction="right" opacity={cardP(0)} />
            <Card step={ROW1[1]} p={cardP(1)} />
            <HArrow direction="right" opacity={cardP(1)} />
            <Card step={ROW1[2]} p={cardP(2)} />
            <HArrow direction="right" opacity={cardP(2)} />
            <Card step={ROW1[3]} p={cardP(3)} />
          </div>

          {/* Down chevron between rows */}
          <div className="grid" style={{ gridTemplateColumns: gridCols }}>
            <div /><div /><div /><div /><div /><div />
            <div className="flex justify-center">
              <svg
                width="24"
                height="17"
                viewBox="0 0 20 14"
                fill="none"
                style={{
                  opacity: cardP(3),
                  display: "block",
                  transform: "translateY(14px)",
                }}
              >
                <path d="M2 2 L10 11 L18 2" stroke="hsl(275 70% 75%)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Up chevron */}
          <div className="grid" style={{ gridTemplateColumns: gridCols }}>
            <div className="flex justify-center" style={{ opacity: cardP(7) }}>
              <svg width="24" height="17" viewBox="0 0 20 14" fill="none" style={{ display: "block" }}>
                <path d="M2 11 L10 2 L18 11" stroke="hsl(275 70% 75%)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div /><div /><div /><div /><div /><div />
          </div>

          {/* Row 2 visual: 08 ← 07 ← 06 ← 05 */}
          <div className="grid items-stretch gap-y-1" style={{ gridTemplateColumns: gridCols }}>
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
        <div className="text-center mt-2" style={{ opacity: enterP, transform: "translateY(16px)" }}>
          <span className="text-[7px] md:text-[12px] tracking-[0.2em] md:tracking-[0.3em] uppercase" style={{ color: "hsl(275 60% 65% / 0.7)" }}>
            NEMI LMM LOOP · EVERY CYCLE COMPOUNDS KNOWLEDGE, PRECISION, SPEED & COST REDUCTION
          </span>
        </div>
      </div>
    </div>
  );
};

export default LMMFlowSection;
