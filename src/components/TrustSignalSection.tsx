interface TrustSignalSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const KPIS: { value: string; label: string; accent: string; long?: boolean }[] = [
  { value: "$15M", label: "ARR", accent: "275 80% 60%" },
  { value: "36+", label: "Enterprise Customers", accent: "220 85% 60%" },
  { value: "90%+", label: "Gross Retention", accent: "142 71% 50%" },
  { value: "AS9100D", label: "Aerospace Certified", accent: "0 72% 58%", long: true },
];

const LOGOS = [
  { src: "/Images/logos/samsung.webp", label: "Samsung" },
  { src: "/Images/logos/tata.webp", label: "Tata" },
  { src: "/Images/logos/lamborghini.webp", label: "Lamborghini" },
  { src: "/Images/logos/boeing.webp", label: "Boeing" },
  { src: "/Images/logos/isro.webp", label: "ISRO" },
  { src: "/Images/logos/drdo.webp", label: "DRDO" },
  { src: "/Images/logos/royal-enfield.webp", label: "Royal Enfield" },
  { src: "/Images/logos/mahindra.webp", label: "Mahindra" },
  { src: "/Images/logos/ducati.webp", label: "Ducati" },
];

const TrustSignalSection = ({ scrollProgress }: TrustSignalSectionProps) => {
  const sectionVisible = scrollProgress > 0.875 && scrollProgress < 0.955;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.88, 0.905));
  const exitP = easeOut(rangeProgress(scrollProgress, 0.935, 0.955));
  const opacity = Math.min(enterP, 1 - exitP);

  // Staggered card entrance
  const cardsEnterP = easeOut(rangeProgress(scrollProgress, 0.885, 0.915));
  const logosEnterP = easeOut(rangeProgress(scrollProgress, 0.905, 0.93));

  if (!sectionVisible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      style={{ zIndex: 42, opacity, background: "hsl(230 25% 4%)" }}
      aria-label="NEMI traction and trusted customers"
    >
      {/* Purple nebula glow backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 40%, hsl(275 80% 40% / 0.18) 0%, transparent 65%),
            radial-gradient(ellipse 80% 60% at 50% 70%, hsl(260 70% 30% / 0.10) 0%, transparent 70%)
          `,
        }}
      />

      <div className="relative z-[2] w-full max-w-6xl mx-auto px-6 md:px-12 py-8">
        {/* Kicker */}
        <div
          className="text-center mb-3 md:mb-4"
          style={{
            opacity: enterP,
            transform: `translateY(${(1 - enterP) * 16}px)`,
          }}
        >
          <p className="text-[0.65rem] md:text-xs tracking-[0.3em] uppercase text-primary font-semibold">
            By the numbers
          </p>
        </div>

        {/* Headline */}
        <h2
          className="text-center text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-10 md:mb-14"
          style={{
            opacity: enterP,
            transform: `translateY(${(1 - enterP) * 24}px)`,
            textShadow: "0 0 30px hsl(275 80% 60% / 0.4), 0 0 60px hsl(270 70% 50% / 0.2)",
          }}
        >
          Production, not pilots.
          <br className="hidden md:block" />
          <span className="text-muted-foreground/90 font-light"> Proof, not promises.</span>
        </h2>

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mb-10 md:mb-14">
          {KPIS.map((kpi, i) => {
            const cardDelay = i * 0.12;
            const cardP = easeOut(Math.min(Math.max((cardsEnterP - cardDelay) / 0.6, 0), 1));
            return (
              <div
                key={kpi.label}
                className="relative rounded-xl md:rounded-2xl overflow-hidden"
                style={{
                  opacity: cardP,
                  transform: `translateY(${(1 - cardP) * 30}px) scale(${0.96 + 0.04 * cardP})`,
                  background:
                    "linear-gradient(145deg, hsl(230 20% 8% / 0.85), hsl(230 25% 6% / 0.70))",
                  border: `1px solid hsl(${kpi.accent} / 0.22)`,
                  boxShadow: `
                    0 0 30px hsl(${kpi.accent} / 0.12),
                    inset 0 1px 0 hsl(${kpi.accent} / 0.20)
                  `,
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, hsl(${kpi.accent}), transparent)`,
                  }}
                />
                <div className="px-4 py-6 md:px-6 md:py-8 text-center flex flex-col items-center justify-center min-h-[120px] md:min-h-[150px]">
                  <p
                    className={
                      "font-extrabold tracking-tight mb-1 whitespace-nowrap leading-none " +
                      (kpi.long
                        ? "text-2xl md:text-3xl lg:text-[2.5rem]"
                        : "text-3xl md:text-5xl lg:text-6xl")
                    }
                    style={{
                      color: `hsl(${kpi.accent})`,
                      textShadow: `0 0 20px hsl(${kpi.accent} / 0.45)`,
                    }}
                  >
                    {kpi.value}
                  </p>
                  <p className="text-[0.6rem] md:text-xs tracking-[0.18em] uppercase text-muted-foreground font-semibold">
                    {kpi.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Logo wall */}
        <div
          style={{
            opacity: logosEnterP,
            transform: `translateY(${(1 - logosEnterP) * 20}px)`,
          }}
        >
          <p className="text-center text-[0.6rem] md:text-[0.65rem] tracking-[0.3em] uppercase text-muted-foreground/60 font-semibold mb-5 md:mb-7">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 md:gap-x-10 gap-y-4">
            {LOGOS.map((logo) => (
              <img
                key={logo.label}
                src={logo.src}
                alt={logo.label}
                title={logo.label}
                decoding="async"
                loading="eager"
                style={{
                  height: "32px",
                  width: "auto",
                  maxWidth: "110px",
                  objectFit: "contain",
                  opacity: 0.65,
                  filter: "grayscale(1) brightness(1.3)",
                  transition: "opacity 0.3s, filter 0.3s",
                }}
                className="md:!h-10 pointer-events-auto hover:!opacity-100 hover:!grayscale-0"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignalSection;
