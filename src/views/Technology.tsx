import Navbar from "@/components/Navbar";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import ScrollReveal from "@/hooks/ScrollReveal";
import PageCTAFooter from "@/components/PageCTAFooter";

const accent = "hsl(var(--accent))";
const akio = "hsl(0, 72%, 52%)";
const henry = "hsl(217, 91%, 60%)";
const sam = "hsl(142, 71%, 45%)";

const lmmLayers = [
  { name: "Inference Engine", tag: "NEMI M-OS", desc: "Routes every task to the right sub-model. The central nervous system of the platform.", img: "/Images/Image in technology/Screenshot 2026-04-06 141717.webp" },
  { name: "Process Intelligence", tag: "OPTIMIZATION", desc: "Predicts optimal speed, temperature, and tooling — before a single cut is made.", img: "/Images/Image in technology/freepik__clean-this-image-more-brit-should-look-very-neat-a__60512.webp" },
  { name: "Quality Prediction", tag: "ZERO-DEFECT", desc: "Catches defects before they happen. Eliminates scrap. Kills rework.", img: "/Images/Image in technology/freepik__this-chassis-and-everything-is-fine-brbut-the-bacg__75353.webp" },
  { name: "Design-to-Mfg Bridge", tag: "AUTOMATION", desc: "Turns CAD files into production-ready process plans in minutes, not weeks.", img: "/Images/Image in technology/freepik__i-want-a-image-ehener-thsi-img2-is-on-the-left-sid__60508.webp" },
  { name: "Supply Chain Engine", tag: "ROUTING", desc: "Dynamically routes work across suppliers for lowest cost and fastest delivery.", img: "/Images/Image in technology/Screenshot 2026-04-07 093826.webp" },
  { name: "Lifecycle Intelligence", tag: "FEEDBACK", desc: "Field data flows back into design. Every failure makes the next build better.", img: "/Images/Image in technology/Feeback loop .webp" },
];

const flywheelNodes = [
  { label: "DESIGN", sub: "AKIO generates data", color: akio },
  { label: "MANUFACTURE", sub: "HENRY captures process data", color: henry },
  { label: "DEPLOY", sub: "SAM collects field data", color: sam },
  { label: "LMM", sub: "Model strengthens", color: accent },
  { label: "IMPROVE", sub: "Faster, cheaper output", color: "hsl(var(--foreground))" },
];

const strategySteps = [
  { num: "01", code: "ACQ", title: "Acquire", body: "Buy proven factories. Real machines. Real data. Real customers." },
  { num: "02", code: "RFT", title: "Retrofit", body: "Overlay the LMM stack. Sensors, AI scheduling, quality prediction." },
  { num: "03", code: "STR", title: "Strengthen", body: "Every job feeds the model. Each factory makes the whole network smarter." },
];


const comparisonRows = [
  { dimension: "Intelligence", legacy: "Rule-based automation", nemi: "AI that learns from every job" },
  { dimension: "Scope", legacy: "Point solutions per machine", nemi: "End-to-end design to delivery" },
  { dimension: "Data", legacy: "Siloed per factory", nemi: "Unified across all operations" },
  { dimension: "Deployment", legacy: "Cloud-dependent", nemi: "Edge-first, sovereign" },
  { dimension: "Cost", legacy: "Enterprise pricing", nemi: "Mid-market accessible" },
  { dimension: "Improvement", legacy: "Static after install", nemi: "Compounds with every run" },
];

