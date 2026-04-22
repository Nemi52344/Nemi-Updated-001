interface ApproachSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

interface ApproachItem {
  title: string;
  description: string;
  colorHsl: string;
}

const approachItems: ApproachItem[] = [
  {
    title: "In-house EV Test Bed",
    description:
      "Our dedicated electric vehicle test bed serves as a living laboratory, validating AI-driven manufacturing processes in real-world conditions at full production scale.",
    colorHsl: "275 80% 60%",
  },
  {
    title: "Services for Various Industries",
    description:
      "From aerospace to consumer electronics, our Physical AI platform adapts to diverse manufacturing verticals, delivering precision, speed, and intelligence across sectors.",
    colorHsl: "220 85% 60%",
  },
  {
    title: "Product",
    description:
      "Our flagship manufacturing intelligence suite, a turnkey solution that transforms traditional production lines into autonomous, self-optimizing smart factories.",
    colorHsl: "145 75% 50%",
  },
];

const ApproachSection = ({ scrollProgress }: ApproachSectionProps) => {
  // Section: 0.33–0.38
  const sectionVisible = scrollProgress > 0.325 && scrollProgress < 0.385;

  const titleP = easeOut(rangeProgress(scrollProgress, 0.335, 0.345));
  const titleExitP = easeOut(rangeProgress(scrollProgress, 0.365, 0.375));
  const titleOpacity = titleP * (1 - titleExitP);

  const item0P = easeOut(rangeProgress(scrollProgress, 0.345, 0.355));
  const item1P = easeOut(rangeProgress(scrollProgress, 0.35, 0.36));
  const item2P = easeOut(rangeProgress(scrollProgress, 0.355, 0.365));
  const itemExitP = easeOut(rangeProgress(scrollProgress, 0.37, 0.378));

  const itemProgresses = [item0P, item1P, item2P];

  if (!sectionVisible) return null;

  return (
    <>
      {/* Title */}
      <div
        className="fixed inset-x-0 pointer-events-none flex justify-center"
        style={{
          zIndex: 35,
          top: "8%",
          opacity: titleOpacity,
          transform: `translateY(${(1 - titleP) * 30}px)`,
        }}
      >
        <h2
          className="text-sm md:text-base tracking-[0.4em] uppercase text-muted-foreground"
          style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
        >
          Our Approach
        </h2>
      </div>

      {/* Three items */}
      <div
        className="fixed inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 35 }}
      >
        <div className="flex flex-col md:flex-row items-stretch gap-5 md:gap-6 max-w-6xl mx-6">
          {approachItems.map((item, i) => {
            const p = itemProgresses[i];
            const opacity = p * (1 - itemExitP);
            const translateX = (1 - p) * 80;

            return (
              <div
                key={item.title}
                className="flex flex-col items-center text-center rounded-2xl border backdrop-blur-sm flex-1 overflow-hidden pointer-events-auto"
                style={{
                  opacity,
                  transform: `translateX(${translateX}px)`,
                  borderColor: `hsl(${item.colorHsl} / 0.25)`,
                  background: `linear-gradient(160deg, hsl(${item.colorHsl} / 0.06), hsl(var(--card) / 0.8))`,
                  boxShadow: `0 0 30px hsl(${item.colorHsl} / 0.08), 0 4px 20px hsl(230 25% 4% / 0.5)`,
                }}
              >
                <div
                  className="w-full aspect-video relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, hsl(${item.colorHsl} / 0.12), hsl(var(--secondary)))`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center"
                      style={{
                        borderColor: `hsl(${item.colorHsl} / 0.4)`,
                        background: `hsl(${item.colorHsl} / 0.1)`,
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-5 h-5 md:w-6 md:h-6"
                        style={{ color: `hsl(${item.colorHsl})` }}
                      >
                        <path d="M8 5.14v14l11-7-11-7z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg, transparent 60%, hsl(var(--card) / 0.6))`,
                    }}
                  />
                </div>
                <div className="p-5 md:p-6">
                  <h3
                    className="text-lg md:text-xl font-semibold text-foreground tracking-wider mb-2"
                    style={{
                      textShadow: `0 0 12px hsl(${item.colorHsl} / 0.4)`,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ApproachSection;
