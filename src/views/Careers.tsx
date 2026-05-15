"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Navbar from "@/components/Navbar";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import PageCTAFooter from "@/components/PageCTAFooter";
import SiteFooter from "@/components/SiteFooter";
import useScrollProgress from "@/hooks/useScrollProgress";
import { supabase } from "@/lib/supabase";

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const values = [
  { title: "First Principles", body: "Build as if nothing exists. We don't inherit decisions from competitors. We start from the truth and rebuild from there." },
  { title: "Ownership", body: "Every employee is an owner. Stock options for all, and ideas welcome from anywhere, beyond your domain or title." },
  { title: "Highest Standards", body: "Raise the bar. Ship products that delight customers and prevent mistakes so the same one never costs us twice." },
  { title: "Build Trust", body: "Lead with empathy, listen attentively, speak candidly. Safe, honest teams move faster and go further." },
];

interface Job {
  dept: string;
  title: string;
  meta: string;
  jd: string;
}

const jobs: Job[] = [
  { dept: "Engineering, AI/ML", title: "LMM Research Engineer", meta: "Bangalore · Full-time · Hybrid", jd: "We are building the Large Manufacturing Model, a foundation model trained on real CAD geometries, sensor streams, quality outcomes, and process parameters. As an LMM Research Engineer, you will design training objectives, curate multi-modal industrial datasets, and evaluate the model against field outcomes on our production floors. You will publish internally, iterate quickly, and ship your work into live programs across aerospace, defense, EV, and precision tooling. You should have strong intuition for deep learning, comfort with distributed training, and a bias towards reality over benchmarks. Prior exposure to any subset of computer vision, graph neural networks, reinforcement learning, or physics-informed ML is a plus. You will work alongside mechanical, electrical, and manufacturing engineers, so the ability to explain tradeoffs to non-ML colleagues matters." },
  { dept: "Engineering, Manufacturing", title: "Mechanical Design Engineer", meta: "Bangalore · Full-time · On-site", jd: "Our design platform compresses concept-to-production cycles from months to weeks. As a Mechanical Design Engineer, you will own the CAD, DFM, and simulation loop for real hardware programs, drones, EV subsystems, precision tooling, consumer electronics. You will work alongside AI engineers who augment your workflow with generative design, simulation automation, and PLM integration. You should bring 3-7 years of production design experience, fluency in SolidWorks / NX / CATIA (one is fine), and a portfolio of parts that actually shipped. Familiarity with structural FEA, thermal analysis, or tolerance stack-up is a strong plus. You will iterate with a tight manufacturing team on the floor, so on-site presence matters. This is a shipping role, not a research role." },
  { dept: "Engineering, Manufacturing", title: "Process Engineer", meta: "Bangalore · Full-time · On-site", jd: "Our manufacturing platform is the full-stack layer for tooling, CNC, injection moulding, electronics, batteries, motors, complex assemblies. As a Process Engineer, you will own the translation from design intent to running production, including tooling specification, cycle-time optimisation, yield improvement, and quality sign-off. You will work with sensor-instrumented lines that feed data back into the LMM, so you will be closer to the model than most process engineers ever get. Bring 4-8 years of process engineering experience, hands-on comfort across at least two of CNC / injection moulding / battery assembly / PCBA, and a track record of driving measurable yield or cost improvements. AS9100 or ISO 9001 familiarity is helpful. This is an on-site role because real production demands real presence." },
  { dept: "Operations", title: "Fleet Operations Manager", meta: "Africa / Remote · Full-time", jd: "Our deployment layer is where NEMI's hardware meets the real world, thousands of units operating across India and Africa. As Fleet Operations Manager, you will own uptime, last-mile logistics, maintenance cadence, and the feedback loop from field telemetry back to design and manufacturing. You will scale playbooks for deployment, training local operators, financing tie-ups, and after-sales service. Bring 5+ years in fleet ops, logistics, or deployed-hardware support (EV, drones, heavy equipment, or similar). You should be comfortable travelling across Africa and India, building teams on the ground, and running operations against tight margins. Data fluency matters, you will work with live telemetry dashboards every day." },
  { dept: "Business Development", title: "Strategic Partnerships Lead", meta: "Bangalore / London · Full-time", jd: "We land with design compression, expand into full-stack manufacturing, and dominate inside each account with deployed fleet data. The Strategic Partnerships Lead runs the expand-and-dominate motion with enterprise customers across aerospace, defense, automotive, and industrial. You will map accounts, structure multi-year program deals, and work closely with the founders on institutional wins. You should bring 7+ years in complex B2B sales or strategic partnerships, fluency in hardware / manufacturing / aerospace buying cycles, and a track record of program-sized deals ($5M+). Comfort with NDA-heavy sales cycles, defense procurement, and institutional diligence is required. You will split time between Bangalore and London, with customer travel across EU and India." },
  { dept: "Engineering, Software", title: "Manufacturing OS Platform Engineer", meta: "Bangalore · Full-time · Hybrid", jd: "NEMI M-OS is the operating system for our factories, scheduling, inference routing, telemetry, quality prediction, and the feedback loop back into the LMM. As a Platform Engineer, you will design and ship the backbone services that every application across design, manufacturing and deployment runs on. You will own latency, reliability, observability, and developer experience for our internal engineering teams. Bring 5+ years of distributed systems experience, fluency in TypeScript / Go / Rust (pick two), and comfort with Kubernetes, event streaming (Kafka / NATS), and time-series data. Any exposure to edge compute, industrial protocols (OPC-UA, Modbus), or real-time scheduling is a plus. Hybrid from Bangalore, with periodic on-site time at our factories." },
];