const Technology = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <div className="fixed inset-0 z-0">
        <ConstellationCanvas />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 45%, hsl(var(--accent) / 0.18) 0%, transparent 65%)" }}
        />
      </div>

      <Navbar scrollProgress={1} />

      {/* ── HERO ── */}
      <section className="min-h-screen flex items-center justify-center relative z-[1] overflow-hidden pt-32 pb-16 px-6 md:px-12 lg:px-16">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 45% 40% at 50% 45%, hsl(275 80% 40% / 0.15) 0%, transparent 60%),
              radial-gradient(ellipse 60% 50% at 50% 50%, hsl(260 70% 30% / 0.1) 0%, transparent 55%)
            `,
          }}
        />
        <div className="text-center relative z-[3] max-w-5xl mx-auto">
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-primary/80 mb-6 font-bold"
            style={{ animation: "hero-label-in 0.8s ease-out 0.2s both" }}
          >
            The Technology
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tight uppercase leading-[0.95] mb-8"
            style={{ textShadow: "0 0 20px hsl(275 80% 60% / 0.15), 0 0 40px hsl(270 70% 50% / 0.08)" }}
          >
            <span style={{ display: "inline-block", animation: "hero-word-reveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}>
              Manufacturing
            </span>
            <br />
            <span style={{ display: "inline-block", animation: "hero-word-reveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s both" }}>
              Has a New{" "}
            </span>
            <span
              className="bg-clip-text text-transparent inline-block"
              style={{
                backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary) / 0.8))",
                backgroundSize: "200% 200%",
                animation: "hero-word-reveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.7s both, hero-gradient-shift 6s ease-in-out infinite 1.6s",
              }}
            >
              Brain.
            </span>
          </h1>
          <p className="text-sm md:text-lg font-light text-muted-foreground leading-relaxed max-w-[600px] mx-auto mb-14"
            style={{ opacity: 0, animation: "hero-fade-up 0.7s ease-out 1s forwards" }}
          >
            The LMM learns from every part, every sensor, every run. It doesn't just automate &mdash; it reasons.
          </p>
          <div
            className="inline-flex items-center gap-0 rounded-2xl border border-border/30 overflow-hidden"
            style={{ background: "hsl(var(--card) / 0.5)", backdropFilter: "blur(12px)", opacity: 0, animation: "hero-fade-up 0.7s ease-out 1.2s forwards" }}
          >
            {[
              { num: "6", label: "AI Modules" },
              { num: "10×", label: "Cost Efficiency" },
              { num: "80%", label: "Faster Engineering" },
            ].map((stat, i) => (
              <div key={stat.label} className={`text-center px-6 md:px-10 py-5 md:py-6 ${i > 0 ? "border-l border-border/30" : ""}`}>
                <p className="text-xl md:text-3xl font-extrabold text-foreground tracking-tight">{stat.num}</p>
                <p className="text-[0.55rem] md:text-[0.65rem] text-muted-foreground tracking-[0.2em] uppercase mt-1.5">{stat.label}</p>
              </div>
            ))}
          </div>
          <p
            className="text-[0.65rem] md:text-xs text-muted-foreground/55 italic leading-relaxed max-w-[640px] mx-auto mt-6 px-4"
            style={{ opacity: 0, animation: "hero-fade-up 0.7s ease-out 1.4s forwards" }}
          >
            10&times; and 80% figures reflect outcomes across published AKIO case studies
            (Refrigerator Design, Drone Powertrain, EV Motorcycle). Methodology available
            under NDA.
          </p>
        </div>
      </section>

      {/* ── CORE TECHNOLOGY — 6 AI LAYERS ── */}
      <section className="py-24 px-6 md:px-12 lg:px-16 border-t border-border/30 relative z-[1]">
        <ScrollReveal>
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4 font-bold"
            style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
          >
            LMM Architecture
          </p>
          <h2
            className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wider leading-[1.1] mb-3"
            style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
          >
            Six Layers. One Intelligence.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-sm md:text-base text-muted-foreground tracking-wide mb-14 max-w-[550px]">
            Each layer is a specialized AI. Together, they form a unified manufacturing brain that orchestrates everything from design to deployment.
          </p>
        </ScrollReveal>
        <div className="flex flex-col gap-4">
          {/* Row 1: Three cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {lmmLayers.slice(0, 3).map((layer, i) => (
              <ScrollReveal key={layer.name} delay={i * 120}>
                <div className="relative rounded-2xl overflow-hidden group cursor-default h-[320px] md:h-[360px]">
                  <img src={layer.img} alt={layer.name} className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" decoding="async" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.75) 40%, hsl(var(--background) / 0.2) 70%, transparent 100%)" }} />
                  <div className="absolute inset-0 border border-border/20 rounded-2xl pointer-events-none" />
                  <span className="absolute top-4 right-5 font-black text-5xl md:text-6xl text-white/[0.06] select-none leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                    <span className="inline-block text-[0.55rem] font-bold tracking-[0.3em] uppercase text-primary/70 mb-2 px-2.5 py-1 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
                      {layer.tag}
                    </span>
                    <h3 className="text-base md:text-lg font-bold tracking-wider uppercase text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {layer.name}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground/80 leading-[1.8]">{layer.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Row 2: Three cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {lmmLayers.slice(3, 6).map((layer, i) => (
              <ScrollReveal key={layer.name} delay={(i + 3) * 120}>
                <div className="relative rounded-2xl overflow-hidden group cursor-default h-[320px] md:h-[360px]">
                  <img src={layer.img} alt={layer.name} className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" decoding="async" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.75) 40%, hsl(var(--background) / 0.2) 70%, transparent 100%)" }} />
                  <div className="absolute inset-0 border border-border/20 rounded-2xl pointer-events-none" />
                  <span className="absolute top-4 right-5 font-black text-5xl md:text-6xl text-white/[0.06] select-none leading-none">
                    {String(i + 4).padStart(2, "0")}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                    <span className="inline-block text-[0.55rem] font-bold tracking-[0.3em] uppercase text-primary/70 mb-2 px-2.5 py-1 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
                      {layer.tag}
                    </span>
                    <h3 className="text-base md:text-lg font-bold tracking-wider uppercase text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {layer.name}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground/80 leading-[1.8]">{layer.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE FLYWHEEL EFFECT ── */}
      <section className="py-24 px-6 md:px-12 lg:px-16 relative z-[1]">
        <ScrollReveal>
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4 font-bold"
            style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
          >
            How It Works
          </p>
          <h2
            className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wider leading-[1.1] mb-3"
            style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
          >
            The Flywheel Effect
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-sm md:text-base text-muted-foreground tracking-wide mb-14 max-w-[550px]">
            Every production run generates data. Every data point makes the AI smarter. Smarter AI means better output. The cycle never stops.
          </p>
        </ScrollReveal>

        {/* Flywheel Chain */}
        <ScrollReveal>
          <div className="rounded-xl border border-border/40 p-6 md:p-10" style={{ background: "hsl(var(--card) / 0.7)" }}>
            <div className="flex items-center justify-center flex-wrap gap-2 md:gap-0">
              {flywheelNodes.map((node, i) => (
                <div key={node.label} className="flex items-center">
                  <div className="border border-border/40 bg-background rounded-lg p-3 md:p-5 text-center min-w-[100px] md:min-w-[140px] hover:bg-card transition-colors">
                    <p className="font-black text-[0.6rem] md:text-xs tracking-[0.15em] uppercase mb-1" style={{ color: node.color }}>{node.label}</p>
                    <p className="font-semibold text-[0.5rem] md:text-[0.55rem] tracking-[0.1em] uppercase text-muted-foreground">{node.sub}</p>
                  </div>
                  {i < flywheelNodes.length - 1 && (
                    <span className="text-lg md:text-xl text-foreground/20 px-1 md:px-2">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Strategy Steps */}
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] uppercase text-primary mt-16 mb-6 font-bold">Our Playbook</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/30">
          {strategySteps.map((step, i) => (
            <ScrollReveal key={step.code} delay={i * 120} className="h-full">
              <div className="bg-background p-7 md:p-9 h-full relative overflow-hidden group hover:bg-card transition-colors duration-300">
                <span className="absolute top-3 right-5 font-black text-6xl text-foreground/[0.04] select-none">
                  {step.num}
                </span>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-primary px-2.5 py-1 border-l-2 border-primary bg-primary/5 rounded-r">
                    {step.code}
                  </span>
                </div>
                <h3 className="font-bold text-lg md:text-xl tracking-wider uppercase mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-[1.8]">{step.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>


      {/* ── NEMI M-OS ARCHITECTURE ── */}
      <section className="py-24 px-6 md:px-12 lg:px-16 border-t border-border/30 relative z-[1]">
        <ScrollReveal>
          <p className="text-xs tracking-[0.4em] uppercase text-primary/80 mb-4 font-bold">System Architecture</p>
          <h2
            className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wider leading-[1.1] mb-3"
            style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.15)" }}
          >
            NEMI M-OS
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-sm md:text-base text-muted-foreground tracking-wide mb-14 max-w-[550px]">
            The operating system for the physical world. Four layers working as one.
          </p>
        </ScrollReveal>
        <ScrollReveal variant="scale">
          <div className="rounded-xl border border-border/30 overflow-hidden" style={{ background: "hsl(var(--card) / 0.5)" }}>
            {[
              { name: "Applications Layer", desc: "AKIO · HENRY · SAM — the user-facing systems that run on top of the OS",
                bg: "hsl(var(--accent) / 0.12)", border: "hsl(var(--accent))" },
              { name: "Large Manufacturing Model (LMM)", desc: "AI inference engine — process intelligence, quality prediction, supply chain optimization",
                bg: "hsl(var(--accent) / 0.07)", border: "hsl(var(--accent) / 0.5)" },
              { name: "Data Infrastructure", desc: "Sensor networks, machine telemetry, CAD ingestion, quality data pipelines",
                bg: "hsl(var(--accent) / 0.04)", border: "hsl(var(--accent) / 0.3)" },
              { name: "Physical Layer", desc: "CNC machines · Injection molders · Robotic arms · Assembly lines · Inspection systems",
                bg: "hsl(var(--muted) / 0.06)", border: "hsl(var(--border))" },
            ].map((layer, i) => (
              <div
                key={layer.name}
                className="p-5 md:p-6 text-center transition-colors duration-300 hover:brightness-110"
                style={{ background: layer.bg, borderLeft: `3px solid ${layer.border}` }}
              >
                <p className="font-bold text-[0.65rem] md:text-xs tracking-[0.2em] uppercase mb-1.5"
                  style={{ color: i === 0 ? "hsl(var(--accent))" : i < 2 ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}
                >
                  {layer.name}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground/70">{layer.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ── THE NEMI EDGE ── */}
      <section className="py-24 px-6 md:px-12 lg:px-16 relative z-[1]">
        <ScrollReveal>
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4 font-bold"
            style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
          >
            Competitive Edge
          </p>
          <h2
            className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wider leading-[1.1] mb-3"
            style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
          >
            Legacy vs. NEMI
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-sm md:text-base text-muted-foreground tracking-wide mb-14 max-w-[500px]">
            Not incremental. A fundamentally different architecture.
          </p>
        </ScrollReveal>
        <ScrollReveal variant="scale">
          <div className="rounded-xl border border-border/40 overflow-hidden" style={{ background: "hsl(var(--card) / 0.7)" }}>
            {/* Header Row */}
            <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-card p-5 border-b border-border/30">
              <span className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-muted-foreground"></span>
              <span className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-muted-foreground/50">Traditional MES / PLM Vendors</span>
              <span className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-primary">NEMI</span>
            </div>
            {/* Data Rows */}
            {comparisonRows.map((row, i) => (
              <div
                key={row.dimension}
                className={`grid grid-cols-[1.2fr_1fr_1fr] p-5 ${i < comparisonRows.length - 1 ? "border-b border-border/15" : ""} hover:bg-card/50 transition-colors group`}
              >
                <span className="text-xs font-bold tracking-[0.12em] uppercase text-foreground/80 group-hover:text-foreground transition-colors">{row.dimension}</span>
                <span className="flex items-center gap-2.5 text-xs text-muted-foreground/40">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(0 72% 52%)" strokeWidth="2.5" strokeLinecap="round" className="shrink-0">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  <span className="line-through decoration-muted-foreground/20">{row.legacy}</span>
                </span>
                <span className="flex items-center gap-2.5 text-xs text-primary font-semibold pl-4" style={{ borderLeft: "2px solid hsl(var(--primary) / 0.4)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(142 71% 45%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {row.nemi}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <PageCTAFooter
        headline="See It in Action."
        tagline="Book a walkthrough. See the LMM run on real production data."
        buttonText="Request a Demo"
        buttonHref="/#contact"
      />
    </div>
  );
};

export default Technology;
