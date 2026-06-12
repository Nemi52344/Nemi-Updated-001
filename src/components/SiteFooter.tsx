"use client";

import Link from "next/link";
import { Linkedin, Twitter, Instagram, Youtube, Facebook } from "lucide-react";
import { SOCIAL_LINKS, CONTACT_INFO } from "@/lib/socialLinks";

/**
 * Site-wide footer with sitemap, contact, social icons, and certifications.
 * Used at the end of every long-scroll page. Renders compactly in mobile
 * landscape to avoid pushing content off the visible area.
 *
 * Social URLs come from src/lib/socialLinks.ts — placeholder URLs are visible
 * in the icon row but excluded from JSON-LD sameAs (handled in layout.tsx).
 */
const SOCIAL_ICONS: Record<string, typeof Linkedin> = {
  LinkedIn: Linkedin,
  X: Twitter,
  Instagram: Instagram,
  YouTube: Youtube,
  Facebook: Facebook,
};

const SiteFooter = () => {
  const sitemap: { label: string; href: string }[] = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer
      className="pt-10 pb-6 px-6 md:px-12 lg:px-16 [@media(max-width:900px)and(orientation:landscape)]:!pt-4 [@media(max-width:900px)and(orientation:landscape)]:!pb-3 [@media(max-width:900px)and(orientation:landscape)]:!px-6 relative z-[1]"
      aria-labelledby="site-footer-heading"
      style={{
        background: "hsl(230 30% 3%)",
        borderTop: "1px solid hsl(275 60% 30% / 0.35)",
        boxShadow: "inset 0 1px 0 hsl(275 80% 60% / 0.08)",
      }}
    >
      <h2 id="site-footer-heading" className="sr-only">
        Site footer
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 [@media(max-width:900px)and(orientation:landscape)]:!grid-cols-3 gap-6 md:gap-8 [@media(max-width:900px)and(orientation:landscape)]:!gap-3 items-start">
        {/* Brand + social icons */}
        <div className="col-span-2 md:col-span-1 [@media(max-width:900px)and(orientation:landscape)]:!col-span-1">
          <p className="font-bold text-base tracking-[0.15em] uppercase text-foreground mb-2">
            NEMI AI
          </p>
          <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed max-w-xs mb-4">
            Full-stack, end-to-end manufacturing automation with Physical AI.
            Headquartered in {CONTACT_INFO.city}.
          </p>

          {/* Social icon row */}
          <ul className="flex items-center gap-2.5" aria-label="Follow NEMI on social media">
            {SOCIAL_LINKS.map((s) => {
              const Icon = SOCIAL_ICONS[s.label] || Linkedin;
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`NEMI on ${s.label}`}
                    title={s.label}
                    className="inline-flex items-center justify-center transition-all duration-200 hover:scale-110"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "hsl(275 80% 55% / 0.10)",
                      border: "1px solid hsl(275 80% 60% / 0.30)",
                      color: "hsl(0 0% 85%)",
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                </li>
              );
            })}
          </ul>
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

        {/* Contact */}
        <div>
          <p className="text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground font-bold mb-3">
            Contact
          </p>
          <ul className="space-y-1.5">
            <li>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {CONTACT_INFO.email}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT_INFO.careersEmail}`}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {CONTACT_INFO.careersEmail}
              </a>
            </li>
            <li>
              <a
                href={`tel:${CONTACT_INFO.phoneTel}`}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {CONTACT_INFO.phoneDisplay}
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
