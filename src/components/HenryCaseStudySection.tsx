interface HenryCaseStudySectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

interface MetricData {
  label: string;
  traditional: string;
  withHenry: string;
  traditionalVal: number;
  henryVal: number;
  colorHsl: string;
}

const metrics: MetricData[] = [
  { label: "COGS", traditional: "USD 1150", withHenry: "USD 700", traditionalVal: 1150, henryVal: 700, colorHsl: "145 75% 50%" },
  { label: "Capex", traditional: "USD 2M", withHenry: "USD 0.4M", traditionalVal: 2, henryVal: 0.4, colorHsl: "210 85% 55%" },
  { label: "Manpower Required", traditional: "15 persons", withHenry: "10 persons", traditionalVal: 15, henryVal: 10, colorHsl: "275 80% 60%" },
];

const HenryCaseStudySection = ({ scrollProgress }: HenryCaseStudySectionProps) => {
  // Section: 0.59–0.67
  const sectionVisible = scrollProgress > 0.585 && scrollProgress < 0.675;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.595, 0.615));
  const barsP = easeOut(rangeProgress(scrollProgress, 0.615, 0.645));
  const exitP = easeOut(rangeProgress(scrollProgress, 0.655, 0.67));

  if (!sectionVisible) return null;

  const opacity = enterP * (1 - exitP);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 40, opacity, background: "hsl(230 25% 4%)" }}
    >
      <div className="max-w-5xl w-full mx-6">
        <div
          className="text-center mb-10"
          style={{ opacity: enterP, transform: `translateY(${(1 - enterP) * 30}px)` }}
        >
          <h2
            className="text-sm md:text-base tracking-[0.4em] uppercase text-muted-foreground mb-3"
            style={{ textShadow: "0 0 15px hsl(210 80% 55% / 0.3)" }}
          >
            Henry Case Study
          </h2>
          <h3
            className="text-2xl md:text-4xl font-bold text-foreground tracking-wider"
            style={{ textShadow: "0 0 20px hsl(210 80% 55% / 0.3)" }}
          >
            Coffee Machine Development
          </h3>
        </div>

        <div className="flex flex-col gap-6">
          {metrics.map((metric, i) => {
            const barDelay = i * 0.15;
            const barProgress = Math.min(Math.max((barsP - barDelay) / 0.4, 0), 1);
            const animatedBar = easeOut(barProgress);
            const maxVal = Math.max(metric.traditionalVal, metric.henryVal);
            const traditionalWidth = (metric.traditionalVal / maxVal) * 100;
            const henryWidth = (metric.henryVal / maxVal) * 100;

            return (
              <div key={metric.label} className="flex items-center gap-4">
                <div className="w-36 md:w-44 shrink-0 text-right">
                  <span className="text-sm md:text-base text-muted-foreground tracking-wider">{metric.label}</span>
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-5 md:h-6 rounded-md overflow-hidden" style={{ background: "hsl(0 0% 15%)" }}>
                      <div className="h-full rounded-md" style={{ width: `${traditionalWidth * animatedBar}%`, background: "hsl(0 0% 35%)", transition: "width 0.05s linear" }} />
                    </div>
                    <span className="text-xs md:text-sm text-muted-foreground w-24 md:w-28">
                      {animatedBar > 0.5 ? metric.traditional : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-5 md:h-6 rounded-md overflow-hidden" style={{ background: "hsl(0 0% 15%)" }}>
                      <div
                        className="h-full rounded-md"
                        style={{
                          width: `${henryWidth * animatedBar}%`,
                          background: `linear-gradient(90deg, hsl(${metric.colorHsl}), hsl(${metric.colorHsl} / 0.7))`,
                          boxShadow: `0 0 12px hsl(${metric.colorHsl} / 0.3)`,
                          transition: "width 0.05s linear",
                        }}
                      />
                    </div>
                    <span className="text-xs md:text-sm font-semibold w-24 md:w-28" style={{ color: `hsl(${metric.colorHsl})` }}>
                      {animatedBar > 0.5 ? metric.withHenry : ""}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-8 mt-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ background: "hsl(0 0% 35%)" }} />
            <span className="text-xs md:text-sm text-muted-foreground tracking-wider">Traditional</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ background: "linear-gradient(90deg, hsl(210 85% 55%), hsl(145 75% 50%))" }} />
            <span className="text-xs md:text-sm text-muted-foreground tracking-wider">With HENRY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HenryCaseStudySection;
