interface TrustSignalSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

interface LogoEntry {
  src: string;
  label: string;
}

const ROW1: LogoEntry[] = [
  { src: "/Images/logos/samsung.webp",       label: "Samsung" },
  { src: "/Images/logos/tata.webp",          label: "Tata" },
  { src: "/Images/logos/lamborghini.webp",   label: "Lamborghini" },
  { src: "/Images/logos/whirlpool.webp",     label: "Whirlpool" },
  { src: "/Images/logos/abb.webp",           label: "ABB" },
  { src: "/Images/logos/caterpillar.webp",   label: "Caterpillar" },
  { src: "/Images/logos/boeing.webp",        label: "Boeing" },
  { src: "/Images/logos/ashok-leyland.webp", label: "Ashok Leyland" },
];

const ROW2: LogoEntry[] = [
  { src: "/Images/logos/royal-enfield.webp", label: "Royal Enfield" },
  { src: "/Images/logos/exide.webp",         label: "Exide" },
  { src: "/Images/logos/flipkart.webp",      label: "Flipkart" },
  { src: "/Images/logos/zomato.webp",        label: "Zomato" },
  { src: "/Images/logos/rapido.webp",        label: "Rapido" },
  { src: "/Images/logos/tvs-mobility.webp",  label: "TVS Mobility" },
  { src: "/Images/logos/mahindra.webp",      label: "Mahindra" },
  { src: "/Images/logos/ducati.webp",        label: "Ducati" },
];

const LogoCard = ({ logo, set }: { logo: LogoEntry; set: number }) => (
  <div
    key={logo.label + set}
    className="flex items-center justify-center shrink-0 rounded-xl border border-border/30 bg-card/50 backdrop-blur-sm"
    style={{ width: "160px", height: "80px" }}
  >
    <img
      src={logo.src}
      alt={logo.label}
      title={logo.label}
      loading="lazy"
      decoding="async"
      style={{ height: "40px", width: "auto", maxWidth: "120px", objectFit: "contain" }}
    />
  </div>
);

const TrustSignalSection = ({ scrollProgress }: TrustSignalSectionProps) => {
  // Section: 0.975–0.992 (compressed)
  const sectionVisible = scrollProgress > 0.973 && scrollProgress < 0.992;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.976, 0.984));
  const exitP = easeOut(rangeProgress(scrollProgress, 0.988, 0.992));
  const opacity = Math.min(enterP, 1 - exitP);

  if (!sectionVisible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      style={{ zIndex: 42, opacity, background: "hsl(230 25% 4%)" }}
      aria-label="Trusted by industry leaders"
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

      <div className="relative z-[2] w-full max-w-7xl mx-auto px-4 md:px-8 py-8 text-center pointer-events-auto">
        {/* Kicker */}
        <div
          style={{
            opacity: enterP,
            transform: `translateY(${(1 - enterP) * 16}px)`,
          }}
        >
          <p className="text-[0.65rem] md:text-xs tracking-[0.4em] uppercase text-muted-foreground font-semibold mb-4 md:mb-6">
            Industrial Partners
          </p>
        </div>

        {/* Headline */}
        <h2
          className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4"
          style={{
            opacity: enterP,
            transform: `translateY(${(1 - enterP) * 24}px)`,
            textShadow:
              "0 0 30px hsl(275 80% 60% / 0.4), 0 0 60px hsl(270 70% 50% / 0.2)",
          }}
        >
          Trusted Across Aerospace, Automotive, Defense, and Industrial Manufacturing
        </h2>
        <p
          className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-4xl mx-auto text-center mb-10 md:mb-14"
          style={{
            opacity: enterP,
            transform: `translateY(${(1 - enterP) * 24}px)`,
          }}
        >
          Industrial leaders leveraging NEMI&rsquo;s manufacturing intelligence infrastructure across production, automation, and supply chain operations.
        </p>

        {/* Two-row counter-scrolling logo cards */}
        <div style={{ opacity: enterP }} className="w-full space-y-3 md:space-y-4">
          {/* Row 1 - scrolls left */}
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div className="flex" style={{ animation: "partner-scroll-left 40s linear infinite", willChange: "transform" }}>
              {[0, 1].map((set) => (
                <div key={set} className="flex items-center gap-3 md:gap-4 shrink-0 pr-3 md:pr-4" aria-hidden={set === 1 ? true : undefined}>
                  {ROW1.map((logo) => (
                    <LogoCard key={logo.label + set} logo={logo} set={set} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - scrolls right */}
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div className="flex" style={{ animation: "partner-scroll-right 38s linear infinite", willChange: "transform" }}>
              {[0, 1].map((set) => (
                <div key={set} className="flex items-center gap-3 md:gap-4 shrink-0 pr-3 md:pr-4" aria-hidden={set === 1 ? true : undefined}>
                  {ROW2.map((logo) => (
                    <LogoCard key={logo.label + set} logo={logo} set={set} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignalSection;
