"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Navbar from "@/components/Navbar";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import ScrollReveal from "@/hooks/ScrollReveal";
import PageCTAFooter from "@/components/PageCTAFooter";
import SiteFooter from "@/components/SiteFooter";
import { supabase } from "@/lib/supabase";

const values = [
  { title: "Team Player", body: "We make parts, run machines, and learn in the real world, not just simulations.", img: "https://images.unsplash.com/photo-1696446702183-cbd13d78e1e7?w=800&h=500&fit=crop&q=80" },
  { title: "Capital Discipline", body: "We build more with less. The 10× cost advantage is a culture, not just a metric.", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop&q=80" },
  { title: "End-to-End Thinking", body: "From design intent to deployed product, we own the full loop, not just tasks.", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=500&fit=crop&q=80" },
  { title: "Data First", body: "Ground-truth manufacturing data drives our AI, not assumptions.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&q=80" },
];

interface Job {
  dept: string;
  title: string;
  meta: string;
  jd: string;
}

// No open positions at the moment. The empty list renders the empty state below.
const jobs: Job[] = [];

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");

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

      const { error: uploadErr } = await supabase.storage
        .from("resumes")
        .upload(filePath, resumeFile, {
          contentType: resumeFile.type,
          upsert: false,
        });
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

      {/* HERO, Full screen (matches About page style) */}
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
            The next era of manufacturing runs on Physical AI. Join to be part of it.
          </p>
        </div>
      </section>

      {/* OUR TEAM + VALUES, Team image background with purple shade & values overlay */}
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

          {/* Content, centered vertically */}
          <div className="relative z-10 flex flex-col flex-1 min-h-[70vh] items-center justify-center px-6 md:px-12 lg:px-16 text-center">
            {/* Section heading */}
            <ScrollReveal>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wider leading-[1.1] text-white mb-14 md:mb-16">
                Our Values
              </h2>
            </ScrollReveal>

            {/* Values grid - wider columns + tighter padding so each body fits in 3 lines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-7xl items-start">
              {values.map((val, i) => (
                <ScrollReveal key={val.title} delay={i * 100}>
                  <div className="p-3 md:p-4 group flex flex-col items-center text-center">
                    <div className="w-10 h-[2px] mb-5 transition-all duration-300 group-hover:w-16" style={{ background: "linear-gradient(to right, hsl(275 80% 75%), hsl(275 80% 75% / 0.3))" }} />
                    <h3 className="font-bold text-xs md:text-sm tracking-[0.12em] md:tracking-[0.15em] uppercase text-white mb-3 group-hover:text-purple-300 transition-colors duration-300 whitespace-nowrap">
                      {val.title}
                    </h3>
                    <p
                      className="text-xs md:text-sm text-white/60 leading-[1.7] w-full"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical" as const,
                        overflow: "hidden",
                        minHeight: "calc(3 * 1.7em)",
                      }}
                    >
                      {val.body}
                    </p>
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
        {jobs.length > 0 ? (
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
        ) : (
          <ScrollReveal>
            <div
              className="rounded-2xl border px-8 py-14 md:py-16 text-center"
              style={{
                borderColor: "hsl(275 80% 60% / 0.25)",
                background:
                  "linear-gradient(135deg, hsl(275 80% 22% / 0.18), hsl(230 25% 6% / 0.6))",
                boxShadow: "0 0 40px hsl(275 80% 50% / 0.08)",
              }}
            >
              <p className="text-[0.65rem] md:text-xs tracking-[0.35em] uppercase text-primary/80 font-bold mb-3">
                No Open Positions
              </p>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-wide text-foreground mb-4">
                We&rsquo;re not actively hiring right now.
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-[1.8] max-w-[520px] mx-auto mb-6">
                We still want to hear from exceptional engineers, designers and operators who believe Physical AI is the next era of manufacturing. Send your resume and we&rsquo;ll keep you in mind when roles open.
              </p>
              <a
                href="mailto:info@nemi-ai.com?subject=Future%20opportunities%20at%20NEMI"
                className="inline-block font-bold text-xs tracking-[0.2em] uppercase px-8 py-3 rounded-lg transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 text-primary-foreground"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--nemi-nebula)), hsl(var(--primary)))",
                  boxShadow: "0 4px 20px hsl(var(--primary) / 0.3)",
                }}
              >
                Stay in Touch
              </a>
            </div>
          </ScrollReveal>
        )}
      </section>

      {/* ── JD MODAL ── */}
      {selectedJob && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          style={{ background: "hsl(230 25% 4% / 0.85)", backdropFilter: "blur(12px)" }}
          onClick={closeModal}
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
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--nemi-nebula)), hsl(var(--primary)))",
                    boxShadow: "0 4px 25px hsl(var(--primary) / 0.3)",
                  }}
                >
                  Apply for this Role
                </button>
              </>
            )}

            {showApplyForm && submitState !== "success" && (
              <form
                onSubmit={handleApplySubmit}
                className="space-y-4"
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
                  <input
                    required
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="w-full bg-background/40 border border-border/40 rounded-md px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/60 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:uppercase file:tracking-wider file:bg-primary/20 file:text-primary hover:file:bg-primary/30 file:cursor-pointer"
                  />
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
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--nemi-nebula)), hsl(var(--primary)))",
                      boxShadow: "0 4px 25px hsl(var(--primary) / 0.3)",
                    }}
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

      <PageCTAFooter
        headline="Shape the Future."
        tagline="Join the team building full-stack, end-to-end manufacturing automation with Physical AI."
        buttonText="Get in Touch"
        buttonHref="mailto:info@nemi-ai.com"
      />
      <SiteFooter />
    </div>
  );
};

export default Careers;
