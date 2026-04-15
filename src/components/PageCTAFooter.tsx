"use client";

import ScrollReveal from "@/hooks/ScrollReveal";

interface PageCTAFooterProps {
  headline: string;
  tagline: string;
  buttonText: string;
  buttonHref: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

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
      <footer className="py-12 px-6 md:px-12 lg:px-16 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-[1]">
        <span className="font-bold text-xl tracking-[0.1em] uppercase text-muted-foreground">NEMI</span>
        <p className="text-sm text-muted-foreground">&copy; 2026 NEMI. All rights reserved.</p>
      </footer>
    </>
  );
};

export default PageCTAFooter;
