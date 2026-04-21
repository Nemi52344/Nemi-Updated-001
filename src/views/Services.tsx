"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ScrollReveal from "@/hooks/ScrollReveal";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import Navbar from "@/components/Navbar";
import TabContent from "@/components/services/TabContent";
import AkioTab from "@/components/services/AkioTab";
import HenryTab from "@/components/services/HenryTab";
import SamTab from "@/components/services/SamTab";

const FOOTER_NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Technology", href: "/technology" },
  { label: "Proof", href: "/proof" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Investors", href: "/investors" },
];

const tabs = [
  { key: "akio", label: "AKIO", colorClass: "text-[hsl(0,72%,52%)]", borderClass: "border-b-[hsl(0,72%,52%)]", dotBg: "bg-[hsl(0,72%,52%)]" },
  { key: "henry", label: "Henry", colorClass: "text-[hsl(217,91%,60%)]", borderClass: "border-b-[hsl(217,91%,60%)]", dotBg: "bg-[hsl(217,91%,60%)]" },
  { key: "sam", label: "SAM", colorClass: "text-[hsl(142,71%,45%)]", borderClass: "border-b-[hsl(142,71%,45%)]", dotBg: "bg-[hsl(142,71%,45%)]" },
] as const;

type TabKey = typeof tabs[number]["key"];

