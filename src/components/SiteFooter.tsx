"use client";

import Link from "next/link";

/**
 * Site-wide footer with sitemap, contact, and certifications.
 * Used at the end of every long-scroll page (Home, About, Services,
 * Industries, Careers, Contact). Renders compactly in mobile landscape
 * to avoid pushing content off the visible area.
 */
const SiteFooter = () => {
  const sitemap: { label: string; href: string }[] = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Industries", href: "/industries" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ];

  const capabilities: { label: string; href: string }[] = [
    { label: "Aerospace & Defense", href: "/industries#aerospace" },
    { label: "Automotive", href: "/industries#automotive" },
    { label: "Appliance & Consumer", href: "/industries#consumer" },
    { label: "Robotics & AI", href: "/industries#robotics" },
  ];

  return (
    <footer
      className="pt-10 pb-6 px-6 md:px-12 lg:px-16 [@media(max-width:900px)and(orientation:landscape)]:!pt-4 [@media(max-width:900px)and(orientation:landscape)]:!pb-3 [@media(max-width:900px)and(orientation:landscape)]:!px-6 border-t border-border/30 relative z-[1]"
      aria-labelledby="site-footer-heading"
    >
      <h2 id="site-footer-heading" className="sr-only">
        Site footer
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 [@media(max-width:900px)and(orientation:landscape)]:!grid-cols-4 gap-6 md:gap-8 [@media(max-width:900px)and(orientation:landscape)]:!gap-3 items-start">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1 [@media(max-width:900px)and(orientation:landscape)]:!col-span-1">
          <p className="font-bold text-base tracking-[0.15em] uppercase text-foreground mb-2">
            NEMI AI
          </p>
          <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed max-w-xs">
            Full-stack, end-to-end manufacturing automation with Physical AI.
            Headquartered in Coimbatore, India.
          </p>
        </div>

        {/* Sitemap */}
        <div>
          <p className="text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground font-bold mb-3">
            Sitemap
          </p>
          <ul className="space-y-1.5">
            {sitemap.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Capabilities / Industries */}
        <div>
          <p className="text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground font-bold mb-3">
            Industries
          </p>
          <ul className="space-y-1.5">
            {capabilities.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground font-bold mb-3">
            Contact
          </p>
          <ul className="space-y-1.5">
            <li>
              <a
                href="mailto:info@nemi-ai.com"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                info@nemi-ai.com
              </a>
            </li>
            <li>
              <a
                href="mailto:careers@nemi-ai.com"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                careers@nemi-ai.com
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/nemi-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
              >
                LinkedIn <span aria-hidden>&rarr;</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar — copyright + certs */}
      <div className="max-w-6xl mx-auto mt-8 pt-4 [@media(max-width:900px)and(orientation:landscape)]:!mt-3 [@media(max-width:900px)and(orientation:landscape)]:!pt-2 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-[11px] text-muted-foreground">
          &copy; 2026 NEMI AI. All rights reserved.
        </p>
        <p className="text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground/60">
          AS9100D &middot; ISO 9001 &middot; DRDO Cleared &middot; ISRO Cleared
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
