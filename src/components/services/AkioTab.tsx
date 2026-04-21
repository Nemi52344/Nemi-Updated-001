const akio = "hsl(0, 72%, 52%)";

import { CaseStudy } from "./CaseStudy";
import { ScrollReveal } from "@/hooks/ScrollReveal";
import droneFull from "@/assets/drone-full.webp";
import { useVideoAutoplay } from "@/hooks/useVideoAutoplay";

const services = [
  { title: "Product Design", desc: "Rapidly design and engineer your products.", img: "/Images/Design%20and%20Development.webp" },
  { title: "Component Design", desc: "Design specific components (e.g., battery, electronics) that go into your products.", img: "/Images/Parts%20Manufacturing.webp" },
  { title: "Prototyping & Validation", desc: "Physically build out or simulate and validate your design before production.", img: "/Images/Validation.webp" },
];

const AkioTab = () => {
  const akioVideoRef = useVideoAutoplay();
  return (
  <div>
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
              <span style={{ color: akio }}>Design.</span><br />
              <span className="text-foreground">Develop.</span><br />
              <span className="text-foreground">Distribute.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <p className="text-muted-foreground text-sm md:text-lg leading-[1.8] max-w-[480px] tracking-wide">
              From idea to production-ready design — in weeks, not months.
            </p>
          </ScrollReveal>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 w-1 z-[2]"
          style={{ background: `linear-gradient(to bottom, ${akio}, transparent)` }}
        />
        <div className="w-full h-full relative">
          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{ background: "linear-gradient(to right, hsl(var(--background) / 0.55), transparent)" }}
          />
          <img
            src="/Images/AKIO.webp"
            alt="AKIO"
            className="w-full h-full object-cover opacity-75 block hover:scale-105"
            style={{ transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }} decoding="async"
          />
        </div>
      </div>
    </section>

    <div className="px-6 md:px-12 lg:px-16">



      {/* PRODUCT HERO */}
      <ScrollReveal>
        <section className="services-tab-hero-grid grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch pt-16 pb-8">
          <div className="flex flex-col justify-center">
            <div className="font-bold text-5xl md:text-6xl lg:text-7xl uppercase tracking-wider mb-2" style={{ color: akio }}>AKIO</div>
            <div className="font-semibold text-muted-foreground text-base md:text-xl uppercase tracking-wider mb-6">Design Intelligence Suite</div>
            <p className="text-muted-foreground text-sm md:text-base leading-[1.8] mb-8 max-w-[500px] tracking-wide">
              Tell us what you need built. AKIO's AI-driven design engine handles the engineering — CAD, simulation, prototyping — so you get a validated, production-ready design without the 6-month wait or the $200k bill.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem", padding: 0 }}>
              {["Concept visualization in hours instead of months", "Faster iterations for every design feedback cycle", "Reduced engineering effort and cost", "Integrates prototyping, simulation & PLM"].map((b) => (
                <li key={b} className="text-muted-foreground text-sm tracking-wide" style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem" }}>
                  <span className="font-bold text-xs shrink-0 mt-0.5" style={{ color: akio }}>→</span>{b}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-stretch">
            <ScrollReveal variant="scale" repeat delay={100} className="w-full flex">
              <div className="bg-card rounded-lg overflow-hidden w-full flex" style={{ borderTop: `2px solid ${akio}` }}>
                <video
                  ref={akioVideoRef}
                  src="/videos/Akio%201%20Minute%20Updated.mp4"
                  controls
                  muted
                  playsInline
                  preload="none"
                  poster="/Images/AKIO.webp"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>
      </ScrollReveal>

      {/* SERVICES GRID */}
      <div className="services-grid-wrapper pb-10 pt-4">
        <ScrollReveal>
          <p className="font-bold text-xl md:text-2xl tracking-wider uppercase mb-10" style={{ color: akio }}>AKIO Services</p>
        </ScrollReveal>
        <div className="services-card-grid border border-border" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "hsl(var(--border))" }}>
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 120}>
              <div className="bg-background hover:bg-card transition-colors duration-300 cursor-default h-full" style={{ padding: "2rem" }}>
                <div className="bg-card" style={{ height: 140, marginBottom: "1.5rem", overflow: "hidden", borderLeft: `2px solid ${akio}`, padding: 0 }}>
                  <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.65, transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }} className="hover:scale-105" decoding="async" />
                </div>
                <div style={{ width: "3rem", height: 2, background: akio, marginBottom: "1.2rem" }} />
                <h3 className="text-foreground font-bold text-base md:text-lg tracking-wider uppercase mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-[1.7] tracking-wide">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* CASE STUDIES */}
      <ScrollReveal className="pt-10 pb-8">
        <div style={{ display: "inline-block" }}>
          <p className="text-foreground font-bold text-xs tracking-[0.25em] uppercase mb-2">Case Studies — AKIO</p>
          <div style={{ height: 2, background: akio, width: "100%" }} />
        </div>
      </ScrollReveal>
    </div>

    <ScrollReveal>
      <CaseStudy
        title="Refrigerator Design<br/>for Coffee Machine"
        context="Coffee machine manufacturer requested support to design refrigerator for storing milk."
        outcome="Design completed in 1 week, prototype delivered within 2 months."
        color={akio}
        imageSrc="/Images/Refrigerator.webp"
        imageAlt="Coffee Machine"
        metrics={[
          { label: "Design time", before: "6 months", after: "1 month", barPercent: 17, color: akio },
          { label: "Design cost", before: "Baseline", after: "1/10th", barPercent: 10, color: akio },
        ]}
      />
    </ScrollReveal>

    <ScrollReveal>
      <CaseStudy
        title="Drone Components Design,<br/>Prototyping & Validation"
        context="Due to issues with existing suppliers, customer requested rapid design, prototyping and validation of key drone powertrain components — Battery, Motor, and ESC."
        outcome="Delivered validated prototypes for the battery pack, motor, and ESC, ready for mass production."
        color={akio}
        imageSrc={droneFull}
        imageAlt="Drone Components"
        imageFirst={false}
        metrics={[
          { label: "Design time", before: "12 months", after: "6 months", barPercent: 50, color: akio },
          { label: "Design cost", before: "$200k", after: "Nil*", barPercent: 2, color: akio },
          { label: "Component cost", before: "Baseline", after: "–20%", barPercent: 80, color: akio },
        ]}
      />
    </ScrollReveal>
    <ScrollReveal>
      <p className="text-muted-foreground text-xs tracking-wide px-6 md:px-12 lg:px-16 -mt-8 mb-4">* Engineering cost waived against mass-production commitment.</p>
    </ScrollReveal>

    <ScrollReveal style={{ marginBottom: "5rem" }}>
      <CaseStudy
        title="Electric Motorcycle<br/>for Africa"
        context="Ruggedised electric motorcycle design required for African road conditions and bike taxi use cases."
        outcome="PRD to production-ready in 6 months — delivering full CAD and component designs. Tooling and fixture designs, and supplier base all delivered in additional 3 months."
        color={akio}
        imageSrc="/Images/Messenger.webp"
        imageAlt="Electric Motorcycle"
        metrics={[
          { label: "Design time", before: "24 months", after: "9 months", barPercent: 38, color: akio },
          { label: "Development cost", before: "Baseline", after: "1/10th", barPercent: 10, color: akio },
        ]}
      />
    </ScrollReveal>

    {/* TRANSITION BANNER */}
    <ScrollReveal>
      <div className="bg-card border-t border-b border-border" style={{ padding: "3rem", textAlign: "center" }}>
        <p className="text-foreground/40 font-bold tracking-wider uppercase leading-relaxed" style={{ fontSize: "clamp(1.2rem, 2.2vw, 2.2rem)" }}>
          Design with <span style={{ color: akio }}>AKIO</span>. &nbsp; Scale manufacturing with <span style={{ color: "hsl(217, 91%, 60%)" }}>HENRY</span>.
        </p>
      </div>
    </ScrollReveal>
  </div>
  );
};

export default AkioTab;
