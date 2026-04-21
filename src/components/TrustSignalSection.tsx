interface TrustSignalSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

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

  const logosEnterP = easeOut(rangeProgress(scrollProgress, 0.895, 0.92));

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

      <div className="relative z-[2] w-full max-w-6xl mx-auto px-6 md:px-12 py-8 text-center">
        {/* Kicker */}
        <div
          style={{
            opacity: enterP,
            transform: `translateY(${(1 - enterP) * 16}px)`,
          }}
        >
          <p className="text-[0.65rem] md:text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-4 md:mb-6">
            Industry partners
          </p>
        </div>

        {/* Headline */}
        <h2
          className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-12 md:mb-16"
          style={{
            opacity: enterP,
            transform: `translateY(${(1 - enterP) * 24}px)`,
            textShadow: "0 0 30px hsl(275 80% 60% / 0.4), 0 0 60px hsl(270 70% 50% / 0.2)",
          }}
        >
          Trusted across aerospace, defence,
          <br className="hidden md:block" />
          <span className="text-muted-foreground/90 font-light"> automotive, and industrial.</span>
        </h2>

        {/* Logo wall */}
        <div
          style={{
            opacity: logosEnterP,
            transform: `translateY(${(1 - logosEnterP) * 20}px)`,
          }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-8 md:gap-x-14 gap-y-6 max-w-5xl mx-auto">
            {LOGOS.map((logo) => (
              <img
                key={logo.label}
                src={logo.src}
                alt={logo.label}
                title={logo.label}
                decoding="async"
                loading="eager"
                style={{
                  height: "36px",
                  width: "auto",
                  maxWidth: "120px",
                  objectFit: "contain",
                  opacity: 0.7,
                  filter: "grayscale(1) brightness(1.3)",
                  transition: "opacity 0.3s, filter 0.3s",
                }}
                className="md:!h-12 pointer-events-auto hover:!opacity-100 hover:!grayscale-0"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignalSection;
