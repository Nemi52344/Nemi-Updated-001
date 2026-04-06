const henry = "hsl(217, 91%, 60%)";
const akio = "hsl(0, 72%, 52%)";
const sam = "hsl(142, 71%, 45%)";

import { CaseStudy } from "./CaseStudy";
import { ScrollReveal } from "@/hooks/ScrollReveal";
import factoryImg2 from "@/assets/factory-2.jpg";
import { useVideoAutoplay } from "@/hooks/useVideoAutoplay";

const services: { title: string; desc: string; img: string }[] = [
  { title: "Tooling & Fixturing", desc: "Injection molding tools, Die casting tools, Press tools, Machining, Welding, and Assembly fixtures", img: "/Images/Tooling%20and%20fixturing.png" },
  { title: "SPMs", desc: "Special purpose machinery and robotic automation to automate production of various parts", img: factoryImg2 },
  { title: "Metal Parts Manufacturing", desc: "Cutting, bending, forming, welding, machining, pipe metal, casting, forging", img: "/Images/Pipe%20bending.png" },
  { title: "Plastics, Rubbers, Composites", desc: "Injection moulding, extrusion, blow molding, thermoforming, compression molding", img: "/Images/Injection%20modling%20.png" },
  { title: "Battery Manufacturing", desc: "From portable chargers to drones to EVs to industrial energy storage", img: "/Images/Battery%20manufacturing.jpeg" },
  { title: "Motor Manufacturing", desc: "Design and manufacturing of BLDC, Axial Flux and other motors", img: "/Images/Motor.png" },
  { title: "Electronics Production", desc: "PCB assemblies, box builds / system integration, and testing", img: "/Images/Electronics%20production.jpeg" },
  { title: "Speedshop", desc: "Rapid response production for fast turnaround", img: "/Images/speedshop.png" },
  { title: "Complex Assemblies", desc: "Combining multiple different types of parts into complex assemblies — e.g., EVs, drones, industrial robotics", img: "/Images/Titanium-Alloys-for-Drone-Frames.jpg" },
];

