interface SamCaseStudySectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

interface MetricData {
  label: string;
  withoutSam: number;
  withSam: number;
  unit: string;
  colorHsl: string;
}

const metrics: MetricData[] = [
  { label: "Cost per Package", withoutSam: 20, withSam: 10, unit: " Rs", colorHsl: "145 75% 50%" },
  { label: "Time per Package", withoutSam: 30, withSam: 10, unit: " mins", colorHsl: "210 85% 55%" },
];

const SamCaseStudySection = ({ scrollProgress }: SamCaseStudySectionProps) => {
  // Section: 0.71–0.79
  const sectionVisible = scrollProgress > 0.705 && scrollProgress < 0.795;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.715, 0.73));
  const barsP = easeOut(rangeProgress(scrollProgress, 0.73, 0.76));
  const exitP = easeOut(rangeProgress(scrollProgress, 0.775, 0.79));

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
            style={{ textShadow: "0 0 15px hsl(145 75% 50% / 0.3)" }}
          >
            Case Study
          </h2>
          <h3
            className="text-2xl md:text-4xl font-bold text-foreground tracking-wider"
            style={{ textShadow: "0 0 20px hsl(145 75% 50% / 0.3)" }}
          >
            With vs. Without SAM
          </h3>
        </div>

        <div className="flex flex-col gap-6">
          {metrics.map((metric, i) => {
            const barDelay = i * 0.12;
            const barProgress = Math.min(Math.max((barsP - barDelay) / 0.4, 0), 1);
            const animatedBar = easeOut(barProgress);
            const maxVal = Math.max(metric.withoutSam, metric.withSam);
            const withoutWidth = (metric.withoutSam / maxVal) * 100;
            const withWidth = (metric.withSam / maxVal) * 100;

            return (
              <div key={metric.label} className="flex items-center gap-4">
                <div className="w-28 md:w-36 shrink-0 text-right">
                  <span className="text-sm md:text-base text-muted-foreground tracking-wider">{metric.label}</span>
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-5 md:h-6 rounded-md overflow-hidden" style={{ background: "hsl(0 0% 15%)" }}>
                      <div className="h-full rounded-md" style={{ width: `${withoutWidth * animatedBar}%`, background: "hsl(0 0% 35%)", transition: "width 0.05s linear" }} />
                    </div>
                    <span className="text-xs md:text-sm text-muted-foreground w-16 md:w-20">
                      {animatedBar > 0.5 ? `${metric.withoutSam}${metric.unit}` : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-5 md:h-6 rounded-md overflow-hidden" style={{ background: "hsl(0 0% 15%)" }}>
                      <div
                        className="h-full rounded-md"
                        style={{
                          width: `${withWidth * animatedBar}%`,
                          background: `linear-gradient(90deg, hsl(${metric.colorHsl}), hsl(${metric.colorHsl} / 0.7))`,
                          boxShadow: `0 0 12px hsl(${metric.colorHsl} / 0.3)`,
                          transition: "width 0.05s linear",
                        }}
                      />
                    </div>
                    <span className="text-xs md:text-sm font-semibold w-16 md:w-20" style={{ color: `hsl(${metric.colorHsl})` }}>
                      {animatedBar > 0.5 ? `${metric.withSam}${metric.unit}` : ""}
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
            <span className="text-xs md:text-sm text-muted-foreground tracking-wider">Without SAM</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ background: "linear-gradient(90deg, hsl(145 75% 50%), hsl(210 85% 55%))" }} />
            <span className="text-xs md:text-sm text-muted-foreground tracking-wider">With SAM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SamCaseStudySection;
