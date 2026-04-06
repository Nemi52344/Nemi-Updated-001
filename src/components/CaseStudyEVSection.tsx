interface CaseStudyEVSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

interface MetricData {
  label: string;
  traditional: string;
  withNemi: string;
  traditionalVal: number;
  nemiVal: number;
  colorHsl: string;
}

interface InsightData {
  title: string;
  description: string;
  colorHsl: string;
}

const metrics: MetricData[] = [
  { label: "Speed", traditional: "18 months*", withNemi: "9 months", traditionalVal: 18, nemiVal: 9, colorHsl: "0 75% 55%" },
  { label: "Manpower Required", traditional: "20 ppl", withNemi: "6 ppl", traditionalVal: 20, nemiVal: 6, colorHsl: "220 85% 55%" },
  { label: "COGS", traditional: "USD 1400", withNemi: "USD 1200", traditionalVal: 1400, nemiVal: 1200, colorHsl: "145 75% 50%" },
  { label: "Development Cost", traditional: "$5M+*", withNemi: "<$0.5M total", traditionalVal: 5, nemiVal: 0.5, colorHsl: "275 80% 60%" },
];

const insights: InsightData[] = [
  { title: "Time-to-Market", description: "2x faster", colorHsl: "0 75% 55%" },
  { title: "Workforce Volume", description: "30% of required Manpower — zero loss in performance", colorHsl: "220 85% 55%" },
  { title: "Unit Economics", description: "14% COGS reduction", colorHsl: "145 75% 50%" },
  { title: "Capital Efficiency", description: "10x lower development spend", colorHsl: "275 80% 60%" },
];

