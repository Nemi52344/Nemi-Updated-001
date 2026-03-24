const sam = "hsl(142, 71%, 45%)";

import { ScrollReveal } from "@/hooks/ScrollReveal";
import { useVideoAutoplay } from "@/hooks/useVideoAutoplay";

const services = [
  { title: "Last Mile Delivery", desc: "SAM manages deployment and delivery of products to real-world environments. Supporting 2500+ EV fleet and consumer vehicles across India and Africa.", img: "/Images/Last%20mile%20Delivery%20.png" },
  { title: "Usage Tracking", desc: "Once products are deployed, SAM continuously monitors their performance and feeds data back into AKIO and Henry.", img: "/Images/Usage%20tracking.jpeg" },
  { title: "Predictive Maintenance", desc: "SAM enables proactive maintenance using operational data, reducing downtime and improving product reliability.", img: "/Images/Predictive%20Maintenance.png" },
];

const SamTab = () => {
  const samVideoRef = useVideoAutoplay();
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
              <span className="text-foreground">Develop.</span><br />
              <span style={{ color: sam }}>Distribute.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <p className="text-muted-foreground text-sm md:text-lg leading-[1.8] max-w-[480px] tracking-wide">
              Deploy, monitor, and improve — every unit, every mile.
            </p>
          </ScrollReveal>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 w-1 z-[2]"
          style={{ background: `linear-gradient(to bottom, ${sam}, transparent)` }}
        />
        <div className="w-full h-full relative">
          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{ background: "linear-gradient(to right, hsl(var(--background) / 0.55), transparent)" }}
          />
          <img
            src="/Images/SAM.png"
            alt="SAM"
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
            <div className="font-bold text-5xl md:text-6xl lg:text-7xl uppercase tracking-wider mb-2" style={{ color: sam }}>SAM</div>
            <div className="font-semibold text-muted-foreground text-base md:text-xl uppercase tracking-wider mb-6">Deployment & Lifecycle Intelligence</div>
            <p className="text-muted-foreground text-sm md:text-base leading-[1.8] mb-8 max-w-[500px] tracking-wide">
              Your product leaving the factory is just the beginning. SAM gets it to your customers, tracks every unit in the field, and feeds real performance data back into your next design — so each generation is better than the last.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem", padding: 0 }}>
              {["Deliver products to end users", "Support leasing & financing", "Monitor real-world product performance", "Improve products using operational data"].map((b) => (
                <li key={b} className="text-muted-foreground text-sm tracking-wide" style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem" }}>
                  <span className="font-bold text-xs shrink-0 mt-0.5" style={{ color: sam }}>→</span>{b}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-stretch">
            <ScrollReveal variant="scale" repeat delay={100} className="w-full flex">
              <div className="bg-card rounded-lg overflow-hidden w-full flex" style={{ borderTop: `2px solid ${sam}` }}>
                <video
                  ref={samVideoRef}
                  src="/videos/Sam%201%20Minute.mp4"
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
      <div className="services-grid-wrapper pb-20 pt-4">
        <ScrollReveal>
          <p className="font-bold text-xl md:text-2xl tracking-wider uppercase mb-10" style={{ color: sam }}>SAM Services</p>
        </ScrollReveal>
        <div className="services-card-grid border border-border" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "hsl(var(--border))" }}>
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 120}>
              <div className="bg-background hover:bg-card transition-colors duration-300 cursor-default h-full" style={{ padding: "2rem" }}>
                <div className="bg-card" style={{ height: 140, marginBottom: "1.5rem", overflow: "hidden", borderLeft: `2px solid ${sam}`, padding: 0 }}>
                  <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.65, transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }} className="hover:scale-105" />
                </div>
                <div style={{ width: "3rem", height: 2, background: sam, marginBottom: "1.2rem" }} />
                <h3 className="text-foreground font-bold text-base md:text-lg tracking-wider uppercase mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-[1.7] tracking-wide">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default SamTab;
