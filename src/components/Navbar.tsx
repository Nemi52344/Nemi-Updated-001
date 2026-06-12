"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import nemiNavLogo from "@/assets/nemi-nav-logo.webp";

interface NavbarProps {
  scrollProgress?: number;
}

const navLinks: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/careers", label: "Careers" },
];

const Navbar = ({ scrollProgress = 1 }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const visible = isHome ? scrollProgress > 0.01 : true;

  // Lock body scroll when full-screen mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  if (!visible) return null;

  return (
    <>
      {/* Floating island header — detached from the viewport edges, fully
          rounded, frosted glass. Capped at max-w-5xl and centered (mx-auto)
          so on wide screens the bar hugs its content instead of spanning the
          full width; left-3/right-3 keep a small gap on phones. */}
      <nav
        className="fixed top-3 left-3 right-3 md:top-4 z-[100] mx-auto max-w-5xl rounded-2xl transition-all duration-500 glass-header"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(calc(-100% - 24px))",
        }}
      >
        <div className="w-full px-4 md:px-6 flex items-center justify-between h-12">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              src={nemiNavLogo}
              alt="NEMI"
              className="h-5 w-auto object-contain"
              style={{ filter: "drop-shadow(0 0 8px hsl(275 80% 60% / 0.4))" }} decoding="async"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 lg:px-5 py-1.5 text-[0.65rem] font-semibold tracking-[0.12em] uppercase transition-all duration-300 rounded-md relative block"
                  style={{ color: isActive ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "hsl(var(--primary))"; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "hsl(var(--muted-foreground))"; }}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-[0.65rem] left-0 right-0 h-0.5 bg-accent" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/contact"
              className="font-montserrat font-bold text-[0.65rem] tracking-[0.12em] uppercase bg-accent text-accent-foreground px-5 py-2 rounded-lg no-underline transition-opacity duration-200 hover:opacity-80"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-3 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{ minWidth: 44, minHeight: 44 }}
          >
            <span className="block w-5 h-px bg-foreground transition-transform duration-300" style={{ transform: menuOpen ? "rotate(45deg) translate(2px, 2px)" : "none" }} />
            <span className="block w-5 h-px bg-foreground transition-opacity duration-300" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-5 h-px bg-foreground transition-transform duration-300" style={{ transform: menuOpen ? "rotate(-45deg) translate(2px, -2px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[99] md:hidden flex flex-col glass-menu">
          {/* Spacer clearing the floating nav bar above (12px gap + 48px bar) */}
          <div className="h-20 shrink-0" />

          {/* Nav links — large touch targets, divided */}
          <nav className="flex-1 overflow-y-auto px-6 py-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between py-5 text-lg font-semibold tracking-[0.1em] uppercase border-b transition-colors"
                  style={{
                    color: isActive ? "hsl(275 80% 70%)" : "hsl(var(--foreground))",
                    borderColor: "hsl(var(--border) / 0.25)",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{link.label}</span>
                  <span
                    aria-hidden
                    style={{ color: isActive ? "hsl(275 80% 70%)" : "hsl(var(--muted-foreground))" }}
                  >
                    →
                  </span>
                </Link>
              );
            })}

            {/* CTA */}
            <Link
              href="/contact"
              className="mt-8 flex items-center justify-center py-4 text-base font-bold tracking-[0.15em] uppercase rounded-lg text-white"
              style={{
                background: "linear-gradient(135deg, hsl(275 80% 55%), hsl(260 70% 45%))",
                boxShadow: "0 4px 24px hsl(275 80% 55% / 0.3)",
                minHeight: 56,
              }}
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>
          </nav>

          {/* Menu footer — contact + LinkedIn + certs */}
          <div className="px-6 py-6 border-t shrink-0 space-y-2.5" style={{ borderColor: "hsl(var(--border) / 0.2)" }}>
            <a
              href="mailto:info@nemi-ai.com"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              info@nemi-ai.com
            </a>
            <a
              href="https://www.linkedin.com/company/nemi-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn &rarr;
            </a>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/60 pt-2">
              AS9100D &middot; ISO 9001 &middot; Coimbatore, India
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
