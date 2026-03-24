import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import ScrollReveal from "@/hooks/ScrollReveal";

const values = [
  { title: "Bias for Physical", body: "We test things in the real world. Simulations are a starting point, not a destination. We make parts, run machines, and learn with real world implementations." },
  { title: "Capital Discipline", body: "Extreme efficiency is a competitive weapon. We build more with less — and we're proud of it. The 10× cost advantage is a culture, not just a metric." },
  { title: "End-to-End Thinking", body: "We don't hand off problems. Every person on the team understands the full DDD loop — from design intent to deployed product — and takes ownership of outcomes, not just tasks." },
  { title: "Data First", body: "Every decision is a data decision. We instrument everything, measure everything, and let ground-truth manufacturing data drive our AI — not assumptions." },
];

const jobs = [
  { dept: "Engineering — AI/ML", title: "LMM Research Engineer", meta: "Bangalore · Full-time · Hybrid" },
  { dept: "Engineering — Manufacturing", title: "Mechanical Design Engineer (AKIO)", meta: "Bangalore · Full-time · On-site" },
  { dept: "Engineering — Manufacturing", title: "Process Engineer (HENRY)", meta: "Bangalore · Full-time · On-site" },
  { dept: "Operations", title: "Fleet Operations Manager (SAM)", meta: "Africa / Remote · Full-time" },
  { dept: "Business Development", title: "Strategic Partnerships Lead", meta: "Bangalore / London · Full-time" },
  { dept: "Engineering — Software", title: "Manufacturing OS Platform Engineer", meta: "Bangalore · Full-time · Hybrid" },
];

const Careers = () => {
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
            Build the<br />Physical Internet
          </h1>
        </ScrollReveal>
        <ScrollReveal>
          <p className="text-sm md:text-lg leading-[1.8] text-muted-foreground max-w-[600px] tracking-wide">
            We're building the team that brings Physical AI to manufacturing. If you want your work to result in real things being made — faster and better — you belong here.
          </p>
        </ScrollReveal>
      </section>

      {/* VALUES */}
      <section className="py-16 px-6 md:px-12 lg:px-16 relative z-[1]">
        <ScrollReveal>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-wider leading-[1.1] mb-10">
            Our Values
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/30">
          {values.map((val, i) => (
            <ScrollReveal key={val.title} delay={i * 100}>
              <div className="bg-background p-6 md:p-8 border-t-2 border-primary/40 h-full">
                <h3 className="font-bold text-xs md:text-sm tracking-[0.15em] uppercase text-foreground mb-3">{val.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-[1.8]">{val.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section className="py-16 pb-24 px-6 md:px-12 lg:px-16 relative z-[1]">
        <ScrollReveal>
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-primary mb-4" style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}>
            Open Positions
          </p>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-wider leading-[1.1] mb-10">
            Join the Team
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30">
          {jobs.map((job, i) => (
            <ScrollReveal key={job.title} delay={i * 80}>
              <div className="bg-background p-6 md:p-8 cursor-pointer transition-colors duration-200 hover:bg-card/80">
                <p className="font-bold text-[0.58rem] tracking-[0.15em] uppercase text-primary mb-2">{job.dept}</p>
                <h3 className="font-bold text-sm md:text-base tracking-[0.05em] uppercase text-foreground mb-2">{job.title}</h3>
                <p className="text-xs text-muted-foreground">{job.meta}</p>
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

export default Careers;
