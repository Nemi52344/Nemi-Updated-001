"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

import industryAerospace from "@/assets/industry-aerospace.webp";
import industryAutomotive from "@/assets/industry-automotive.webp";
import industryElectronics from "@/assets/industry-electronics.webp";
import industryRobotics from "@/assets/industry-robotics.webp";

interface IndustryBlock {
  id: string;
  name: string;
  kicker: string;
  image: string;
  accent: string; // hsl values
  description: string;
  bullets: string[];
  proofPoint: string;
}

const industries: IndustryBlock[] = [
  {
    id: "aerospace",
    name: "Aerospace & Defense",
    kicker: "AS9100D · DRDO Cleared · ISRO Cleared",
    image: industryAerospace,
    accent: "210 85% 60%",
    description:
      "AS9100D-certified production of UAV airframes, structural assemblies, and mission electronics for defense primes. Aluminium 6061-T651 machined parts under 2-micron tolerance.",
    bullets: [
      "UAV airframes and structural assemblies",
      "Mission electronics and avionics",
      "Aluminium and titanium machined parts",
      "Ground control and tele-command systems",
      "Defense-grade harnesses, EMI/EMC qualified",
    ],
    proofPoint: "9 hrs/part → 3 hrs/part on aerospace machining (50%+ cost reduction)",
  },
  {
    id: "automotive",
    name: "Automotive",
    kicker: "2,500+ EVs deployed",
    image: industryAutomotive,
    accent: "0 75% 60%",
    description:
      "Electronics and battery enclosures for automotive OEMs. PCBAs, sensor modules, EV battery enclosures, BMS systems and trim assemblies. Production validated from pilot to 100K+ units.",
    bullets: [
      "EV battery packs and BMS systems",
      "PCBA, sensor modules, telematics units",
      "Sheet-metal enclosures and trim",
      "Wiring harnesses and motor controllers",
      "Pilot to 100K+ units, multiple times",
    ],
    proofPoint: "EV development cycle compressed from 18 months → 9 months",
  },
  {
    id: "consumer",
    name: "Appliance & Consumer Hardware",
    kicker: "Injection moulding · Box build · FOT",
    image: industryElectronics,
    accent: "45 90% 55%",
    description:
      "Connected appliances and consumer hardware. PCBs, plastics, sheet metal and final assembly under one roof. End-to-end from injection moulding to FOT to packaging.",
    bullets: [
      "Connected appliance electronics and IoT modules",
      "Injection-moulded enclosures and sub-assemblies",
      "Sheet-metal chassis and decorative trim",
      "Box build, system integration, functional testing",
      "Kitting, packaging, direct-to-warehouse shipment",
    ],
    proofPoint: "Complex assembly setup lead time under 6 weeks with in-house tooling",
  },
  {
    id: "robotics",
    name: "Robotics & AI",
    kicker: "Humanoid · Robotic Arm · AGV",
    image: industryRobotics,
    accent: "275 80% 65%",
    description:
      "Industrial robot platforms: precision actuators, vision modules and motion control sub-systems. Complex assemblies for humanoid, robotic arms, and AGVs.",
    bullets: [
      "Precision actuators and gearboxes",
      "BLDC and axial-flux motor manufacturing",
      "Vision modules and sensor sub-systems",
      "Motion control and edge-AI compute boards",
      "Full robotic-arm and humanoid assembly",
    ],
    proofPoint: "End-to-end battery, motor, electronics and mechanical integration",
  },
];

