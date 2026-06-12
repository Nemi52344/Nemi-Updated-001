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

const LARGER_LOGOS = ["Flipkart", "TVS Mobility", "Lamborghini", "Rapido", "Boeing", "Ashok Leyland"];

const LogoCard = ({ logo, set }: { logo: LogoEntry; set: number }) => {
  const isLarger = LARGER_LOGOS.includes(logo.label);
  return (
    <div
      key={logo.label + set}
      className="flex items-center justify-center shrink-0 rounded-lg sm:rounded-xl border backdrop-blur-sm w-[110px] h-[56px] sm:w-[190px] sm:h-[95px]"
      style={{
        background: "hsl(0 0% 100%)",
        borderColor: "hsl(0 0% 100% / 0.12)",
      }}
    >
      <img
        src={logo.src}
        alt={logo.label}
        title={logo.label}
        loading="lazy"
        decoding="async"
        className={isLarger ? "h-[36px] sm:h-[64px] max-w-[92px] sm:max-w-[160px]" : "h-[30px] sm:h-[52px] max-w-[86px] sm:max-w-[150px]"}
        style={{
          width: "auto",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

const TrustSignalSection = ({ scrollProgress }: TrustSignalSectionProps) => {
  // Industrial Partners. Originally the segment in Index.tsx didn't start
  // visiting this section until scrollProgress 0.975, so the user was dropped
  // in 75% of the way through the intro animation — looked like a flash.
  // Pushed enter window from 0.915-0.940 → 0.940-0.965 to follow the
  // (now stretched) Competitors section, and widened sectionVisible to match.
  // Must stay in sync with the matching SEGS entry in src/views/Index.tsx.
  // Entry begins right at SEGS-segment-5 boundary (0.935) so there's no
  // blink when crossing in.
  // Enter window synced to CompetitorsSection's exit (0.925 → 0.935) so the
  // crossfade has no blank moment. sectionVisible extends back to 0.925 so this
  // section is mounted during the crossfade — without it, Competitors and
  // TrustSignal would both be near-zero opacity for ~5% of total scroll.
  // Enter window synced to CompetitorsSection's exit (0.925 → 0.935). Tighter
  // 0.925 → 0.940 so this section reaches full opacity quickly after the
  // crossfade — earlier 0.925 → 0.955 left it at 0.63 opacity at raw 0.90.
  const sectionVisible = scrollProgress > 0.925 && scrollProgress < 0.996;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.925, 0.940));
  const exitP = easeOut(rangeProgress(scrollProgress, 0.993, 0.996));
  const opacity = Math.min(enterP, 1 - exitP);
  const slideVh = (1 - enterP) * 100 + exitP * -80;

  if (!sectionVisible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden trust-signal-inner"
      style={{ zIndex: 42, opacity, background: "hsl(230 25% 4%)", transform: `translateY(${slideVh}vh)` }}
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
          className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 sm:mb-10 md:mb-14 px-2"
          style={{
            opacity: enterP,
            transform: `translateY(${(1 - enterP) * 24}px)`,
          }}
        >
          Trusted by leading industrial companies
          <br className="hidden md:block" />
          {" "}
          - across aerospace, defense, automotive and industrial.
        </h2>

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
