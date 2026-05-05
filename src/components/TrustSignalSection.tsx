import { useState } from "react";

interface TrustSignalSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

type Sector = "aerospace" | "defense" | "automotive" | "industrial";

interface LogoEntry {
  src: string;
  label: string;
  sectorLabel: string; // primary sector for the title attribute
  sectors: Sector[];
}

// Single flat list, ordered by sector so the grid reads aerospace → defense →
// automotive → industrial, but rendered in a uniform grid for clean alignment.
const LOGOS: LogoEntry[] = [
  // Aerospace
  { src: "/Images/logos/boeing.webp", label: "Boeing", sectorLabel: "Aerospace", sectors: ["aerospace", "defense"] },
  { src: "/Images/logos/isro.webp", label: "ISRO", sectorLabel: "Aerospace", sectors: ["aerospace"] },
  // Defense
  { src: "/Images/logos/drdo.webp", label: "DRDO", sectorLabel: "Defense", sectors: ["defense"] },
  { src: "/Images/logos/brahmos.webp", label: "BrahMos", sectorLabel: "Defense", sectors: ["defense"] },
  { src: "/Images/logos/bharat-dynamics.webp", label: "Bharat Dynamics", sectorLabel: "Defense", sectors: ["defense"] },
  // Automotive
  { src: "/Images/logos/tata.webp", label: "Tata", sectorLabel: "Automotive", sectors: ["automotive", "industrial"] },
  { src: "/Images/logos/mahindra.webp", label: "Mahindra", sectorLabel: "Automotive", sectors: ["automotive", "industrial"] },
  { src: "/Images/logos/ashok-leyland.webp", label: "Ashok Leyland", sectorLabel: "Automotive", sectors: ["automotive"] },
  { src: "/Images/logos/lamborghini.webp", label: "Lamborghini", sectorLabel: "Automotive", sectors: ["automotive"] },
  { src: "/Images/logos/ducati.webp", label: "Ducati", sectorLabel: "Automotive", sectors: ["automotive"] },
  { src: "/Images/logos/royal-enfield.webp", label: "Royal Enfield", sectorLabel: "Automotive", sectors: ["automotive"] },
  { src: "/Images/logos/nissan.webp", label: "Nissan", sectorLabel: "Automotive", sectors: ["automotive"] },
  { src: "/Images/logos/musashi.webp", label: "Musashi", sectorLabel: "Automotive", sectors: ["automotive"] },
  { src: "/Images/logos/tvs-mobility.webp", label: "TVS Mobility", sectorLabel: "Automotive", sectors: ["automotive"] },
  { src: "/Images/logos/airbus.webp", label: "Airbus", sectorLabel: "Automotive", sectors: ["automotive"] },
  // Industrial
  { src: "/Images/logos/samsung.webp", label: "Samsung", sectorLabel: "Industrial", sectors: ["industrial"] },
  { src: "/Images/logos/caterpillar.webp", label: "Caterpillar", sectorLabel: "Industrial", sectors: ["industrial"] },
  { src: "/Images/logos/abb.webp", label: "ABB", sectorLabel: "Industrial", sectors: ["industrial"] },
  { src: "/Images/logos/whirlpool.webp", label: "Whirlpool", sectorLabel: "Industrial", sectors: ["industrial"] },
  { src: "/Images/logos/exide.webp", label: "Exide", sectorLabel: "Industrial", sectors: ["industrial"] },
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
  // Section: 0.74–0.85 (moved up to fill the gap left by hidden Industries +
  // CaseStudy sections, sits right after Competitors and before CTA).
  const sectionVisible = scrollProgress > 0.735 && scrollProgress < 0.86;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.745, 0.78));
  const exitP = easeOut(rangeProgress(scrollProgress, 0.84, 0.86));
  const opacity = Math.min(enterP, 1 - exitP);

  const logosEnterP = easeOut(rangeProgress(scrollProgress, 0.76, 0.79));

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
            Industrial Partners
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
          Trusted by leading industrial companies
          <br className="hidden md:block" />
          {" "}
          &mdash; across {sw("aerospace", "aerospace")},{" "}
          {sw("defense", "defense")}, {sw("automotive", "automotive")} and{" "}
          {sw("industrial", "industrial")}.
        </h2>

        {/* Logo wall — uniform grid so every logo sits in an equal-width cell of
            equal height. Hovering a sector word in the headline lights up the
            logos that belong to that sector and dims the rest. */}
        <div style={{ opacity: enterP }} className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl border transition-all duration-300 px-5 md:px-8 py-5 md:py-7"
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
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-4 md:gap-x-6 gap-y-5 md:gap-y-6 items-center justify-items-center">
              {LOGOS.map((logo) => {
                const isActive =
                  hoveredSector !== null && logo.sectors.includes(hoveredSector);
                const isDimmed = hoveredSector !== null && !isActive;
                return (
                  <div
                    key={logo.label}
                    className="h-10 md:h-12 w-full flex items-center justify-center transition-opacity duration-300"
                    style={{ opacity: isDimmed ? 0.25 : 1 }}
                  >
                    <img
                      src={logo.src}
                      alt={logo.label}
                      title={`${logo.label} — ${logo.sectorLabel}`}
                      decoding="async"
                      loading="lazy"
                      style={{
                        maxHeight: "100%",
                        maxWidth: "120px",
                        width: "auto",
                        objectFit: "contain",
                        filter: isActive
                          ? "grayscale(0) brightness(1) drop-shadow(0 0 12px hsl(275 80% 60% / 0.45))"
                          : "grayscale(1) brightness(1.3)",
                        opacity: isActive ? 1 : 0.75,
                        transition: "filter 0.3s, opacity 0.3s",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignalSection;