const Industries = () => {
  // Smooth-scroll to hash anchors when arriving via nav/footer links
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      // Wait a tick so the page has rendered
      const t = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
      return () => clearTimeout(t);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "hsl(230 25% 4%)" }}>
      <Navbar scrollProgress={1} />

      {/* Hero */}
      <header className="pt-28 pb-12 md:pt-36 md:pb-16 px-6 md:px-12 lg:px-16 relative overflow-hidden">
        {/* Subtle backdrop glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 30%, hsl(275 80% 40% / 0.15) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto text-center">
          <p
            className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-semibold mb-3"
            style={{ color: "hsl(275 60% 70%)" }}
          >
            Industries We Serve
          </p>
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-5"
            style={{
              color: "hsl(0 0% 98%)",
              textShadow: "0 0 28px hsl(275 80% 60% / 0.35)",
            }}
          >
            One platform.
            <br className="hidden sm:block" />
            <span style={{ color: "hsl(275 80% 75%)" }}> Every industry that demands precision.</span>
          </h1>
          <p className="text-sm md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From aerospace and automotive to consumer hardware and robotics, NEMI partners with
            manufacturers across every sector that demands precision, scale, and speed. All under
            AS9100D and ISO 9001:2015 quality systems.
          </p>

          {/* Industry anchor pills */}
          <nav className="mt-7 flex flex-wrap justify-center gap-2 md:gap-3" aria-label="Jump to industry">
            {industries.map((ind) => (
              <a
                key={ind.id}
                href={`#${ind.id}`}
                className="px-3.5 py-2 rounded-full text-[11px] md:text-xs font-semibold tracking-[0.1em] uppercase transition-all duration-200 hover:scale-[1.03]"
                style={{
                  border: `1px solid hsl(${ind.accent} / 0.35)`,
                  background: `hsl(${ind.accent} / 0.08)`,
                  color: `hsl(${ind.accent})`,
                  minHeight: 36,
                }}
              >
                {ind.name}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Industry blocks */}
      <main className="px-6 md:px-12 lg:px-16 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">
          {industries.map((ind, i) => {
            const reversed = i % 2 === 1;
            return (
              <section
                key={ind.id}
                id={ind.id}
                className="scroll-mt-24 md:scroll-mt-32 grid md:grid-cols-2 gap-8 md:gap-12 items-center"
                aria-labelledby={`${ind.id}-heading`}
              >
                {/* Image */}
                <div
                  className={`relative rounded-2xl overflow-hidden ${reversed ? "md:order-2" : ""}`}
                  style={{
                    border: `1px solid hsl(${ind.accent} / 0.25)`,
                    boxShadow: `0 12px 50px hsl(${ind.accent} / 0.15), inset 0 0 40px hsl(${ind.accent} / 0.06)`,
                  }}
                >
                  <img
                    src={ind.image}
                    alt={ind.name}
                    className="w-full h-56 sm:h-72 md:h-80 lg:h-96 object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Bottom gradient overlay for legibility */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    aria-hidden
                    style={{
                      background:
                        "linear-gradient(to top, hsl(230 25% 4% / 0.55) 0%, transparent 50%)",
                    }}
                  />
                </div>

                {/* Content */}
                <div className={reversed ? "md:order-1" : ""}>
                  <p
                    className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-semibold mb-2"
                    style={{ color: `hsl(${ind.accent})` }}
                  >
                    {ind.kicker}
                  </p>
                  <h2
                    id={`${ind.id}-heading`}
                    className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4"
                    style={{
                      color: "hsl(0 0% 98%)",
                      textShadow: `0 0 22px hsl(${ind.accent} / 0.3)`,
                    }}
                  >
                    {ind.name}
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5">
                    {ind.description}
                  </p>
                  <ul className="space-y-2 mb-5">
                    {ind.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm md:text-[0.95rem] text-foreground/90">
                        <span
                          aria-hidden
                          className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                          style={{ background: `hsl(${ind.accent})`, boxShadow: `0 0 8px hsl(${ind.accent} / 0.6)` }}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div
                    className="rounded-lg px-4 py-3 text-xs md:text-sm"
                    style={{
                      background: `hsl(${ind.accent} / 0.08)`,
                      border: `1px solid hsl(${ind.accent} / 0.25)`,
                      color: `hsl(${ind.accent})`,
                    }}
                  >
                    <span className="font-bold tracking-wide">Proof Point: </span>
                    <span className="text-foreground/85">{ind.proofPoint}</span>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="max-w-4xl mx-auto mt-20 md:mt-28 text-center">
          <h2
            className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4"
            style={{ color: "hsl(0 0% 98%)" }}
          >
            Building in any of these?
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
            We&rsquo;ll work with your team from design and tooling through production and
            deployment, with the Large Manufacturing Model compounding every cycle.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/contact"
              className="font-bold text-xs tracking-[0.2em] uppercase px-8 py-3.5 rounded-xl text-white transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, hsl(275 80% 55%), hsl(260 70% 45%))",
                boxShadow: "0 4px 24px hsl(275 80% 55% / 0.3)",
                minHeight: 48,
              }}
            >
              Talk to Our Team
            </Link>
            <Link
              href="/services"
              className="font-semibold text-xs tracking-[0.2em] uppercase px-7 py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                color: "hsl(0 0% 95%)",
                border: "1px solid hsl(275 80% 60% / 0.4)",
                background: "hsl(275 80% 30% / 0.08)",
                minHeight: 48,
              }}
            >
              See Services
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Industries;
