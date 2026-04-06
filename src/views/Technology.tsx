"use client";

import Navbar from "@/components/Navbar";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import ScrollReveal from "@/hooks/ScrollReveal";
import PageCTAFooter from "@/components/PageCTAFooter";

const accent = "hsl(var(--accent))";
const akio = "hsl(0, 72%, 52%)";
const henry = "hsl(217, 91%, 60%)";
const sam = "hsl(142, 71%, 45%)";

const lmmLayers = [
  { name: "Inference Engine", tag: "NEMI M-OS", desc: "Routes every task to the right sub-model. The central nervous system of the platform.", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop&q=80" },
  { name: "Process Intelligence", tag: "OPTIMIZATION", desc: "Predicts optimal speed, temperature, and tooling — before a single cut is made.", img: "https://images.unsplash.com/photo-1666618090858-fbcee636bd3e?w=800&h=500&fit=crop&q=80" },
  { name: "Quality Prediction", tag: "ZERO-DEFECT", desc: "Catches defects before they happen. Eliminates scrap. Kills rework.", img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=500&fit=crop&q=80" },
  { name: "Design-to-Mfg Bridge", tag: "AUTOMATION", desc: "Turns CAD files into production-ready process plans in minutes, not weeks.", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=500&fit=crop&q=80" },
  { name: "Supply Chain Engine", tag: "ROUTING", desc: "Dynamically routes work across suppliers for lowest cost and fastest delivery.", img: "https://images.unsplash.com/photo-1759272840712-c7e5ea852367?w=800&h=500&fit=crop&q=80" },
  { name: "Lifecycle Intelligence", tag: "FEEDBACK", desc: "Field data flows back into design. Every failure makes the next build better.", img: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=500&fit=crop&q=80" },
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

const capabilities = [
  { title: "Process Parameter Prediction", body: "Optimal machining params predicted before the first cut.", img: "https://images.unsplash.com/photo-1738162837451-2041c1418f54?w=800&h=500&fit=crop&q=80" },
  { title: "Quality Anomaly Detection", body: "Real-time sensor monitoring. Flags deviation before defects.", img: "https://images.unsplash.com/photo-1745921204896-c2011440a4e2?w=800&h=500&fit=crop&q=80" },
  { title: "Design-to-Process Conversion", body: "CAD to manufacturing plan. 80% less engineering time.", img: "https://images.unsplash.com/photo-1539262049339-675563d440dc?w=800&h=500&fit=crop&q=80" },
  { title: "Supplier Network Routing", body: "Dynamic work routing by cost, lead time, and capacity.", img: "https://images.unsplash.com/photo-1741792003907-11e3bdc2a180?w=800&h=500&fit=crop&q=80" },
  { title: "Predictive Maintenance", body: "Predicts failures before downtime. Extends equipment life.", img: "https://images.unsplash.com/photo-1748002757537-00ab5114135b?w=800&h=500&fit=crop&q=80" },
  { title: "Field Feedback Integration", body: "Deployed product data feeds back into design.", img: "https://images.unsplash.com/photo-1748348713828-12035b2d0a57?w=800&h=500&fit=crop&q=80" },
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
            The LMM learns from every part, every sensor, every run. It doesn't just automate — it thinks.
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/20">
          {lmmLayers.map((layer, i) => (
            <ScrollReveal key={layer.name} delay={i * 80} className="h-full">
              <div className="bg-background h-full relative overflow-hidden group hover:bg-card/60 transition-colors duration-500 cursor-default"
                style={{ borderLeft: "2px solid transparent", transition: "border-color 0.3s, background 0.5s" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderLeftColor = "hsl(var(--primary))")}
                onMouseLeave={(e) => (e.currentTarget.style.borderLeftColor = "transparent")}
              >
                <div className="h-36 md:h-40 overflow-hidden relative">
                  <img src={layer.img} alt={layer.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.4) 40%, transparent 100%)" }} />
                  <span className="absolute top-3 right-4 font-black text-3xl md:text-4xl text-white/10 select-none leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-6 md:p-8">
                  <span className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-primary/40 mb-3 block">
                    {layer.tag}
                  </span>
                  <h3 className="text-base md:text-lg font-bold tracking-wider uppercase text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {layer.name}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-[1.9]">{layer.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
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

      {/* ── CAPABILITIES ── */}
      <section className="py-24 px-6 md:px-12 lg:px-16 border-t border-border/30 relative z-[1]">
        <ScrollReveal>
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4 font-bold"
            style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
          >
            Capabilities
          </p>
          <h2
            className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wider leading-[1.1] mb-3"
            style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
          >
            What the LMM Does Today
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-sm md:text-base text-muted-foreground tracking-wide mb-14 max-w-[500px]">
            Not promises. Production intelligence running right now.
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30 auto-rows-fr">
          {capabilities.map((cap, i) => (
            <ScrollReveal key={cap.title} delay={i * 80} className="h-full">
              <div className="bg-background h-full group hover:bg-card transition-colors duration-300 overflow-hidden">
                <div className="h-32 md:h-36 overflow-hidden relative">
                  <img src={cap.img} alt={cap.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.3) 50%, transparent 100%)" }} />
                </div>
                <div className="p-6 md:p-8">
                  <div className="w-8 h-[2px] bg-primary mb-4 group-hover:w-12 transition-all duration-300" />
                  <h3 className="font-bold text-xs tracking-[0.15em] uppercase text-foreground mb-3 group-hover:text-primary transition-colors">{cap.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-[1.8]">{cap.body}</p>
                </div>
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
              <span className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-muted-foreground/50">Legacy Vendors</span>
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
        buttonHref="/services"
      />
    </div>
  );
};

export default Technology;
