"use client";

import Link from "next/link";

const SiteFooter = () => {
  return (
    <footer
      className="pt-16 pb-10 px-6 md:px-12 lg:px-16 border-t border-border/30 relative z-[1]"
      aria-labelledby="site-footer-heading"
    >
      <h2 id="site-footer-heading" className="sr-only">
        Site footer
      </h2>

      {/* Brand band */}
      <div className="max-w-6xl mx-auto mb-10 md:mb-14">
        <p className="font-bold text-xl tracking-[0.15em] uppercase text-foreground mb-2">
          NEMI AI
        </p>
        <p className="text-xs md:text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Full-stack, end-to-end manufacturing automation with Physical AI.
        </p>
      </div>

      {/* 3-column footer nav */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
        {/* Platform */}
        <nav aria-label="Platform links">
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground font-bold mb-4">
            Platform
          </p>
          <ul className="flex flex-col gap-2 list-none p-0">
            {[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: "Technology", href: "/technology" },
            ].map((item) => (
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
        <nav aria-label="Company links">
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground font-bold mb-4">
            Company
          </p>
          <ul className="flex flex-col gap-2 list-none p-0">
            {[
              { label: "About", href: "/about" },
              { label: "Careers", href: "/careers" },
              { label: "Sitemap", href: "/sitemap.xml" },
            ].map((item) => (
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

        {/* Contact */}
        <div>
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground font-bold mb-4">
            Contact
          </p>
          <ul className="flex flex-col gap-2 list-none p-0">
            <li>
              <a
                href="mailto:info@nemi-ai.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                info@nemi-ai.com
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/nemi-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block mt-2"
              >
                LinkedIn &rarr;
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          &copy; 2026 NEMI AI. All rights reserved.
        </p>
        <p className="text-[0.65rem] tracking-[0.15em] uppercase text-muted-foreground/60">
          AS9100D · ISO 9001
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