const Services = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("akio");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTabChange = (key: TabKey) => {
    setActiveTab(key);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  return (
    <div className="bg-background text-foreground font-['Montserrat',sans-serif] font-light min-h-screen relative">
      {/* CONSTELLATION + GLOW BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <ConstellationCanvas />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 45%, hsl(var(--accent) / 0.18) 0%, transparent 65%)",
          }}
        />
      </div>
      {/* NAV */}
      <Navbar />

      {/* ── PLATFORM OVERVIEW — all three suites visible without tab click ── */}
      <section className="relative z-[1] pt-24 md:pt-28 pb-12 md:pb-16 px-6 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-bold text-center">
              The Platform
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-[1.05] text-center mb-4"
              style={{ textShadow: "0 0 25px hsl(275 80% 60% / 0.2), 0 0 50px hsl(270 70% 50% / 0.1)" }}
            >
              Three Systems.<br className="hidden md:block" /> One Manufacturing Brain.
            </h1>
            <p className="text-sm md:text-base text-muted-foreground text-center max-w-2xl mx-auto mb-12 md:mb-14">
              Design, manufacture, and deploy physical products &mdash; under one AI stack.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                label: "AKIO",
                subtitle: "Design Intelligence Suite",
                body:
                  "AI-powered product and component design. From idea to production-ready validated design in weeks, not months. Concept design, CAD generation, simulation, prototyping, and PLM integration.",
                color: "hsl(0 72% 52%)",
                tabKey: "akio" as const,
              },
              {
                label: "HENRY",
                subtitle: "AI-Driven Manufacturing",
                body:
                  "Full-stack manufacturing partner. Covers metal parts, CNC machining, injection moulding, tooling and fixturing, electronics production, battery manufacturing, motor production, and complex assemblies.",
                color: "hsl(217 91% 60%)",
                tabKey: "henry" as const,
              },
              {
                label: "SAM",
                subtitle: "Deployment & Lifecycle",
                body:
                  "Fleet deployment, last-mile logistics, leasing, financing, and field monitoring. Real-world performance data from SAM feeds back into AKIO for continuous improvement of future designs.",
                color: "hsl(142 71% 45%)",
                tabKey: "sam" as const,
              },
            ].map((suite, i) => (
              <ScrollReveal key={suite.label} delay={i * 120}>
                <button
                  onClick={() => handleTabChange(suite.tabKey)}
                  className="text-left rounded-2xl p-6 md:p-7 h-full flex flex-col transition-all duration-300 hover:-translate-y-0.5 cursor-pointer w-full"
                  style={{
                    background: "hsl(230 20% 8% / 0.6)",
                    border: `1px solid ${suite.color.replace(")", " / 0.18)")}`,
                    boxShadow: `0 0 30px ${suite.color.replace(")", " / 0.06)")}`,
                  }}
                >
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: suite.color }} />
                    <span
                      className="text-xl md:text-2xl font-extrabold tracking-[0.08em]"
                      style={{ color: suite.color }}
                    >
                      {suite.label}
                    </span>
                  </div>
                  <p
                    className="text-[0.65rem] tracking-[0.18em] uppercase font-semibold mb-4"
                    style={{ color: suite.color }}
                  >
                    {suite.subtitle}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-5">
                    {suite.body}
                  </p>
                  <span
                    className="mt-auto text-[0.6rem] font-bold tracking-[0.2em] uppercase self-start"
                    style={{ color: suite.color }}
                  >
                    Explore {suite.label} &rarr;
                  </span>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SUB-TAB BAR */}
      <div className="services-sub-tab-bar flex bg-background/80 backdrop-blur-md border-b border-border p-0 sticky top-16 z-[89] relative">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`font-bold text-xs tracking-[0.2em] uppercase flex-1 py-4 px-2 md:px-8 cursor-pointer bg-transparent border-t-0 border-l-0 border-r-0 border-b-2 -mb-px flex items-center justify-center gap-1.5 md:gap-2.5 transition-colors duration-200 ${
                isActive ? `${tab.colorClass} ${tab.borderClass}` : "text-muted-foreground border-b-transparent hover:text-foreground"
              }`}
            >
              <span className={`w-[7px] h-[7px] rounded-full inline-block shrink-0 ${tab.dotBg}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT */}
      <div className="relative overflow-hidden z-[2]">
        <TabContent activeKey={activeTab} tabKey="akio">
          <AkioTab />
        </TabContent>
        <TabContent activeKey={activeTab} tabKey="henry">
          <HenryTab />
        </TabContent>
        <TabContent activeKey={activeTab} tabKey="sam">
          <SamTab />
        </TabContent>
      </div>

      <ScrollReveal>
        <footer
          className="border-t border-border pt-14 pb-10 px-6 md:px-12 lg:px-16"
          aria-labelledby="services-footer-heading"
        >
          <h2 id="services-footer-heading" className="sr-only">
            Site footer
          </h2>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="font-black text-3xl tracking-[0.1em] uppercase">
                NEMI<span className="text-accent">.</span>AI
              </div>
              <div className="font-medium text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground mt-1.5 mb-4">
                AI-Driven Manufacturing Platform
              </div>
              <p className="text-xs text-muted-foreground max-w-sm leading-relaxed mb-3">
                The AI Operating System for Manufacturing. Design, manufacture, and
                deploy physical products under one Large Manufacturing Model.
              </p>
              <p className="text-xs text-muted-foreground">
                <a href="mailto:Humans@nemi-ai.com" className="hover:text-primary transition-colors">
                  Humans@nemi-ai.com
                </a>
                {" · "}
                <a href="mailto:investors@nemi-ai.com" className="hover:text-primary transition-colors">
                  investors@nemi-ai.com
                </a>
              </p>
            </div>

            {/* Explore */}
            <nav aria-label="Footer navigation">
              <p className="text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground font-bold mb-4">
                Explore
              </p>
              <ul className="flex flex-col gap-2 list-none p-0">
                {FOOTER_NAV.slice(0, 4).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Company */}
            <nav aria-label="Company footer navigation">
              <p className="text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground font-bold mb-4">
                Company
              </p>
              <ul className="flex flex-col gap-2 list-none p-0">
                {FOOTER_NAV.slice(4).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="/sitemap.xml"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Sitemap
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; 2026 NEMI AI. All rights reserved.
            </p>
            <p className="text-[0.65rem] tracking-[0.15em] uppercase text-muted-foreground/60">
              AS9100D · ISO 9001 · DRDO Cleared · ISRO Cleared
            </p>
          </div>
        </footer>
      </ScrollReveal>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tab-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .tab-hidden {
          opacity: 0;
          transform: translateY(16px);
          pointer-events: none;
          position: absolute;
          width: 100%;
        }
        @media (max-width: 900px) {
          .services-tab-hero-grid { grid-template-columns: 1fr !important; }
          .services-card-grid { grid-template-columns: 1fr !important; }
          .services-case-grid { grid-template-columns: 1fr !important; }
          .services-tab-hero-left { padding: 4rem 1.5rem 3rem 1.5rem !important; }
          .services-tab-hero-right { min-height: 300px; }
          .services-grid-wrapper { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
          .services-nav-links { display: none !important; }
          .services-nav { padding: 1.25rem 1.5rem !important; }
          .services-sub-tab-bar { overflow-x: auto; padding: 0 1.5rem !important; }
          .services-wide-card { grid-column: span 1 !important; }
          .services-wide-card > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default Services;
