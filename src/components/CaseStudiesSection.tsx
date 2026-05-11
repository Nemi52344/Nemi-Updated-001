"use client";

interface CaseStudiesSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

interface Metric {
  label: string;
  before: string;
  after: string;
}

interface CaseStudy {
  image: string;
  imageAlt: string;
  title: string;
  context: string;
  outcome: string;
  metrics: Metric[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    image: "/Images/Messenger.webp",
    imageAlt: "Akio C110 Messenger - electric motorcycle",
    title: "Electric Motorcycle for Africa",
    context: "Rugged EV motorcycle for African road conditions & bike-taxi use.",
    outcome: "PRD to production-ready in 9 months - CAD, tooling, supplier base delivered.",
    metrics: [
      { label: "Design time", before: "24 mo", after: "9 mo" },
      { label: "Dev cost",    before: "$5M+",  after: "<$0.5M" },
    ],
  },
  {
    image: "/Images/aerospace-manufacturing.webp",
    imageAlt: "Aerospace machined parts - precision components",
    title: "Aerospace Machined Parts",
    context: "Aluminium 6061-T651 parts at < 2 micron tolerance.",
    outcome: "Built fixtures to machine on 3-axis instead of 5-axis.",
    metrics: [
      { label: "Machining time", before: "9 hrs", after: "3 hrs" },
      { label: "Cost reduction", before: "Baseline",   after: ">50%" },
    ],
  },
  {
    image: "/Images/COffee%20mfg.webp",
    imageAlt: "Complex assembly production - coffee machine line",
    title: "Complex Assembly Production",
    context: "Mass production of an automated coffee machine.",
    outcome: "End-to-end fabrication, machining, electronics & assembly.",
    metrics: [
      { label: "Setup lead time", before: "Benchmark", after: "<6 wks" },
      { label: "Cost reduction", before: "Baseline",  after: ">30%" },
    ],
  },
];

const CaseStudiesSection = ({ scrollProgress }: CaseStudiesSectionProps) => {
  // Single combined section: 0.605–0.755 (was 3 separate slots)
  const sectionVisible = scrollProgress > 0.605 && scrollProgress < 0.755;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.615, 0.655));
  const exitP  = easeOut(rangeProgress(scrollProgress, 0.735, 0.755));
  const opacity = enterP * (1 - exitP);

  const headP = easeOut(rangeProgress(scrollProgress, 0.620, 0.650));

  if (!sectionVisible) return null;

  const cardP = (i: number) => {
    const delay = i * 0.008;
    return easeOut(rangeProgress(scrollProgress, 0.630 + delay, 0.665 + delay));
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden"
      style={{ zIndex: 42, opacity, background: "hsl(0 0% 2%)" }}
    >
      <div className="w-full max-w-[1380px] mx-auto px-4 md:px-8" style={{ transform: "translateY(30px)" }}>
        {/* Header */}
        <div
          className="text-center mb-4 md:mb-5"
          style={{ opacity: headP, transform: `translateY(${(1 - headP) * 14}px)` }}
        >
          <h2
            className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight"
            style={{
              letterSpacing: "-0.02em",
              textShadow: "0 0 40px hsl(275 80% 60% / 0.3), 0 0 80px hsl(270 70% 50% / 0.15)",
            }}
          >
            Case Studies
          </h2>
          <p className="text-base text-muted-foreground mt-2 tracking-wide">
            Real engagements where NEMI compressed cost, time, and team size.
          </p>
        </div>

        {/* 3-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {CASE_STUDIES.map((cs, i) => {
            const p = cardP(i);
            return (
              <article
                key={cs.title}
                className="rounded-xl overflow-hidden border flex flex-col h-full"
                style={{
                  opacity: p,
                  transform: `translateY(${(1 - p) * 18}px)`,
                  borderColor: "hsl(275 40% 50% / 0.18)",
                  background: "hsl(220 20% 6% / 0.6)",
                }}
              >
                {/* Image on top */}
                <div className="relative w-full overflow-hidden" style={{ height: "150px", background: "hsl(220 20% 5%)" }}>
                  <img
                    src={cs.image}
                    alt={cs.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ filter: "brightness(0.92) saturate(0.95)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, transparent 60%, hsl(220 20% 6%) 100%)" }}
                  />
                </div>

                {/* Content below */}
                <div className="px-5 py-5 flex flex-col gap-4 flex-1">
                  {/* Card title — largest, bold */}
                  <h3
                    className="text-xl md:text-2xl font-extrabold tracking-tight uppercase leading-tight"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {cs.title}
                  </h3>

                  {/* Context */}
                  <div>
                    <p className="text-[11px] tracking-[0.25em] uppercase font-bold mb-1" style={{ color: "hsl(275 70% 70%)" }}>
                      Context
                    </p>
                    <p className="text-[15px] text-muted-foreground leading-snug line-clamp-2 min-h-[2.4em]">
                      {cs.context}
                    </p>
                  </div>

                  {/* Outcome */}
                  <div>
                    <p className="text-[11px] tracking-[0.25em] uppercase font-bold mb-1" style={{ color: "hsl(275 70% 70%)" }}>
                      Outcome
                    </p>
                    <p className="text-[15px] text-muted-foreground leading-snug line-clamp-2 min-h-[2.4em]">
                      {cs.outcome}
                    </p>
                  </div>

                  {/* Key metrics table - pinned to bottom */}
                  <div className="mt-auto pt-3 border-t" style={{ borderColor: "hsl(0 0% 100% / 0.10)" }}>
                    <p className="text-[11px] tracking-[0.25em] uppercase font-bold mb-2" style={{ color: "hsl(275 70% 70%)" }}>
                      Key Metrics
                    </p>
                    {/* Column headers */}
                    <div className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase mb-2 font-semibold" style={{ color: "hsl(0 0% 45%)" }}>
                      <span className="flex-1">Metric</span>
                      <span className="w-20 text-right">Before</span>
                      <span className="w-20 text-right" style={{ color: "hsl(275 70% 60%)" }}>After</span>
                    </div>
                    {/* Rows */}
                    <div className="flex flex-col gap-2">
                      {cs.metrics.map((m) => (
                        <div key={m.label} className="flex items-center justify-between">
                          <span className="flex-1 text-[14px] text-foreground/85 font-medium">{m.label}</span>
                          <span className="w-20 text-right text-[13px] line-through whitespace-nowrap" style={{ color: "hsl(0 0% 50%)" }}>{m.before}</span>
                          <span className="w-20 text-right text-[15px] font-bold whitespace-nowrap" style={{ color: "hsl(275 75% 75%)" }}>{m.after}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer note */}
        <p
          className="text-center text-[11px] md:text-[12px] tracking-[0.25em] uppercase mt-3"
          style={{ color: "hsl(0 0% 100% / 0.35)", opacity: enterP }}
        >
          Customer names withheld under NDA · References available on request
        </p>
      </div>
    </div>
  );
};

export default CaseStudiesSection;