const CaseStudyEVSection = ({ scrollProgress }: CaseStudyEVSectionProps) => {
  const sectionVisible = scrollProgress > 0.835 && scrollProgress < 0.96;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.85, 0.88));
  const exitP = easeOut(rangeProgress(scrollProgress, 0.92, 0.95));
  const barsP = easeOut(rangeProgress(scrollProgress, 0.87, 0.91));
  const opacity = Math.min(enterP, 1 - exitP);

  if (!sectionVisible) return null;

  return (
    <div
      className="fixed inset-0 flex items-start md:items-center justify-center pointer-events-none pt-14 md:pt-0 pb-[24vh] md:pb-[18vh] overflow-y-auto"
      style={{ zIndex: 40, background: "hsl(230 25% 4%)", opacity }}
    >
      <div className="max-w-6xl w-full mx-4 md:mx-6">
        {/* Title */}
        <div
          className="text-center mb-2 md:mb-8"
          style={{ opacity: enterP, transform: `translateY(${(1 - enterP) * 30}px)` }}
        >
          <h2
            className="text-xs md:text-base tracking-[0.4em] uppercase text-muted-foreground mb-1"
            style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
          >
            Case Study
          </h2>
          <h3
            className="text-xl md:text-4xl font-bold text-foreground tracking-wider"
            style={{ textShadow: "0 0 20px hsl(275 80% 60% / 0.3)" }}
          >
            EV Development
          </h3>
        </div>

        {/* Main content: aligned bar rows + insight cards */}
        <div className="flex flex-col gap-3 md:gap-4">
          {metrics.map((metric, i) => {
            const barDelay = i * 0.15;
            const barProgress = Math.min(Math.max((barsP - barDelay) / 0.4, 0), 1);
            const animatedBar = easeOut(barProgress);
            const insight = insights[i];

            const maxVal = Math.max(metric.traditionalVal, metric.nemiVal);
            const traditionalWidth = (metric.traditionalVal / maxVal) * 100;
            const nemiWidth = (metric.nemiVal / maxVal) * 100;

            return (
              <div key={metric.label} className="flex flex-col lg:flex-row items-stretch gap-1 lg:gap-6">
                {/* Bar section */}
                <div className="flex-1 flex items-center gap-2 md:gap-4">
                  <div className="w-24 md:w-40 shrink-0 text-right">
                    <span className="text-xs md:text-sm text-muted-foreground tracking-wider">
                      {metric.label}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col gap-1">
                    {/* Traditional */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-4 md:h-6 rounded-md overflow-hidden" style={{ background: "hsl(0 0% 15%)" }}>
                        <div
                          className="h-full rounded-md"
                          style={{
                            width: `${traditionalWidth * animatedBar}%`,
                            background: "hsl(0 0% 35%)",
                            transition: "width 0.05s linear",
                          }}
                        />
                      </div>
                      <span className="text-[10px] md:text-xs text-muted-foreground w-20 md:w-24">
                        {animatedBar > 0.5 ? metric.traditional : ""}
                      </span>
                    </div>

                    {/* With NEMI */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-4 md:h-6 rounded-md overflow-hidden" style={{ background: "hsl(0 0% 15%)" }}>
                        <div
                          className="h-full rounded-md"
                          style={{
                            width: `${nemiWidth * animatedBar}%`,
                            background: `linear-gradient(90deg, hsl(${metric.colorHsl}), hsl(${metric.colorHsl} / 0.7))`,
                            boxShadow: `0 0 12px hsl(${metric.colorHsl} / 0.3)`,
                            transition: "width 0.05s linear",
                          }}
                        />
                      </div>
                      <span
                        className="text-[10px] md:text-xs font-semibold w-20 md:w-24"
                        style={{ color: `hsl(${metric.colorHsl})` }}
                      >
                        {animatedBar > 0.5 ? metric.withNemi : ""}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Insight card aligned to bar row */}
                <div
                  className="lg:w-56 rounded-lg px-2 py-1.5 md:px-3 md:py-3 flex flex-col justify-center"
                  style={{
                    background: `hsl(${insight.colorHsl} / 0.08)`,
                    borderLeft: `3px solid hsl(${insight.colorHsl})`,
                    opacity: Math.min(Math.max((barsP - i * 0.1) / 0.3, 0), 1),
                    transform: `translateX(${(1 - Math.min(Math.max((barsP - i * 0.1) / 0.3, 0), 1)) * 20}px)`,
                  }}
                >
                  <span
                    className="text-[10px] md:text-xs font-bold tracking-wide block"
                    style={{ color: `hsl(${insight.colorHsl})` }}
                  >
                    {insight.title}
                  </span>
                  <span className="text-[9px] md:text-[11px] text-foreground leading-snug">
                    {insight.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-2 md:mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ background: "hsl(0 0% 35%)" }} />
            <span className="text-xs md:text-xs text-muted-foreground tracking-wider">Traditional*</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ background: "linear-gradient(90deg, hsl(275 80% 60%), hsl(220 85% 55%))" }} />
            <span className="text-xs md:text-xs text-muted-foreground tracking-wider">With NEMI</span>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground/60 mt-1 italic">
          *All benchmarks are lowest possible traditionally
        </p>

        {/* ~3x / ~4x summary stats below chart */}
        <div
          className="flex justify-center gap-8 sm:gap-16 mt-3 md:mt-6"
          style={{ opacity: barsP }}
        >
          <div className="text-center">
            <span className="text-lg md:text-3xl font-bold tracking-wide" style={{ color: "hsl(220 85% 65%)" }}>
              ~3x
            </span>
            <p className="text-[9px] md:text-xs text-foreground mt-1 max-w-[180px] mx-auto leading-tight">
              systemic business process lift improvement
            </p>
          </div>
          <div className="text-center">
            <span className="text-lg md:text-3xl font-bold tracking-wide" style={{ color: "hsl(275 80% 65%)" }}>
              ~4x
            </span>
            <p className="text-[9px] md:text-xs text-foreground mt-1 max-w-[180px] mx-auto leading-tight">
              operational efficiency uplift
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyEVSection;
