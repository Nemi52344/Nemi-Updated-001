interface MissionSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

interface PillarData {
  icon: string;
  title: string;
  description: string;
}

const pillars: PillarData[] = [
  {
    icon: "⚡",
    title: "Physical AI",
    description:
      "Bridging the gap between digital intelligence and physical execution, our AI models understand the real world of materials, forces, and tolerances.",
  },
  {
    icon: "🏭",
    title: "Smart Manufacturing",
    description:
      "End-to-end automation that adapts in real time. From design to production, every step is optimized by intelligent systems that learn and improve.",
  },
  {
    icon: "🌍",
    title: "Global Impact",
    description:
      "Democratizing advanced manufacturing for industries worldwide, making precision, speed, and sustainability accessible at every scale.",
  },
];

const MissionSection = ({ scrollProgress }: MissionSectionProps) => {
  // This section lives in scroll range ~0.62–0.95
  const sectionVisible = scrollProgress > 0.61;

  // Mission statement fade in
  const missionEnterP = easeOut(rangeProgress(scrollProgress, 0.63, 0.68));
  const missionExitP = easeOut(rangeProgress(scrollProgress, 0.74, 0.78));
  const missionOpacity = missionEnterP * (1 - missionExitP);

  // Pillar cards stagger
  const pillar0P = easeOut(rangeProgress(scrollProgress, 0.72, 0.77));
  const pillar1P = easeOut(rangeProgress(scrollProgress, 0.75, 0.80));
  const pillar2P = easeOut(rangeProgress(scrollProgress, 0.78, 0.83));
  const pillarExitP = easeOut(rangeProgress(scrollProgress, 0.86, 0.90));

  // Bottom CTA
  const ctaP = easeOut(rangeProgress(scrollProgress, 0.88, 0.93));

  // Section title
  const titleOpacity = Math.min(
    rangeProgress(scrollProgress, 0.62, 0.65),
    1 - rangeProgress(scrollProgress, 0.93, 0.96)
  );

  if (!sectionVisible) return null;

  const pillarProgresses = [pillar0P, pillar1P, pillar2P];

  return (
    <>
      {/* Section title */}
      <div
        className="fixed top-8 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ zIndex: 25, opacity: titleOpacity }}
      >
        <h2
          className="text-sm md:text-base tracking-[0.4em] uppercase text-muted-foreground"
          style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
        >
          Our Mission
        </h2>
      </div>

      {/* Mission statement */}
      <div
        className="fixed inset-0 flex items-center justify-center pointer-events-none"
        style={{
          zIndex: 25,
          opacity: missionOpacity,
          transform: `translateY(${(1 - missionEnterP) * 40 - missionExitP * 60}px)`,
        }}
      >
        <div className="max-w-3xl mx-6 text-center">
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-wide leading-tight mb-6"
            style={{
              textShadow:
                "0 0 30px hsl(275 80% 60% / 0.5), 0 0 60px hsl(270 70% 50% / 0.2)",
            }}
          >
            Redefining What's Possible
          </h2>
          <p className="text-base md:text-xl text-muted-foreground leading-relaxed tracking-wide">
            NEMI exists to unlock a new era of manufacturing, where Physical AI
            transforms raw potential into precision reality, at scale.
          </p>
        </div>
      </div>

      {/* Three pillar cards */}
      <div
        className="fixed inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 25 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 max-w-5xl mx-6">
          {pillars.map((pillar, i) => {
            const p = pillarProgresses[i];
            const opacity = p * (1 - pillarExitP);
            const translateY = (1 - p) * 60;

            return (
              <div
                key={pillar.title}
                className="flex flex-col items-center text-center p-6 md:p-8 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm max-w-xs"
                style={{
                  opacity,
                  transform: `translateY(${translateY}px)`,
                  boxShadow:
                    "0 0 40px hsl(275 80% 60% / 0.08), 0 4px 20px hsl(230 25% 4% / 0.4)",
                }}
              >
                <span className="text-4xl mb-4">{pillar.icon}</span>
                <h3
                  className="text-lg md:text-xl font-semibold text-foreground tracking-wider mb-3"
                  style={{
                    textShadow: "0 0 12px hsl(275 80% 60% / 0.3)",
                  }}
                >
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div
        className="fixed inset-0 flex items-center justify-center pointer-events-none"
        style={{
          zIndex: 25,
          opacity: ctaP,
          transform: `translateY(${(1 - ctaP) * 30}px)`,
        }}
      >
        <div className="text-center max-w-2xl mx-6">
          <h3
            className="text-2xl md:text-4xl font-bold text-foreground tracking-wider mb-4"
            style={{
              textShadow:
                "0 0 25px hsl(275 80% 60% / 0.5), 0 0 50px hsl(270 70% 50% / 0.25)",
            }}
          >
            The Future is Physical
          </h3>
          <p className="text-base md:text-lg text-muted-foreground tracking-wide mb-8">
            Join us in building the next generation of intelligent manufacturing.
          </p>
          <div
            className="inline-block px-8 py-3 rounded-full border border-primary/40 text-primary tracking-widest uppercase text-sm pointer-events-auto cursor-pointer hover:bg-primary/10 transition-colors"
            style={{
              boxShadow: "0 0 20px hsl(275 80% 60% / 0.2)",
              animation: ctaP >= 1 ? "text-glow-pulse 3s ease-in-out infinite" : "none",
            }}
          >
            Get in Touch
          </div>
        </div>
      </div>
    </>
  );
};

export default MissionSection;
