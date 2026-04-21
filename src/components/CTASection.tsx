import Link from "next/link";
import nemiNavLogo from "@/assets/nemi-nav-logo.webp";
import { Mail } from "lucide-react";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Technology", href: "/technology" },
  { label: "Proof", href: "/proof" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Investors", href: "/investors" },
];

interface CTASectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const CTASection = ({ scrollProgress }: CTASectionProps) => {
  const sectionVisible = scrollProgress > 0.92;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.93, 0.96));

  if (!sectionVisible) return null;

  return (
    <div
      className="fixed inset-0 flex flex-col pointer-events-auto"
      style={{ zIndex: 45, opacity: enterP, background: "hsl(230 25% 4%)" }}
    >
      {/* CTA — centered */}
      <div className="flex-1 flex items-center justify-center relative px-6">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 45% 50% at 50% 45%, hsl(275 80% 40% / 0.3) 0%, transparent 60%),
              radial-gradient(ellipse 60% 45% at 50% 50%, hsl(260 70% 30% / 0.18) 0%, transparent 55%)
            `,
          }}
        />
        <div className="text-center relative z-[2]">
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase mb-5"
            style={{ textShadow: "0 0 40px hsl(275 80% 60% / 0.5), 0 0 80px hsl(270 70% 50% / 0.3)" }}
          >
            Ready to Build?
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground mb-8 tracking-wide max-w-[450px] mx-auto">
            See what Physical AI can do for your products.
          </p>
          <a
            href="mailto:Humans@nemi-ai.com?subject=Book%20a%20Walkthrough"
            className="inline-block font-bold text-xs tracking-[0.2em] uppercase px-10 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 text-primary-foreground mb-6"
            style={{
              background: "linear-gradient(135deg, hsl(var(--nemi-nebula)), hsl(var(--primary)))",
              boxShadow: "0 4px 25px hsl(var(--primary) / 0.3)",
            }}
          >
            Book a Walkthrough
          </a>
          <div className="flex flex-wrap items-center justify-center gap-x-6 md:gap-x-8 gap-y-2 mt-2">
            <a
              href="mailto:Humans@nemi-ai.com"
              className="text-xs tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="text-[0.6rem] uppercase tracking-[0.2em] text-primary/70 mr-2">General</span>
              Humans@nemi-ai.com
            </a>
            <span className="text-primary/30 hidden md:inline">&middot;</span>
            <a
              href="mailto:investors@nemi-ai.com"
              className="text-xs tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="text-[0.6rem] uppercase tracking-[0.2em] text-primary/70 mr-2">Investors</span>
              investors@nemi-ai.com
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/30 px-6 md:px-16" aria-labelledby="home-footer-heading">
        <h2 id="home-footer-heading" className="sr-only">Site footer</h2>
        <div className="max-w-6xl mx-auto py-6 flex flex-col gap-4">
          {/* Top row — branding + contact */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={nemiNavLogo}
                alt="NEMI"
                className="h-5 md:h-6 w-auto object-contain"
                style={{ filter: "drop-shadow(0 0 8px hsl(275 80% 60% / 0.4))" }}
                decoding="async"
              />
              <span className="text-[0.6rem] md:text-xs tracking-[0.3em] uppercase text-muted-foreground">
                Physical AI Platform
              </span>
            </div>
            <a
              href="mailto:Humans@nemi-ai.com"
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-primary" />
              Humans@nemi-ai.com
            </a>
            <p className="text-[10px] md:text-xs text-muted-foreground/60">
              © 2026 NEMI AI. All rights reserved.
            </p>
          </div>
          {/* Nav links — help crawlers reach every page */}
          <nav aria-label="Footer navigation" className="border-t border-border/20 pt-3">
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 list-none p-0">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.65rem] md:text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="/sitemap.xml"
                  className="text-[0.65rem] md:text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sitemap
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default CTASection;
