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

// Curated list — exactly the 17 logos requested
const LOGOS: LogoEntry[] = [
  { src: "/Images/logos/abb.webp",             label: "ABB" },
  { src: "/Images/logos/caterpillar.webp",     label: "Caterpillar" },
  { src: "/Images/logos/boeing.webp",          label: "Boeing" },
  { src: "/Images/logos/ashok-leyland.webp",   label: "Ashok Leyland" },
  { src: "/Images/logos/samsung.webp",         label: "Samsung" },
  { src: "/Images/logos/tata.webp",            label: "Tata" },
  { src: "/Images/logos/lamborghini.webp",     label: "Lamborghini" },
  { src: "/Images/logos/ducati.webp",          label: "Ducati" },
  { src: "/Images/logos/mahindra.webp",        label: "Mahindra" },
  { src: "/Images/logos/exide.webp",           label: "Exide" },
  { src: "/Images/logos/whirlpool.webp",       label: "Whirlpool" },
  { src: "/Images/logos/funskool.png",         label: "Funskool" },
  { src: "/Images/logos/royal-enfield.webp",   label: "Royal Enfield" },
];

const LogoCell = ({ logo }: { logo: LogoEntry }) => (
  <div className="h-12 md:h-14 flex items-center justify-center px-4 md:px-6 shrink-0">
    <img
      src={logo.src}
      alt={logo.label}
      title={logo.label}
      decoding="async"
      loading="lazy"
      style={{
        maxHeight: "100%",
        maxWidth: "140px",
        width: "auto",
        objectFit: "contain",
        filter: "grayscale(1) brightness(1.3)",
        opacity: 0.78,
        transition: "filter 0.3s, opacity 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter =
          "grayscale(0) brightness(1) drop-shadow(0 0 12px hsl(275 80% 60% / 0.45))";
        e.currentTarget.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = "grayscale(1) brightness(1.3)";
        e.currentTarget.style.opacity = "0.78";
      }}
    />
  </div>
);

const TrustSignalSection = ({ scrollProgress }: TrustSignalSectionProps) => {
  // Section: 0.74–0.86
  const sectionVisible = scrollProgress > 0.735 && scrollProgress < 0.86;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.745, 0.78));
  const exitP = easeOut(rangeProgress(scrollProgress, 0.84, 0.86));
  const opacity = Math.min(enterP, 1 - exitP);

  if (!sectionVisible) return null;

  // Duplicate the list so the marquee can loop seamlessly
  const marqueeRow = [...LOGOS, ...LOGOS];

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
          <p className="text-[0.65rem] md:text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-4 md:mb-6">
            Industrial Partners
          </p>
        </div>

        {/* Headline */}
        <h2
          className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-10 md:mb-14"
          style={{
            opacity: enterP,
            transform: `translateY(${(1 - enterP) * 24}px)`,
            textShadow:
              "0 0 30px hsl(275 80% 60% / 0.4), 0 0 60px hsl(270 70% 50% / 0.2)",
          }}
        >
          Trusted by leading industrial companies
          <br className="hidden md:block" />
          {" "}
          &mdash; across aerospace, defense, automotive and industrial.
        </h2>

        {/* Scrolling marquee */}
        <div style={{ opacity: enterP }} className="w-full">
          <div
            className="relative rounded-2xl border overflow-hidden py-5 md:py-7"
            style={{
              borderColor: "hsl(275 30% 50% / 0.14)",
              background: "hsl(230 25% 7% / 0.55)",
              boxShadow: "0 1px 0 hsl(0 0% 100% / 0.03)",
            }}
          >
            {/* Edge fade-out masks (left + right) so logos slide into/out of frame smoothly */}
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-16 md:w-24 z-[2] pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, hsl(230 25% 4%) 0%, transparent 100%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-y-0 right-0 w-16 md:w-24 z-[2] pointer-events-none"
              style={{
                background:
                  "linear-gradient(to left, hsl(230 25% 4%) 0%, transparent 100%)",
              }}
            />

            <div
              className="trust-marquee-track flex items-center"
              style={{ width: "max-content" }}
            >
              {marqueeRow.map((logo, idx) => (
                <LogoCell key={`${logo.label}-${idx}`} logo={logo} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes trust-marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .trust-marquee-track {
          animation: trust-marquee-scroll 45s linear infinite;
          will-change: transform;
        }
        .trust-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .trust-marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default TrustSignalSection;