const Careers = () => {
  const scrollProgress = useScrollProgress();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [dropState, setDropState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [dropFileName, setDropFileName] = useState<string>("");
  const [dropFileSize, setDropFileSize] = useState<number>(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [pickedFile, setPickedFile] = useState<File | null>(null);

  const handleFilePick = (file: File | null) => {
    if (!file) {
      setPickedFile(null);
      setDropFileName("");
      setDropFileSize(0);
      return;
    }
    setPickedFile(file);
    setDropFileName(file.name);
    setDropFileSize(file.size);
  };

  const formatBytes = (b: number) => {
    if (b < 1024) return `${b} B`;
    if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
    return `${(b / 1024 / 1024).toFixed(2)} MB`;
  };

  const ROUTING_CHIPS = [
    "Engineering",
    "AI / ML Research",
    "Manufacturing",
    "Operations",
    "Business Development",
    "Design",
  ];

  const handleResumeDrop = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDropState("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    const resumeFile = pickedFile || (data.get("resume") as File | null);
    try {
      if (!resumeFile || resumeFile.size === 0) throw new Error("Resume required");
      const safeName = resumeFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const filePath = `${Date.now()}_${safeName}`;
      const { error: uploadErr } = await supabase.storage.from("resumes").upload(filePath, resumeFile, { contentType: resumeFile.type, upsert: false });
      if (uploadErr) throw uploadErr;
      const { error: insertErr } = await supabase.from("applications").insert({
        role: "General Application",
        department: "AI Screening",
        full_name: data.get("fullName") as string,
        email: data.get("email") as string,
        phone: (data.get("phone") as string) || null,
        location: null,
        experience: null,
        linkedin: null,
        portfolio: null,
        cover_letter: null,
        resume_path: filePath,
      });
      if (insertErr) throw insertErr;
      setDropState("success");
      form.reset();
      handleFilePick(null);
    } catch (err) {
      console.error("Resume drop error:", err);
      setDropState("error");
    }
  };

  const closeModal = () => {
    setSelectedJob(null);
    setShowApplyForm(false);
    setSubmitState("idle");
  };

  const handleApplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedJob) return;
    setSubmitState("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    const resumeFile = data.get("resume") as File | null;

    try {
      if (!resumeFile || resumeFile.size === 0) throw new Error("Resume required");
      const safeName = resumeFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const filePath = `${Date.now()}_${safeName}`;
      const { error: uploadErr } = await supabase.storage.from("resumes").upload(filePath, resumeFile, { contentType: resumeFile.type, upsert: false });
      if (uploadErr) throw uploadErr;
      const { error: insertErr } = await supabase.from("applications").insert({
        role: selectedJob.title,
        department: selectedJob.dept,
        full_name: data.get("fullName") as string,
        email: data.get("email") as string,
        phone: data.get("phone") as string,
        location: (data.get("location") as string) || null,
        experience: data.get("experience") as string,
        linkedin: (data.get("linkedin") as string) || null,
        portfolio: (data.get("portfolio") as string) || null,
        cover_letter: data.get("coverLetter") as string,
        resume_path: filePath,
      });
      if (insertErr) throw insertErr;
      setSubmitState("success");
      form.reset();
    } catch (err) {
      console.error("Application submit error:", err);
      setSubmitState("error");
    }
  };

  // 4 panels: Hero, Values, Positions, CTA+Footer
  const heroVisible = scrollProgress < 0.29;
  const heroExit = easeOut(rangeProgress(scrollProgress, 0.24, 0.29));
  const heroOp = 1 - heroExit;

  const valVisible = scrollProgress > 0.27 && scrollProgress < 0.55;
  const valEnter = easeOut(rangeProgress(scrollProgress, 0.28, 0.34));
  const valExit = easeOut(rangeProgress(scrollProgress, 0.50, 0.55));
  const valOp = valEnter * (1 - valExit);

  const posVisible = scrollProgress > 0.53 && scrollProgress < 0.82;
  const posEnter = easeOut(rangeProgress(scrollProgress, 0.54, 0.60));
  const posExit = easeOut(rangeProgress(scrollProgress, 0.77, 0.82));
  const posOp = posEnter * (1 - posExit);

  const ctaVisible = scrollProgress > 0.80;
  const ctaEnter = easeOut(rangeProgress(scrollProgress, 0.81, 0.88));

  return (
    <div className="bg-background text-foreground relative" style={{ height: "400vh" }}>
      <div className="fixed inset-0 z-0">
        <ConstellationCanvas />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 45%, hsl(var(--accent) / 0.18) 0%, transparent 65%)" }}
        />
      </div>

      <Navbar scrollProgress={1} />

      {/* ── 1. HERO ── */}
      {heroVisible && (
        <div
          className="fixed inset-0 z-[10] flex items-center justify-center px-6 md:px-12 lg:px-16 overflow-hidden"
          style={{ opacity: heroOp }}
        >
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
            <h1
              className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tight uppercase leading-[0.95] mb-8"
              style={{ textShadow: "0 0 25px hsl(275 80% 60% / 0.2), 0 0 50px hsl(270 70% 50% / 0.1)" }}
            >
              <span style={{ display: "inline-block" }}>Engineer the</span>
              <br />
              <span
                className="bg-clip-text text-transparent inline-block"
                style={{
                  backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary) / 0.8))",
                  backgroundSize: "200% 200%",
                }}
              >
                Physical
              </span>
              <br />
              <span style={{ display: "inline-block" }}>Future.</span>
            </h1>
            <p className="text-sm md:text-lg font-light text-muted-foreground leading-relaxed tracking-[0.15em] uppercase max-w-[600px] mx-auto">
              The next era of manufacturing runs on Physical AI. Join to be part of it.
            </p>
          </div>
        </div>
      )}

      {/* ── 2. VALUES ── */}
      {valVisible && (
        <div className="fixed inset-0 z-[10] w-full overflow-hidden" style={{ opacity: valOp }}>
          <img
            src="/Images/about us.webp"
            alt="NEMI team"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy" decoding="async"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.82) 100%)" }} />
          <div className="relative z-10 flex flex-col h-full items-center justify-center px-6 md:px-12 lg:px-16 text-center"
            style={{ transform: `translateY(${(1 - valEnter) * 24}px)` }}
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wider leading-[1.1] text-white mb-14 md:mb-16">
              Our Values
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-7xl items-start">
              {values.map((val, i) => {
                const cardP = easeOut(Math.min(Math.max((valEnter - i * 0.1) / 0.5, 0), 1));
                return (
                <div key={val.title} className="p-3 md:p-4 group flex flex-col items-center text-center" style={{ opacity: cardP, transform: `translateY(${(1 - cardP) * 24}px)` }}>
                  <div className="w-10 h-[2px] mb-5 transition-all duration-300 group-hover:w-16" style={{ background: "linear-gradient(to right, hsl(275 80% 75%), hsl(275 80% 75% / 0.3))" }} />
                  <h3 className="font-bold text-xs md:text-sm tracking-[0.12em] md:tracking-[0.15em] uppercase text-white mb-3 group-hover:text-purple-300 transition-colors duration-300 whitespace-nowrap">
                    {val.title}
                  </h3>
                  <p className="text-xs md:text-sm text-white/70 leading-[1.7] w-full">{val.body}</p>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── 3. OPEN POSITIONS ── */}
      {posVisible && (
        <div
          className="fixed inset-0 z-[10] flex flex-col justify-center px-6 md:px-12 lg:px-16"
          style={{ opacity: posOp }}
        >
          <div className="max-w-2xl w-full mx-auto pt-20" style={{ transform: `translateY(${(1 - posEnter) * 24}px)` }}>
            <div className="text-center mb-8">
              <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-primary mb-3" style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}>
                Apply Now
              </p>
              <h2 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-wider leading-[1.1] mb-3">
                Drop Your Resume
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground tracking-wide max-w-xl mx-auto leading-relaxed">
                Join the team building Physical AI for manufacturing. We review every resume and reach out when there's a fit.
              </p>
            </div>

            {dropState !== "success" ? (
              <form
                onSubmit={handleResumeDrop}
                className="rounded-2xl p-6 md:p-8 space-y-4"
                style={{
                  background: "linear-gradient(145deg, hsl(230 20% 10% / 0.9), hsl(230 25% 6% / 0.9))",
                  border: "1px solid hsl(275 80% 55% / 0.25)",
                  boxShadow: "0 0 40px hsl(275 80% 55% / 0.10), 0 20px 40px hsl(230 25% 4% / 0.4)",
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[0.65rem] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">Full Name *</label>
                    <input required name="fullName" type="text" className="w-full bg-background/40 border border-border/40 rounded-md px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/60" />
                  </div>
                  <div>
                    <label className="block text-[0.65rem] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">Email *</label>
                    <input required name="email" type="email" className="w-full bg-background/40 border border-border/40 rounded-md px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/60" />
                  </div>
                </div>
                <div>
                  <label className="block text-[0.65rem] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">Phone</label>
                  <input name="phone" type="tel" className="w-full bg-background/40 border border-border/40 rounded-md px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/60" />
                </div>
                <div>
                  <label className="block text-[0.65rem] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">Resume * (PDF or DOC, max 5MB)</label>
                  <label
                    className="flex items-center gap-3 rounded-md border border-dashed border-border/50 px-4 py-5 cursor-pointer transition-all duration-200 hover:border-primary/60 hover:bg-primary/5"
                    style={{ background: "hsl(0 0% 100% / 0.02)" }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="hsl(275 70% 70%)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-xs md:text-sm flex-1" style={{ color: dropFileName ? "hsl(0 0% 90%)" : "hsl(0 0% 55%)" }}>
                      {dropFileName || "Click to upload your resume"}
                    </span>
                    <input
                      required
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="hidden"
                      onChange={(e) => handleFilePick(e.target.files?.[0] || null)}
                    />
                  </label>
                </div>
                {dropState === "error" && (
                  <p className="text-xs text-red-400">Something went wrong. Please email info@nemi-ai.com directly.</p>
                )}
                <button
                  type="submit"
                  disabled={dropState === "submitting"}
                  className="w-full font-bold text-xs tracking-[0.2em] uppercase px-6 py-3.5 rounded-lg transition-all duration-300 hover:scale-[1.02] text-primary-foreground disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, hsl(var(--nemi-nebula)), hsl(var(--primary)))", boxShadow: "0 4px 25px hsl(var(--primary) / 0.3)" }}
                >
                  {dropState === "submitting" ? "Submitting…" : "Submit Resume"}
                </button>
                <p className="text-[11px] text-muted-foreground text-center pt-1">
                  Or send your resume to{" "}
                  <a href="mailto:careers@nemi-ai.com" className="text-primary hover:text-primary/80 transition-colors font-semibold">
                    careers@nemi-ai.com
                  </a>
                </p>
              </form>
            ) : (
              <div
                className="rounded-2xl p-8 text-center"
                style={{
                  background: "linear-gradient(145deg, hsl(230 20% 10% / 0.9), hsl(230 25% 6% / 0.9))",
                  border: "1px solid hsl(275 80% 55% / 0.25)",
                }}
              >
                <h4 className="text-lg font-bold text-foreground mb-2">Resume received.</h4>
                <p className="text-sm text-muted-foreground mb-6">Our AI will screen it and route it to the right team. We&apos;ll be in touch at the email you provided.</p>
                <button
                  type="button"
                  onClick={() => setDropState("idle")}
                  className="font-bold text-xs tracking-[0.2em] uppercase px-8 py-3 rounded-lg border border-border/40 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Submit Another
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── 4. CTA + FOOTER ── */}
      {ctaVisible && (
        <div className="fixed inset-0 z-[10] flex flex-col" style={{ opacity: ctaEnter }}>
          <div className="flex-1 flex items-center justify-center">
            <PageCTAFooter
              headline="Shape the Future."
              tagline="Join the team building full-stack, end-to-end manufacturing automation with Physical AI."
              buttonText="Get in Touch"
              buttonHref="mailto:info@nemi-ai.com"
            />
          </div>
          <SiteFooter />
        </div>
      )}

      {/* ── JD MODAL ── */}
      {selectedJob && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          style={{ background: "hsl(230 25% 4% / 0.85)", backdropFilter: "blur(12px)" }}
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl p-6 md:p-10 overflow-y-auto max-h-[85vh]"
            style={{
              background: "linear-gradient(145deg, hsl(230 20% 10%), hsl(230 25% 6%))",
              border: "1px solid hsl(275 80% 55% / 0.25)",
              boxShadow: "0 0 60px hsl(275 80% 55% / 0.15), 0 25px 50px hsl(230 25% 4% / 0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
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

            {!showApplyForm && (
              <>
                <p className="text-sm text-muted-foreground leading-[1.8] mb-8 whitespace-pre-line">
                  {selectedJob.jd}
                </p>
                <button
                  type="button"
                  onClick={() => setShowApplyForm(true)}
                  className="inline-block font-bold text-xs tracking-[0.2em] uppercase px-8 py-3.5 rounded-lg transition-all duration-300 hover:scale-105 text-primary-foreground"
                  style={{ background: "linear-gradient(135deg, hsl(var(--nemi-nebula)), hsl(var(--primary)))", boxShadow: "0 4px 25px hsl(var(--primary) / 0.3)" }}
                >
                  Apply for this Role
                </button>
              </>
            )}

            {showApplyForm && submitState !== "success" && (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[0.65rem] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">Full Name *</label>
                    <input required name="fullName" type="text" className="w-full bg-background/40 border border-border/40 rounded-md px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/60" />
                  </div>
                  <div>
                    <label className="block text-[0.65rem] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">Email *</label>
                    <input required name="email" type="email" className="w-full bg-background/40 border border-border/40 rounded-md px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/60" />
                  </div>
                  <div>
                    <label className="block text-[0.65rem] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">Phone *</label>
                    <input required name="phone" type="tel" className="w-full bg-background/40 border border-border/40 rounded-md px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/60" />
                  </div>
                  <div>
                    <label className="block text-[0.65rem] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">Location</label>
                    <input name="location" type="text" placeholder="City, Country" className="w-full bg-background/40 border border-border/40 rounded-md px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/60" />
                  </div>
                  <div>
                    <label className="block text-[0.65rem] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">Years of Experience *</label>
                    <input required name="experience" type="text" className="w-full bg-background/40 border border-border/40 rounded-md px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/60" />
                  </div>
                  <div>
                    <label className="block text-[0.65rem] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">LinkedIn</label>
                    <input name="linkedin" type="url" placeholder="https://linkedin.com/in/..." className="w-full bg-background/40 border border-border/40 rounded-md px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/60" />
                  </div>
                </div>
                <div>
                  <label className="block text-[0.65rem] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">Portfolio (optional)</label>
                  <input name="portfolio" type="url" placeholder="https://" className="w-full bg-background/40 border border-border/40 rounded-md px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/60" />
                </div>
                <div>
                  <label className="block text-[0.65rem] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">Resume * (PDF or DOC, max 5MB)</label>
                  <input required name="resume" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="w-full bg-background/40 border border-border/40 rounded-md px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/60 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:uppercase file:tracking-wider file:bg-primary/20 file:text-primary hover:file:bg-primary/30 file:cursor-pointer" />
                </div>
                <div>
                  <label className="block text-[0.65rem] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">Why this role? *</label>
                  <textarea required name="coverLetter" rows={4} className="w-full bg-background/40 border border-border/40 rounded-md px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/60 resize-none" />
                </div>
                {submitState === "error" && (
                  <p className="text-xs text-red-400">Something went wrong. Please email info@nemi-ai.com directly.</p>
                )}
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submitState === "submitting"}
                    className="flex-1 font-bold text-xs tracking-[0.2em] uppercase px-6 py-3.5 rounded-lg transition-all duration-300 hover:scale-[1.02] text-primary-foreground disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, hsl(var(--nemi-nebula)), hsl(var(--primary)))", boxShadow: "0 4px 25px hsl(var(--primary) / 0.3)" }}
                  >
                    {submitState === "submitting" ? "Submitting…" : "Submit Application"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowApplyForm(false)}
                    className="px-6 py-3.5 rounded-lg font-bold text-xs tracking-[0.2em] uppercase text-muted-foreground border border-border/40 hover:text-foreground hover:border-border/70 transition-colors"
                  >
                    Back
                  </button>
                </div>
              </form>
            )}

            {submitState === "success" && (
              <div className="text-center py-8">
                <h4 className="text-lg font-bold text-foreground mb-2">Application received.</h4>
                <p className="text-sm text-muted-foreground mb-6">We&apos;ll review and get back to you at the email you provided.</p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="font-bold text-xs tracking-[0.2em] uppercase px-8 py-3 rounded-lg border border-border/40 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;
