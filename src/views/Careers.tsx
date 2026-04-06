"use client";


import Navbar from "@/components/Navbar";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import ScrollReveal from "@/hooks/ScrollReveal";
import PageCTAFooter from "@/components/PageCTAFooter";

const values = [
  { title: "Bias for Physical", body: "We make parts, run machines, and learn in the real world — not just simulations.", img: "https://images.unsplash.com/photo-1696446702183-cbd13d78e1e7?w=800&h=500&fit=crop&q=80" },
  { title: "Capital Discipline", body: "We build more with less. The 10× cost advantage is a culture, not just a metric.", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop&q=80" },
  { title: "End-to-End Thinking", body: "From design intent to deployed product — we own the full loop, not just tasks.", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=500&fit=crop&q=80" },
  { title: "Data First", body: "Ground-truth manufacturing data drives our AI — not assumptions.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&q=80" },
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
              <div className="bg-background h-full overflow-hidden group border-t-2 border-primary/40">
                <div className="h-36 md:h-40 overflow-hidden relative">
                  <img src={val.img} alt={val.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.3) 50%, transparent 100%)" }} />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="font-bold text-xs md:text-sm tracking-[0.15em] uppercase text-foreground mb-3 group-hover:text-primary transition-colors">{val.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-[1.8]">{val.body}</p>
                </div>
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

      <PageCTAFooter
        headline="Shape the Future."
        tagline="Join the team building the operating system for manufacturing."
        buttonText="Get in Touch"
        buttonHref="mailto:Humans@nemiholdings.com"
      />
    </div>
  );
};

export default Careers;