const HenryTab = () => {
  const henryVideoRef = useVideoAutoplay();
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
              <span className="text-foreground">Design.</span><br />
              <span style={{ color: henry }}>Develop.</span><br />
              <span className="text-foreground">Distribute.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <p className="text-muted-foreground text-sm md:text-lg leading-[1.8] max-w-[480px] tracking-wide">
              Your design, manufactured at scale — faster, cheaper, smarter.
            </p>
          </ScrollReveal>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 w-1 z-[2]"
          style={{ background: `linear-gradient(to bottom, ${henry}, transparent)` }}
        />
        <div className="w-full h-full relative">
          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{ background: "linear-gradient(to right, hsl(var(--background) / 0.55), transparent)" }}
          />
          <img
            src="/Images/Henry.png"
            alt="Henry"
            className="w-full h-full object-cover opacity-75 block hover:scale-105"
            style={{ transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }}
          />
        </div>
      </div>
    </section>

    <div className="px-6 md:px-12 lg:px-16">



      {/* PRODUCT HERO */}
      <ScrollReveal>
        <section className="services-tab-hero-grid grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch pt-16 pb-8">
          <div className="flex flex-col justify-center">
            <div className="font-bold text-5xl md:text-6xl lg:text-7xl uppercase tracking-wider mb-2" style={{ color: henry }}>HENRY</div>
            <div className="font-semibold text-muted-foreground text-base md:text-xl uppercase tracking-wider mb-6">AI-Driven Manufacturing</div>
            <p className="text-muted-foreground text-sm md:text-base leading-[1.8] mb-8 max-w-[500px] tracking-wide">
              You've designed it. Now it needs to be built — at the right quality, the right cost, on time. HENRY is your one-stop AI-powered manufacturing partner: from raw tooling to finished assemblies, no supply chain juggling required.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem", padding: 0 }}>
              {["Integrated with AKIO design workflows", "AI assisted supply chain development", "AI assisted Tooling & Capex design", "Full-stack manufacturing capabilities"].map((b) => (
                <li key={b} className="text-muted-foreground text-sm tracking-wide" style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem" }}>
                  <span className="font-bold text-xs shrink-0 mt-0.5" style={{ color: henry }}>→</span>{b}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-stretch">
            <ScrollReveal variant="scale" repeat delay={100} className="w-full flex">
              <div className="bg-card rounded-lg overflow-hidden w-full flex" style={{ borderTop: `2px solid ${henry}` }}>
                <video
                  ref={henryVideoRef}
                  src="/videos/Henry%201%20Minute%20Updated.mp4"
                  controls
                  muted
                  playsInline
                  preload="metadata"
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
          <p className="font-bold text-xl md:text-2xl tracking-wider uppercase mb-10" style={{ color: henry }}>Henry Capabilities</p>
        </ScrollReveal>
        <div className="services-card-grid border border-border" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "hsl(var(--border))" }}>
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 100}>
              <div className="bg-background hover:bg-card transition-colors duration-300 cursor-default h-full" style={{ padding: "2rem" }}>
                <div className="bg-card" style={{ height: 140, marginBottom: "1.5rem", overflow: "hidden", borderLeft: `2px solid ${henry}`, padding: 0 }}>
                  <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.65, transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }} className="hover:scale-105" />
                </div>
                <div style={{ width: "3rem", height: 2, background: henry, marginBottom: "1.2rem" }} />
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
          <p className="text-foreground font-bold text-xs tracking-[0.25em] uppercase mb-2">Case Studies — Henry</p>
          <div style={{ height: 2, background: henry, width: "100%" }} />
        </div>
      </ScrollReveal>
    </div>

    <ScrollReveal>
      <CaseStudy
        title="Composites & Aluminium Tooling"
        context="A high-end sports car manufacturer required tooling, bonding & trimming jigs, FRP machining, and sheet metal tooling and part production — demanding precision across every surface and tight dimensional tolerance."
        outcome="Complete tooling suite — composites moulds, aluminium jigs, FRP machined parts, and sheet metal components — all within spec and integrated with the customer's production workflow."
        color={henry}
        imageSrc="/Images/aluminium.png"
        imageAlt="Composites & Aluminium Tooling"
        metrics={[
          { label: "Lead time", before: "18 weeks", after: "7 weeks", barPercent: 39, color: henry },
          { label: "Tooling cost", before: "Baseline", after: "–34%", barPercent: 66, color: henry },
        ]}
      />
    </ScrollReveal>

    <ScrollReveal>
      <CaseStudy
        title="Aerospace Machined Parts"
        context="Mass production of aluminium 6061-T651 machined parts with tight tolerances < 2 micron."
        outcome="Created fixturing and innovative methods to manufacture part in standard 3-axis instead of 5-axis."
        color={henry}
        imageSrc="/Images/aerospace-manufacturing.webp"
        imageAlt="Aerospace Machined Parts"
        imageFirst={false}
        metrics={[
          { label: "Machining time", before: "9 hrs/part", after: "3 hrs/part", barPercent: 33, color: henry },
          { label: "Cost reduction", before: "Baseline", after: ">50%", barPercent: 50, color: henry },
        ]}
      />
    </ScrollReveal>

    <ScrollReveal style={{ marginBottom: "5rem" }}>
      <CaseStudy
        title="Complex Assembly Production"
        context="Mass production of automated coffee machine."
        outcome="End-to-end manufacturing from fabrication, machining, electronics, wiring harnesses to complete assembly."
        color={henry}
        imageSrc="/Images/COffee%20mfg.png"
        imageAlt="Complex Assembly Production"
        metrics={[
          { label: "Initial setup lead time", before: "Benchmark", after: "<6 weeks", barPercent: 40, color: henry },
          { label: "Cost reduction", before: "Baseline", after: ">30%", barPercent: 70, color: henry },
        ]}
      />
    </ScrollReveal>

    {/* TRANSITION BANNER */}
    <ScrollReveal>
      <div className="bg-card border-t border-b border-border" style={{ padding: "3rem", textAlign: "center" }}>
        <p className="text-foreground/40 font-bold tracking-wider uppercase leading-relaxed" style={{ fontSize: "clamp(1.2rem, 2.2vw, 2.2rem)" }}>
          Design with <span style={{ color: akio }}>AKIO</span>. &nbsp; Build with <span style={{ color: henry }}>HENRY</span>. &nbsp; Deploy with <span style={{ color: sam }}>SAM</span>.
        </p>
      </div>
    </ScrollReveal>
  </div>
  );
};

export default HenryTab;
