interface PartnersSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const partners = [
  "Lockheed Martin", "Boeing", "Tesla", "SpaceX", "Rivian",
  "Northrop Grumman", "General Dynamics", "Raytheon", "BAE Systems", "L3Harris",
  "Honeywell", "Siemens", "ABB", "Fanuc", "Universal Robots",
];

const PartnersSection = ({ scrollProgress }: PartnersSectionProps) => {
  // Section: 0.88–0.95
  const sectionVisible = scrollProgress > 0.87 && scrollProgress < 0.96;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.89, 0.92));
  const exitP = rangeProgress(scrollProgress, 0.94, 0.96);

  if (!sectionVisible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 40, opacity: enterP * (1 - exitP), background: "hsl(230 25% 4%)" }}
    >
      <div className="max-w-6xl w-full mx-6">
        <div
          className="text-center mb-12"
          style={{ opacity: enterP, transform: `translateY(${(1 - enterP) * 30}px)` }}
        >
          <h2
            className="text-sm md:text-base tracking-[0.4em] uppercase text-muted-foreground mb-3"
            style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
          >
            Partnerships
          </h2>
          <h3
            className="text-2xl md:text-4xl font-bold text-foreground tracking-wider"
            style={{ textShadow: "0 0 20px hsl(275 80% 60% / 0.3)" }}
          >
            Our Trusted Partners
          </h3>
        </div>

        {/* Rolling banner - two rows */}
        <div className="overflow-hidden">
          {/* Row 1 — scrolls left */}
          <div className="flex mb-6" style={{ animation: "partner-scroll-left 30s linear infinite" }}>
            {[...partners, ...partners].map((name, i) => (
              <div
                key={`r1-${i}`}
                className="flex-shrink-0 mx-4 px-8 py-5 rounded-xl border flex items-center justify-center"
                style={{
                  borderColor: "hsl(230 15% 20%)",
                  background: "hsl(230 25% 8%)",
                  minWidth: "200px",
                }}
              >
                <span className="text-sm md:text-base font-semibold tracking-wider text-muted-foreground whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </div>

          {/* Row 2 — scrolls right */}
          <div className="flex" style={{ animation: "partner-scroll-right 35s linear infinite" }}>
            {[...partners.slice().reverse(), ...partners.slice().reverse()].map((name, i) => (
              <div
                key={`r2-${i}`}
                className="flex-shrink-0 mx-4 px-8 py-5 rounded-xl border flex items-center justify-center"
                style={{
                  borderColor: "hsl(230 15% 20%)",
                  background: "hsl(230 25% 8%)",
                  minWidth: "200px",
                }}
              >
                <span className="text-sm md:text-base font-semibold tracking-wider text-muted-foreground whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;
