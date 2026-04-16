"use client";

import Link from "next/link";
import ScrollReveal from "@/hooks/ScrollReveal";

interface PageCTAFooterProps {
  headline: string;
  tagline: string;
  buttonText: string;
  buttonHref: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

const FOOTER_NAV: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Technology", href: "/technology" },
  { label: "Proof", href: "/proof" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Investors", href: "/investors" },
];

const PageCTAFooter = ({
  headline,
  tagline,
  buttonText,
  buttonHref,
  secondaryButtonText,
  secondaryButtonHref,
}: PageCTAFooterProps) => {
  return (
    <>
      {/* ── CTA ── */}
      <section className="py-32 px-6 md:px-12 lg:px-16 text-center relative overflow-hidden z-[1]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 40% 50% at 50% 50%, hsl(275 80% 40% / 0.25) 0%, transparent 60%),
              radial-gradient(ellipse 60% 40% at 50% 50%, hsl(260 70% 30% / 0.15) 0%, transparent 55%)
            `,
          }}
        />
        <ScrollReveal>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase mb-6 relative"
            style={{ textShadow: "0 0 40px hsl(275 80% 60% / 0.5), 0 0 80px hsl(270 70% 50% / 0.3)" }}
          >
            {headline}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <p className="text-sm md:text-lg text-muted-foreground mb-10 tracking-wide relative max-w-[450px] mx-auto">
            {tagline}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={buttonHref}
              className="inline-block font-bold text-xs tracking-[0.2em] uppercase px-10 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 relative text-primary-foreground"
              style={{
                background: "linear-gradient(135deg, hsl(var(--nemi-nebula)), hsl(var(--primary)))",
                boxShadow: "0 4px 25px hsl(var(--primary) / 0.3)",
              }}
            >
              {buttonText}
            </a>
            {secondaryButtonText && secondaryButtonHref && (
              <a
                href={secondaryButtonHref}
                className="inline-block font-bold text-xs tracking-[0.2em] uppercase px-10 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 relative text-foreground"
                style={{
                  border: "1px solid hsl(275 80% 55% / 0.4)",
                  background: "hsl(275 80% 55% / 0.08)",
                  boxShadow: "0 4px 25px hsl(275 80% 55% / 0.1)",
                }}
              >
                {secondaryButtonText}
              </a>
            )}
          </div>
        </ScrollReveal>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="pt-16 pb-10 px-6 md:px-12 lg:px-16 border-t border-border/30 relative z-[1]"
        aria-labelledby="site-footer-heading"
      >
        <h2 id="site-footer-heading" className="sr-only">
          Site footer
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="font-bold text-xl tracking-[0.15em] uppercase text-foreground mb-2">
              NEMI AI
            </p>
            <p className="text-xs md:text-sm text-muted-foreground max-w-sm leading-relaxed mb-4">
              The AI Operating System for Manufacturing. Design, manufacture, and
              deploy physical products under one Large Manufacturing Model.
            </p>
            <p className="text-xs text-muted-foreground">
              <a
                href="mailto:Humans@nemi-ai.com"
                className="hover:text-primary transition-colors"
              >
                Humans@nemi-ai.com
              </a>
              {" · "}
              <a
                href="mailto:investors@nemi-ai.com"
                className="hover:text-primary transition-colors"
              >
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
    </>
  );
};

export default PageCTAFooter;
