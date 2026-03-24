import industryAerospace from "@/assets/industry-aerospace.png";
import industryAutomotive from "@/assets/industry-automotive.png";
import industryElectronics from "@/assets/industry-electronics.png";
import industryRobotics from "@/assets/industry-robotics.png";

interface IndustriesSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

interface Industry {
  name: string;
  image: string;
  colorHsl: string;
}

const industries: Industry[] = [
  { name: "Aerospace & Defense", image: industryAerospace, colorHsl: "210 85% 55%" },
  { name: "Automotive", image: industryAutomotive, colorHsl: "0 75% 55%" },
  { name: "Consumer Electronics", image: industryElectronics, colorHsl: "45 90% 50%" },
  { name: "Robotics & AI", image: industryRobotics, colorHsl: "275 80% 60%" },
];

const IndustriesSection = ({ scrollProgress }: IndustriesSectionProps) => {
  const sectionVisible = scrollProgress > 0.73 && scrollProgress < 0.85;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.75, 0.80));
  const exitP = easeOut(rangeProgress(scrollProgress, 0.81, 0.84));

  if (!sectionVisible) return null;

  const opacity = enterP * (1 - exitP);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 40, opacity, background: "hsl(230 25% 4%)" }}
    >
      <div className="max-w-5xl w-full mx-6">
        <div
          className="text-center mb-12"
          style={{ opacity: enterP, transform: `translateY(${(1 - enterP) * 30}px)` }}
        >
          <h2
            className="text-sm md:text-base tracking-[0.4em] uppercase text-muted-foreground mb-3"
            style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
          >
            Industries
          </h2>
          <h3
            className="text-2xl md:text-4xl font-bold text-foreground tracking-wider"
            style={{ textShadow: "0 0 20px hsl(275 80% 60% / 0.3)" }}
          >
            Trusted by industry leaders
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {industries.map((industry, i) => {
            const tileDelay = i * 0.06;
            const tileP = easeOut(Math.min(Math.max((enterP - tileDelay) / 0.5, 0), 1));

            return (
              <div
                key={industry.name}
                className="rounded-2xl border overflow-hidden flex flex-col transition-all duration-300"
                style={{
                  opacity: tileP,
                  transform: `translateY(${(1 - tileP) * 40}px)`,
                  borderColor: `hsl(${industry.colorHsl} / 0.25)`,
                  background: `hsl(230 25% 8%)`,
                  boxShadow: `0 4px 30px hsl(${industry.colorHsl} / 0.08)`,
                }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={industry.image}
                    alt={industry.name}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
                <div className="p-4 text-center">
                  <h4 className="text-sm md:text-base font-bold tracking-wider uppercase text-foreground">
                    {industry.name}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="text-center mt-10"
          style={{ opacity: enterP, transform: `translateY(${(1 - enterP) * 20}px)` }}
        >
          <h4 className="text-lg md:text-xl font-semibold text-foreground tracking-wide mb-2">
            Trusted by 36+ Enterprise Customers
          </h4>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Across Automotive, Defense, Industrial, and Consumer sectors, global leaders rely on NEMI's Physical AI platform to design, develop, and deploy complex hardware systems at scale.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndustriesSection;
