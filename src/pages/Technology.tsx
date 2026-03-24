import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import ScrollReveal from "@/hooks/ScrollReveal";

const accent = "hsl(var(--accent))";
const akio = "hsl(0, 72%, 52%)";
const henry = "hsl(217, 91%, 60%)";
const sam = "hsl(142, 71%, 45%)";

const lmmLayers = [
  { name: "Inference Engine (NEMI M-OS)", desc: "Unified orchestration layer that routes tasks across specialized sub-models and interfaces with physical machines." },
  { name: "Process Intelligence Model", desc: "Predicts optimal manufacturing parameters (speed, temperature, feed rate, tooling) for any given part geometry and material." },
  { name: "Quality Prediction Model", desc: "Predicts defect probability before a run begins, enabling preventative process adjustment — reducing scrap and rework." },
  { name: "Design-to-Manufacturing Bridge", desc: "Converts CAD/design intent directly into manufacturing process plans, tooling requirements, and fixture specifications." },
  { name: "Supply Chain Optimization Model", desc: "Dynamically sources materials and routes work across NEMI's supplier network to minimize lead time and cost." },
  { name: "Lifecycle & Sensor Data Model", desc: "Ingests real-world field data from SAM-deployed products to identify failure modes and improve future designs." },
];

const flywheelNodes = [
  { label: "DESIGN", sub: "AKIO generates data", color: akio },
  { label: "MANUFACTURE", sub: "HENRY captures process data", color: henry },
  { label: "DEPLOY", sub: "SAM collects field data", color: sam },
  { label: "LMM", sub: "Model strengthens", color: accent },
  { label: "IMPROVE", sub: "Faster, cheaper output", color: "hsl(var(--foreground))" },
];

const osLayers = [
  { name: "Applications Layer", desc: "AKIO · HENRY · SAM — the user-facing systems that run on top of the OS", bg: "hsl(var(--accent) / 0.15)", border: accent, nameColor: accent },
  { name: "Large Manufacturing Model (LMM)", desc: "AI inference engine — process intelligence, quality prediction, supply chain optimization", bg: "hsl(var(--accent) / 0.1)", border: "hsl(var(--accent) / 0.5)", nameColor: "hsl(var(--foreground))" },
  { name: "Data Infrastructure", desc: "Sensor networks, machine telemetry, CAD ingestion, quality data pipelines", bg: "hsl(var(--accent) / 0.06)", border: "hsl(var(--accent) / 0.3)", nameColor: "hsl(var(--muted-foreground))" },
  { name: "Physical Layer", desc: "CNC machines · Injection molders · Robotic arms · Assembly lines · Inspection systems", bg: "hsl(var(--muted) / 0.08)", border: "hsl(var(--border))", nameColor: "hsl(var(--muted-foreground))" },
];

const capabilities = [
  { title: "Process Parameter Prediction", body: "Given a new part geometry and material, the LMM predicts optimal machining speed, feed rate, tool selection, and process sequence — before a single cut is made." },
  { title: "Quality Anomaly Detection", body: "Real-time sensor monitoring during production, with LMM-powered anomaly detection that flags deviation from expected process signatures before defects occur." },
  { title: "Design-to-Process Conversion", body: "Ingests CAD files and automatically generates manufacturing process plans, tooling requirements, fixture designs, and production routing — reducing engineering time by up to 80%." },
  { title: "Supplier Network Routing", body: "Dynamically routes work orders across NEMI's supplier network, optimizing for lead time, cost, and quality based on real-time capacity and historical performance data." },
  { title: "Predictive Maintenance", body: "Monitors machine health signals to predict maintenance requirements before failures occur — reducing unplanned downtime and extending equipment life." },
  { title: "Field Feedback Integration", body: "Ingests performance data from SAM-deployed products — battery degradation curves, component wear patterns, failure modes — to continuously improve design and manufacturing parameters." },
];

