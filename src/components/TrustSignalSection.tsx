import { useState } from "react";

interface TrustSignalSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

type Sector = "aerospace" | "defence" | "automotive" | "industrial";

interface LogoEntry {
  src: string;
  label: string;
  sectors: Sector[];
}

interface LogoGroup {
  sector: Sector;
  label: string;
  logos: LogoEntry[];
}

// Logos grouped by primary sector. Matches the headline order:
// aerospace · defence · automotive · industrial.
const LOGO_GROUPS: LogoGroup[] = [
  {
    sector: "aerospace",
    label: "Aerospace",
    logos: [
      { src: "/Images/logos/boeing.webp", label: "Boeing", sectors: ["aerospace", "defence"] },
      { src: "/Images/logos/isro.webp", label: "ISRO", sectors: ["aerospace"] },
    ],
  },
  {
    sector: "defence",
    label: "Defence",
    logos: [
      { src: "/Images/logos/drdo.webp", label: "DRDO", sectors: ["defence"] },
      { src: "/Images/logos/brahmos.webp", label: "BrahMos", sectors: ["defence"] },
    ],
  },
  {
    sector: "automotive",
    label: "Automotive",
    logos: [
      { src: "/Images/logos/tata.webp", label: "Tata", sectors: ["automotive", "industrial"] },
      { src: "/Images/logos/mahindra.webp", label: "Mahindra", sectors: ["automotive", "industrial"] },
      { src: "/Images/logos/lamborghini.webp", label: "Lamborghini", sectors: ["automotive"] },
      { src: "/Images/logos/ducati.webp", label: "Ducati", sectors: ["automotive"] },
      { src: "/Images/logos/royal-enfield.webp", label: "Royal Enfield", sectors: ["automotive"] },
      { src: "/Images/logos/nissan.webp", label: "Nissan", sectors: ["automotive"] },
      { src: "/Images/logos/airbus.webp", label: "Airbus", sectors: ["automotive"] },
    ],
  },
  {
    sector: "industrial",
    label: "Industrial",
    logos: [
      { src: "/Images/logos/samsung.webp", label: "Samsung", sectors: ["industrial"] },
      { src: "/Images/logos/caterpillar.webp", label: "Caterpillar", sectors: ["industrial"] },
      { src: "/Images/logos/abb.webp", label: "ABB", sectors: ["industrial"] },
      { src: "/Images/logos/whirlpool.webp", label: "Whirlpool", sectors: ["industrial"] },
    ],
  },
];

const SectorWord = ({
  sector,
  hoveredSector,
  setHoveredSector,
  children,
}: {
  sector: Sector;
  hoveredSector: Sector | null;
  setHoveredSector: (s: Sector | null) => void;
  children: React.ReactNode;
}) => (
  <span
    className="cursor-pointer transition-colors duration-200"
    style={{
      color: hoveredSector === sector ? "hsl(275 80% 75%)" : undefined,
      textShadow:
        hoveredSector === sector
          ? "0 0 24px hsl(275 80% 60% / 0.7), 0 0 48px hsl(275 80% 60% / 0.3)"
          : undefined,
    }}
    onMouseEnter={() => setHoveredSector(sector)}
    onMouseLeave={() => setHoveredSector(null)}
  >
    {children}
  </span>
);

const TrustSignalSection = ({ scrollProgress }: TrustSignalSectionProps) => {
  const sectionVisible = scrollProgress > 0.875 && scrollProgress < 0.955;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.88, 0.905));
  const exitP = easeOut(rangeProgress(scrollProgress, 0.935, 0.955));
  const opacity = Math.min(enterP, 1 - exitP);

  const logosEnterP = easeOut(rangeProgress(scrollProgress, 0.895, 0.92));

  const [hoveredSector, setHoveredSector] = useState<Sector | null>(null);

  if (!sectionVisible) return null;

  const sw = (sector: Sector, label: string) => (
    <SectorWord sector={sector} hoveredSector={hoveredSector} setHoveredSector={setHoveredSector}>
      {label}
    </SectorWord>
  );

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

      <div className="relative z-[2] w-full max-w-6xl mx-auto px-6 md:px-12 py-8 text-center pointer-events-auto">
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
          Trusted across {sw("aerospace", "aerospace")},{" "}
          {sw("defence", "defence")},
          <br className="hidden md:block" />
          {" "}
          {sw("automotive", "automotive")}, and {sw("industrial", "industrial")}.
        </h2>

        {/* Logo wall — single bordered box, logos clustered by sector with subtle
            dividers between groups. Hovering a sector word brightens just that
            cluster while the others dim. */}
        <div style={{ opacity: enterP }} className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl border transition-all duration-300 px-5 md:px-8 py-5 md:py-7 flex items-center justify-center flex-wrap gap-x-8 md:gap-x-10 gap-y-4 md:gap-y-5"
            style={{
              borderColor:
                hoveredSector !== null
                  ? "hsl(275 80% 60% / 0.4)"
                  : "hsl(275 30% 50% / 0.14)",
              background: "hsl(230 25% 7% / 0.55)",
              boxShadow:
                hoveredSector !== null
                  ? "0 0 32px hsl(275 80% 60% / 0.18)"
                  : "0 1px 0 hsl(0 0% 100% / 0.03)",
            }}
          >
            {LOGO_GROUPS.map((g, gIdx) => {
              const isActive = hoveredSector === g.sector;
              const isDimmed = hoveredSector !== null && !isActive;
              return (
                <div key={g.sector} className="flex items-center">
                  {/* Cluster of logos for this sector */}
                  <div
                    className="flex items-center flex-wrap gap-x-6 md:gap-x-8 gap-y-3 transition-opacity duration-300"
                    style={{ opacity: isDimmed ? 0.25 : 1 }}
                  >
                    {g.logos.map((logo) => (
                      <img
                        key={logo.label}
                        src={logo.src}
                        alt={logo.label}
                        title={`${logo.label} — ${g.label}`}
                        decoding="async"
                        loading="lazy"
                        style={{
                          maxHeight: "32px",
                          maxWidth: "120px",
                          width: "auto",
                          objectFit: "contain",
                          filter: isActive
                            ? "grayscale(0) brightness(1) drop-shadow(0 0 12px hsl(275 80% 60% / 0.45))"
                            : "grayscale(1) brightness(1.3)",
                          opacity: isActive ? 1 : 0.75,
                          transition: "filter 0.3s, opacity 0.3s",
                        }}
                        className="md:!max-h-10"
                      />
                    ))}
                  </div>
                  {/* Divider between clusters (not after the last one) */}
                  {gIdx < LOGO_GROUPS.length - 1 && (
                    <div
                      aria-hidden
                      className="mx-4 md:mx-5 h-8 md:h-10 w-px"
                      style={{ background: "hsl(275 30% 50% / 0.18)" }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignalSection;
