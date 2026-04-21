"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Navbar from "@/components/Navbar";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import ScrollReveal from "@/hooks/ScrollReveal";
import PageCTAFooter from "@/components/PageCTAFooter";

const values = [
  { title: "Team Player", body: "We make parts, run machines, and learn in the real world — not just simulations.", img: "https://images.unsplash.com/photo-1696446702183-cbd13d78e1e7?w=800&h=500&fit=crop&q=80" },
  { title: "Capital Discipline", body: "We build more with less. The 10× cost advantage is a culture, not just a metric.", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop&q=80" },
  { title: "End-to-End Thinking", body: "From design intent to deployed product — we own the full loop, not just tasks.", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=500&fit=crop&q=80" },
  { title: "Data First", body: "Ground-truth manufacturing data drives our AI — not assumptions.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&q=80" },
];

interface Job {
  dept: string;
  title: string;
  meta: string;
  jd: string;
}

// 150-word job descriptions. Send applications to Humans@nemi-ai.com.
const jobs: Job[] = [
  {
    dept: "Engineering — AI/ML",
    title: "LMM Research Engineer",
    meta: "Bangalore · Full-time · Hybrid",
    jd:
      "We are building the Large Manufacturing Model — a foundation model trained on real CAD geometries, sensor streams, quality outcomes, and process parameters. As an LMM Research Engineer, you will design training objectives, curate multi-modal industrial datasets, and evaluate the model against field outcomes on our production floors. You will publish internally, iterate quickly, and ship your work into live programmes across aerospace, defence, EV, and precision tooling. You should have strong intuition for deep learning, comfort with distributed training, and a bias towards reality over benchmarks. Prior exposure to any subset of computer vision, graph neural networks, reinforcement learning, or physics-informed ML is a plus. You will work alongside mechanical, electrical, and manufacturing engineers — so the ability to explain tradeoffs to non-ML colleagues matters. Send your resume to Humans@nemi-ai.com.",
  },
  {
    dept: "Engineering — Manufacturing",
    title: "Mechanical Design Engineer (AKIO)",
    meta: "Bangalore · Full-time · On-site",
    jd:
      "AKIO compresses concept-to-production design cycles from months to weeks. As a Mechanical Design Engineer on the AKIO suite, you will own the CAD, DFM, and simulation loop for real hardware programmes — drones, EV subsystems, precision tooling, consumer electronics. You will work alongside AI engineers who augment your workflow with generative design, simulation automation, and PLM integration. You should bring 3–7 years of production design experience, fluency in SolidWorks / NX / CATIA (one is fine), and a portfolio of parts that actually shipped. Familiarity with structural FEA, thermal analysis, or tolerance stack-up is a strong plus. You will iterate with a tight manufacturing team on the floor, so on-site presence matters. This is a shipping role, not a research role. Send your resume to Humans@nemi-ai.com.",
  },
  {
    dept: "Engineering — Manufacturing",
    title: "Process Engineer (HENRY)",
    meta: "Bangalore · Full-time · On-site",
    jd:
      "HENRY is NEMI's full-stack manufacturing layer — tooling, CNC, injection moulding, electronics, batteries, motors, complex assemblies. As a Process Engineer, you will own the translation from design intent to running production, including tooling specification, cycle-time optimisation, yield improvement, and quality sign-off. You will work with sensor-instrumented lines that feed data back into the LMM, so you will be closer to the model than most process engineers ever get. Bring 4–8 years of process engineering experience, hands-on comfort across at least two of CNC / injection moulding / battery assembly / PCBA, and a track record of driving measurable yield or cost improvements. AS9100 or ISO 9001 familiarity is helpful. This is an on-site role because real production demands real presence. Send your resume to Humans@nemi-ai.com.",
  },
  {
    dept: "Operations",
    title: "Fleet Operations Manager (SAM)",
    meta: "Africa / Remote · Full-time",
    jd:
      "SAM is where NEMI's hardware meets the real world — thousands of units operating across India and Africa. As Fleet Operations Manager, you will own uptime, last-mile logistics, maintenance cadence, and the feedback loop from field telemetry back to AKIO and HENRY. You will scale playbooks for deployment, training local operators, financing tie-ups, and after-sales service. Bring 5+ years in fleet ops, logistics, or deployed-hardware support (EV, drones, heavy equipment, or similar). You should be comfortable travelling across Africa and India, building teams on the ground, and running operations against tight margins. Data fluency matters — you will work with live telemetry dashboards every day. Send your resume to Humans@nemi-ai.com.",
  },
  {
    dept: "Business Development",
    title: "Strategic Partnerships Lead",
    meta: "Bangalore / London · Full-time",
    jd:
      "We land with design compression, expand into full-stack manufacturing, and dominate inside each account with deployed fleet data. The Strategic Partnerships Lead runs the expand-and-dominate motion with enterprise customers across aerospace, defence, automotive, and industrial. You will map accounts, structure multi-year programme deals, and work closely with the founders on institutional wins. You should bring 7+ years in complex B2B sales or strategic partnerships, fluency in hardware / manufacturing / aerospace buying cycles, and a track record of programme-sized deals ($5M+). Comfort with NDA-heavy sales cycles, defence procurement, and institutional diligence is required. You will split time between Bangalore and London, with customer travel across EU and India. Send your resume to Humans@nemi-ai.com.",
  },
  {
    dept: "Engineering — Software",
    title: "Manufacturing OS Platform Engineer",
    meta: "Bangalore · Full-time · Hybrid",
    jd:
      "NEMI M-OS is the operating system for our factories — scheduling, inference routing, telemetry, quality prediction, and the feedback loop back into the LMM. As a Platform Engineer, you will design and ship the backbone services that every application (AKIO, HENRY, SAM) runs on. You will own latency, reliability, observability, and developer experience for our internal engineering teams. Bring 5+ years of distributed systems experience, fluency in TypeScript / Go / Rust (pick two), and comfort with Kubernetes, event streaming (Kafka / NATS), and time-series data. Any exposure to edge compute, industrial protocols (OPC-UA, Modbus), or real-time scheduling is a plus. Hybrid from Bangalore, with periodic on-site time at our factories. Send your resume to Humans@nemi-ai.com.",
  },
];

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

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

      {/* HERO — Full screen (matches About page style) */}
      <section className="min-h-screen flex items-center justify-center relative z-[1] overflow-hidden pt-32 pb-16 px-6 md:px-12 lg:px-16">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 40% 35% at 50% 45%, hsl(275 80% 40% / 0.15) 0%, transparent 60%),
              radial-gradient(ellipse 55% 45% at 50% 50%, hsl(260 70% 30% / 0.1) 0%, transparent 55%)
            `,
          }}
        />
        <div className="text-center relative z-[3] max-w-4xl mx-auto">
          <p
            className="text-xs md:text-sm tracking-[0.4em] uppercase text-primary/80 mb-6 font-bold"
            style={{ animation: "hero-label-in 0.8s ease-out 0.2s both" }}
          >
            Careers
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tight uppercase leading-[0.95] mb-8"
            style={{ textShadow: "0 0 25px hsl(275 80% 60% / 0.2), 0 0 50px hsl(270 70% 50% / 0.1)" }}
          >
            <span style={{ display: "inline-block", animation: "hero-word-reveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}>
              Engineer the
            </span>
            <br />
            <span
              className="bg-clip-text text-transparent inline-block"
              style={{
                backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary) / 0.8))",
                backgroundSize: "200% 200%",
                animation: "hero-word-reveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s both, hero-gradient-shift 6s ease-in-out infinite 1.4s",
              }}
            >
              Physical
            </span>
            <br />
            <span style={{ display: "inline-block", animation: "hero-word-reveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.7s both" }}>
              Future.
            </span>
          </h1>
          <p
            className="text-sm md:text-lg font-light text-muted-foreground leading-relaxed tracking-[0.15em] uppercase max-w-[600px] mx-auto"
            style={{ opacity: 0, animation: "hero-fade-up 0.7s ease-out 1s forwards" }}
          >
            The next decade of products runs on Physical AI. Help build the stack.
          </p>
        </div>
      </section>

      {/* OUR TEAM + VALUES — Team image background with purple shade & values overlay */}
      <section className="relative z-[1] w-full">
        <div className="relative min-h-[70vh] overflow-hidden flex flex-col">
          {/* Team background image */}
          <img
            src="/Images/about us.webp"
            alt="NEMI team"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy" decoding="async"
          />
          {/* Tinted black overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.82) 100%)" }} />

          {/* Content — centered vertically */}
          <div className="relative z-10 flex flex-col flex-1 min-h-[70vh] items-center justify-center px-6 md:px-12 lg:px-16 text-center">
            {/* Section heading */}
            <ScrollReveal>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wider leading-[1.1] text-white mb-14 md:mb-16">
                Our Values
              </h2>
            </ScrollReveal>

            {/* Values grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-6xl">
              {values.map((val, i) => (
                <ScrollReveal key={val.title} delay={i * 100}>
                  <div className="p-5 md:p-7 group flex flex-col items-center">
                    <div className="w-10 h-[2px] mb-5 transition-all duration-300 group-hover:w-16" style={{ background: "linear-gradient(to right, hsl(275 80% 75%), hsl(275 80% 75% / 0.3))" }} />
                    <h3 className="font-bold text-xs md:text-sm tracking-[0.18em] uppercase text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                      {val.title}
                    </h3>
                    <p className="text-xs md:text-sm text-white/60 leading-[1.9] max-w-[250px]">{val.body}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
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
              <button
                type="button"
                onClick={() => setSelectedJob(job)}
                className="bg-background p-6 md:p-8 w-full text-left cursor-pointer transition-colors duration-200 hover:bg-card/80 group"
              >
                <p className="font-bold text-[0.58rem] tracking-[0.15em] uppercase text-primary mb-2">{job.dept}</p>
                <h3 className="font-bold text-sm md:text-base tracking-[0.05em] uppercase text-foreground mb-2">{job.title}</h3>
                <p className="text-xs text-muted-foreground mb-4">{job.meta}</p>
                <span className="inline-flex items-center gap-1 text-[0.65rem] font-bold tracking-[0.18em] uppercase text-primary group-hover:gap-2 transition-all">
                  View Role <span aria-hidden="true">&rarr;</span>
                </span>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── JD MODAL ── */}
      {selectedJob && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          style={{ background: "hsl(230 25% 4% / 0.85)", backdropFilter: "blur(12px)" }}
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl p-6 md:p-10 overflow-y-auto max-h-[85vh] animate-in fade-in zoom-in-95 duration-200"
            style={{
              background: "linear-gradient(145deg, hsl(230 20% 10%), hsl(230 25% 6%))",
              border: "1px solid hsl(275 80% 55% / 0.25)",
              boxShadow: "0 0 60px hsl(275 80% 55% / 0.15), 0 25px 50px hsl(230 25% 4% / 0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              style={{ background: "hsl(275 80% 55% / 0.1)" }}
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <p className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-primary mb-2">{selectedJob.dept}</p>
            <h3
              className="text-xl md:text-2xl font-bold text-foreground mb-2 leading-tight"
              style={{ textShadow: "0 0 20px hsl(275 80% 60% / 0.3)" }}
            >
              {selectedJob.title}
            </h3>
            <p className="text-xs text-muted-foreground mb-6 tracking-wide">{selectedJob.meta}</p>

            <div className="h-px bg-border/40 mb-6" />

            <p className="text-sm text-muted-foreground leading-[1.8] mb-8 whitespace-pre-line">
              {selectedJob.jd}
            </p>

            <a
              href={`mailto:Humans@nemi-ai.com?subject=Application%20%E2%80%94%20${encodeURIComponent(selectedJob.title)}`}
              className="inline-block font-bold text-xs tracking-[0.2em] uppercase px-8 py-3.5 rounded-lg transition-all duration-300 hover:scale-105 text-primary-foreground"
              style={{
                background: "linear-gradient(135deg, hsl(var(--nemi-nebula)), hsl(var(--primary)))",
                boxShadow: "0 4px 25px hsl(var(--primary) / 0.3)",
              }}
            >
              Apply for this Role
            </a>
          </div>
        </div>
      )}

      <PageCTAFooter
        headline="Shape the Future."
        tagline="Join the team building the operating system for manufacturing."
        buttonText="Get in Touch"
        buttonHref="mailto:Humans@nemi-ai.com"
      />
    </div>
  );
};

export default Careers;
