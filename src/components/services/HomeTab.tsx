import factory1 from "@/assets/factory-1.webp";
import { ScrollReveal } from "@/hooks/ScrollReveal";

interface HomeTabProps {
  onTabChange?: (tab: string) => void;
}

const HomeTab = ({ onTabChange }: HomeTabProps) => {
  const previewCards = [
    {
      name: "AKIO",
      sub: "Design & Engineering",
      desc: "AI-assisted design stack for faster concept visualization, rapid iterations, and cost-efficient engineering from idea to production-ready design.",
      colorHsl: "0 72% 52%",
      tab: "akio",
    },
    {
      name: "HENRY",
      sub: "Manufacturing & Production",
      desc: "AI-driven manufacturing ecosystem enabling faster production ramp-up, reduced supply chain complexity, and lower costs tightly connected with design.",
      colorHsl: "217 91% 60%",
      tab: "henry",
    },
    {
      name: "SAM",
      sub: "Deployment & Lifecycle",
      desc: "Product deployment, fleet operations, and real-world performance monitoring, creating a continuous feedback loop that improves future designs.",
      colorHsl: "142 71% 45%",
      tab: "sam",
    },
  ];

  const loopSteps = [
    { icon: "AKIO", label: "Design", colorClass: "text-[hsl(0,72%,52%)]", borderClass: "border-[hsl(0,72%,52%,0.3)]" },
    { icon: "HENRY", label: "Manufacture", colorClass: "text-[hsl(217,91%,60%)]", borderClass: "border-[hsl(217,91%,60%,0.3)]" },
    { icon: "SAM", label: "Deploy", colorClass: "text-[hsl(142,71%,45%)]", borderClass: "border-[hsl(142,71%,45%,0.3)]" },
    { icon: "DATA", label: "Collect", colorClass: "text-foreground", borderClass: "border-border" },
    { icon: "IMPROVE", label: "Iterate", colorClass: "text-accent", borderClass: "border-accent/30" },
  ];

  return (
    <div className="text-foreground">
      {/* HERO */}
      <section
        className="services-tab-hero-grid min-h-screen grid grid-cols-1 md:grid-cols-2 relative overflow-hidden"
        style={{ paddingTop: 64 }}
      >
        <div className="services-tab-hero-left flex flex-col justify-center py-12 relative z-[2]">
          <div className="max-w-3xl ml-auto w-full px-6 md:px-10 lg:px-16">
            <ScrollReveal delay={100}>
              <h1
                className="font-extrabold uppercase leading-[0.95] tracking-tight mb-8"
                style={{ fontSize: "clamp(2.5rem, 4.5vw, 5rem)" }}
              >
                <span className="text-accent">D</span>
                <span className="text-foreground">esign.</span>
                <br />
                <span className="text-accent">D</span>
                <span className="text-foreground">evelop.</span>
                <br />
                <span className="text-accent">D</span>
                <span className="text-foreground">istribute.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p className="text-sm md:text-lg leading-[1.8] text-muted-foreground max-w-[480px] tracking-wide">
                Nemi combines advanced manufacturing with AI driven automation to
                design, develop and distribute products faster, cheaper, and more
                reliably, all under one roof.
              </p>
            </ScrollReveal>
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div
            className="absolute left-0 top-0 bottom-0 w-1 z-[2]"
            style={{ background: "linear-gradient(to bottom, hsl(var(--accent)), transparent)" }}
          />
          <div className="w-full h-full relative">
            <div
              className="absolute inset-0 z-[1] pointer-events-none"
              style={{ background: "linear-gradient(to right, hsl(var(--background) / 0.55), transparent)" }}
            />
            <img
              src={factory1}
              alt="NEMI Facility"
              className="w-full h-full object-cover opacity-75 block hover:scale-105"
              style={{ transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }} decoding="async"
            />
          </div>
        </div>
      </section>

      {/* OUR SERVICES HEADING */}
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal className="pt-20 pb-6">
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-accent mb-3 font-bold">
            Our Services
          </p>
          <h2
            className="font-bold uppercase tracking-wider"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
          >
            Three Systems.
            <br />
            One Ecosystem.
          </h2>
        </ScrollReveal>

        {/* PREVIEW CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 mt-8">
          {previewCards.map((card, i) => (
            <ScrollReveal key={card.name} delay={i * 150}>
              <ServiceCard card={card} onClick={() => onTabChange?.(card.tab)} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* FEEDBACK LOOP */}
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal className="py-24 text-center">
          <h2
            className="font-bold uppercase mb-4 tracking-wider"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)" }}
          >
            The NEMI Feedback Loop
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg mb-16 max-w-[520px] mx-auto leading-[1.8] tracking-wide">
            Real-world data continuously improves future product design and
            manufacturing across the full lifecycle.
          </p>
          <div className="flex items-center justify-center gap-0 flex-wrap">
            {loopSteps.map((step, i) => (
              <ScrollReveal key={step.icon} delay={i * 120} className="flex items-center">
                <div className={`p-6 border ${step.borderClass} min-w-[140px] text-center`}>
                  <div
                    className={`font-bold text-xl mb-1 tracking-wider uppercase ${step.colorClass}`}
                  >
                    {step.icon}
                  </div>
                  <div className="font-semibold text-xs tracking-[0.2em] uppercase text-muted-foreground">
                    {step.label}
                  </div>
                </div>
                {i < loopSteps.length - 1 && (
                  <span className="text-xl text-foreground/15 px-2">→</span>
                )}
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

/* ── Service Card, no flip, shows all content ── */
interface CardData {
  name: string;
  sub: string;
  desc: string;
  colorHsl: string;
  tab: string;
  
}

const ServiceCard = ({ card, onClick }: { card: CardData; onClick: () => void }) => (
  <div
    className="w-full cursor-pointer group transition-all duration-500 rounded-2xl overflow-hidden border flex flex-col justify-between p-8 h-full"
    style={{
      minHeight: 260,
      borderColor: `hsl(${card.colorHsl} / 0.3)`,
      boxShadow: `0 0 20px hsl(${card.colorHsl} / 0.1), 0 4px 20px hsl(230 25% 4% / 0.4)`,
      background: `linear-gradient(135deg, hsl(${card.colorHsl} / 0.08), hsl(var(--card) / 0.7))`,
    }}
    onClick={onClick}
  >
    <div>
      <div
        className="font-bold text-3xl uppercase tracking-wider mb-1"
        style={{ color: `hsl(${card.colorHsl})` }}
      >
        {card.name}
      </div>
      <div className="font-semibold text-xs tracking-[0.2em] uppercase text-muted-foreground mb-5">
        {card.sub}
      </div>
      <p className="text-sm md:text-base text-muted-foreground leading-[1.7] tracking-wide">
        {card.desc}
      </p>
    </div>
    <span
      className="font-bold text-xs tracking-[0.15em] uppercase inline-flex items-center gap-1 mt-6 group-hover:gap-2 transition-all duration-300"
      style={{ color: `hsl(${card.colorHsl})` }}
    >
      Explore {card.name} →
    </span>
  </div>
);

export default HomeTab;