const Technology = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      {/* HERO */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-16 relative z-[1]">
        <ScrollReveal>
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-[1.05] mb-6"
            style={{ textShadow: "0 0 40px hsl(275 80% 60% / 0.5), 0 0 80px hsl(270 70% 50% / 0.3)" }}
          >
            The Large<br />Manufacturing Model
          </h1>
        </ScrollReveal>
        <ScrollReveal>
          <p className="text-sm md:text-lg leading-[1.8] text-muted-foreground max-w-[650px] tracking-wide">
            LMM is NEMI's proprietary AI — trained not on text, but on manufacturing. It is the intelligence layer running across every process in the NEMI platform, learning from each job to continuously improve output quality, speed, and cost.
          </p>
        </ScrollReveal>
      </section>

      {/* LMM DEEP DIVE */}
      <section className="py-16 px-6 md:px-12 lg:px-16 relative z-[1]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <ScrollReveal>
              <h2 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-wider leading-[1.1] mb-8">
                Manufacturing Intelligence<br />at Every Layer
              </h2>
            </ScrollReveal>
            <ScrollReveal>
              <p className="text-sm md:text-base leading-[1.9] text-muted-foreground mb-6 tracking-wide">
                Just as Large Language Models (LLMs) learn from vast amounts of text to understand and generate language, the Large Manufacturing Model (LMM) learns from manufacturing data — CAD geometries, sensor readings, quality control outcomes, process parameters, and production results — to understand and orchestrate physical production.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <p className="text-sm md:text-base leading-[1.9] text-muted-foreground tracking-wide">
                The LMM is not a single model. It is a layered stack of specialized AI models, each focused on a different dimension of the manufacturing process — working together under a unified inference engine we call the NEMI M-OS.
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal variant="scale">
            <div className="rounded-xl border border-border/40 p-6 md:p-8" style={{ background: "hsl(var(--card) / 0.7)" }}>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-6">LMM Architecture</p>
              <div className="flex flex-col gap-px bg-border/30">
                {lmmLayers.map((layer) => (
                  <div key={layer.name} className="bg-background p-4">
                    <p className="text-xs font-bold tracking-[0.15em] uppercase text-primary mb-1.5">{layer.name}</p>
                    <p className="text-xs md:text-sm text-muted-foreground leading-[1.6]">{layer.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FLYWHEEL */}
      <section className="py-16 px-6 md:px-12 lg:px-16 relative z-[1]">
        <ScrollReveal>
          <div className="rounded-xl border border-border/40 p-8 md:p-12" style={{ background: "hsl(var(--card) / 0.7)" }}>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-wider leading-[1.1] mb-10"
              style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
            >
              The Data Flywheel
            </h2>
            <div className="flex items-center justify-center flex-wrap gap-0">
              {flywheelNodes.map((node, i) => (
                <div key={node.label} className="flex items-center">
                  <div className="border border-border/40 bg-background p-4 md:p-6 text-center min-w-[110px] md:min-w-[140px]">
                    <p className="font-black text-xs tracking-[0.15em] uppercase mb-1" style={{ color: node.color }}>{node.label}</p>
                    <p className="font-semibold text-[0.55rem] tracking-[0.12em] uppercase text-muted-foreground">{node.sub}</p>
                  </div>
                  {i < flywheelNodes.length - 1 && (
                    <span className="text-xl text-foreground/20 px-2">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* NEMI M-OS */}
      <section className="py-16 px-6 md:px-12 lg:px-16 relative z-[1]">
        <ScrollReveal>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-wider leading-[1.1] mb-10"
            style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
          >
            The OS for the Physical World — NEMI M-OS
          </h2>
        </ScrollReveal>
        <ScrollReveal variant="scale">
          <div className="rounded-xl border border-border/40 p-6 md:p-8" style={{ background: "hsl(var(--card) / 0.7)" }}>
            <div className="flex flex-col gap-1">
              {osLayers.map((layer) => (
                <div key={layer.name} className="p-4 md:p-5 text-center" style={{ background: layer.bg, borderLeft: `3px solid ${layer.border}` }}>
                  <p className="font-bold text-xs tracking-[0.15em] uppercase mb-1" style={{ color: layer.nameColor }}>{layer.name}</p>
                  <p className="text-xs md:text-sm opacity-60">{layer.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CAPABILITIES */}
      <section className="py-16 pb-24 px-6 md:px-12 lg:px-16 relative z-[1]">
        <ScrollReveal>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-wider leading-[1.1] mb-10">
            What the LMM<br />Can Do Today
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/30 auto-rows-fr">
          {capabilities.map((cap, i) => (
            <ScrollReveal key={cap.title} delay={i * 100} className="h-full">
              <div className="bg-background p-6 md:p-8 h-full">
                <h3 className="font-bold text-xs tracking-[0.15em] uppercase text-primary mb-3">{cap.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-[1.8]">{cap.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 md:px-12 lg:px-16 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-[1]">
        <span className="font-bold text-xl tracking-[0.1em] uppercase text-muted-foreground">NEMI</span>
        <p className="text-sm text-muted-foreground">&copy; 2026 NEMI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Technology;
