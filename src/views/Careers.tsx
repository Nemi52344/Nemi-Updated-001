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

      {/* HERO — Full screen */}
      <section className="min-h-screen flex flex-col items-center justify-center relative z-[1] px-6 md:px-12 lg:px-16 text-center">
        <ScrollReveal>
          <h1
            className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tight uppercase leading-[0.95] mb-8"
            style={{ textShadow: "0 0 40px hsl(275 80% 60% / 0.5), 0 0 80px hsl(270 70% 50% / 0.3)" }}
          >
            Build the<br />Physical Internet
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p className="text-sm md:text-lg leading-[1.8] text-muted-foreground max-w-[600px] mx-auto tracking-wide">
            We're building the team that brings Physical AI to manufacturing. If you want your work to result in real things being made — faster and better — you belong here.
          </p>
        </ScrollReveal>
      </section>

      {/* OUR TEAM + VALUES — Team image background with purple shade & values overlay */}
      <section className="relative z-[1] w-full">
        <div className="relative min-h-[70vh] overflow-hidden flex flex-col">
          {/* Team background image */}
          <img
            src="/images/about us.webp"
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
