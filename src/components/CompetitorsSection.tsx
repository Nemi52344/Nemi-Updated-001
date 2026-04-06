interface CompetitorsSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const factoryImages = [
  "/Images/Injection%20modling%20.png",
  "/Images/Nemi%20battery%20manufacturing%2001.jpeg",
  "/Images/Electronics%20production.jpeg",
  "/Images/Nemi%20Testing%20components.jpeg",
  "/Images/Pipe%20bending.png",
  "/Images/Tooling%20and%20fixturing.png",
  "/Images/Nemi%20stores.png",
  "/Images/Nemi%20parking.jpeg",
];

const stats = [
  { value: "300K", unit: "sq ft", label: "Facility" },
  { value: "AIS", unit: "9100D", label: "Certified" },
  { value: "40+", unit: "", label: "Patents" },
];

const CompetitorsSection = ({ scrollProgress }: CompetitorsSectionProps) => {
  const sectionVisible = scrollProgress > 0.61 && scrollProgress < 0.74;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.62, 0.66));
  const cardsP = rangeProgress(scrollProgress, 0.64, 0.70);
  const statsP = easeOut(rangeProgress(scrollProgress, 0.67, 0.70));
  const exitP = easeOut(rangeProgress(scrollProgress, 0.71, 0.74));

  if (!sectionVisible) return null;

  const opacity = enterP * (1 - exitP);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 40, opacity, background: "hsl(230 25% 4%)" }}
    >
      <div className="max-w-6xl w-full mx-6">
        {/* Heading */}
        <div
          className="text-center mb-10"
          style={{ opacity: enterP, transform: `translateY(${(1 - enterP) * 40}px)` }}
        >
          <h2
            className="text-sm md:text-base tracking-[0.4em] uppercase text-muted-foreground mb-3"
            style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
          >
            Execution
          </h2>
          <h3
            className="text-2xl md:text-4xl font-bold text-foreground tracking-wider"
            style={{ textShadow: "0 0 20px hsl(275 80% 60% / 0.3)" }}
          >
            Competitors simulate,{" "}
            <span className="text-foreground">we execute</span>
          </h3>
        </div>

        {/* Factory photo cards — 4x2 grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-8">
        {factoryImages.map((src, i) => {
            const cardDelay = i * 0.08;
            const cardP = easeOut(Math.min(Math.max((cardsP - cardDelay) / 0.35, 0), 1));

            return (
              <div
                key={i}
                className="rounded-xl overflow-hidden border"
                style={{
                  opacity: cardP,
                  transform: `translateY(${(1 - cardP) * 50}px) scale(${0.9 + cardP * 0.1})`,
                  borderColor: "hsl(275 80% 60% / 0.15)",
                  boxShadow: `0 8px 40px hsl(275 80% 40% / ${cardP * 0.15})`,
                }}
              >
                <img
                  src={src}
                  alt="NEMI Factory"
                  className="w-full h-24 md:h-36 lg:h-40 object-cover"
                  loading="eager"
                />
              </div>
            );
          })}
        </div>

        {/* Stats bar */}
        <div
          className="flex items-center justify-center gap-6 md:gap-12"
          style={{ opacity: statsP, transform: `translateY(${(1 - statsP) * 25}px)` }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex items-baseline justify-center gap-1">
                <span
                  className="text-2xl md:text-4xl font-bold"
                  style={{
                    color: "hsl(275 80% 60%)",
                    textShadow: "0 0 20px hsl(275 80% 60% / 0.5)",
                  }}
                >
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="text-sm md:text-lg font-semibold text-foreground">
                    {stat.unit}
                  </span>
                )}
              </div>
              <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-muted-foreground mt-1 block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompetitorsSection;
