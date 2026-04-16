"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import nemiNavLogo from "@/assets/nemi-nav-logo.webp";

interface NavbarProps {
  scrollProgress?: number;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/technology", label: "Technology" },
  { href: "/proof", label: "Proof" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/investors", label: "Investors" },
];

const Navbar = ({ scrollProgress = 1 }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const visible = isHome ? scrollProgress > 0.01 : true;

  if (!visible) return null;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        background: "hsl(var(--background) / 0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid hsl(var(--border) / 0.3)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
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
                className="px-5 py-1.5 text-[0.65rem] font-semibold tracking-[0.12em] uppercase transition-all duration-300 rounded-md relative block"
                style={{ color: isActive ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "hsl(var(--primary))"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "hsl(var(--muted-foreground))"; }}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-[1.1rem] left-0 right-0 h-0.5 bg-accent" />
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/#contact"
            className="font-montserrat font-bold text-[0.65rem] tracking-[0.12em] uppercase bg-accent text-accent-foreground px-5 py-2.5 no-underline transition-opacity duration-200 hover:opacity-80"
          >
            Request Demo
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-px bg-foreground transition-transform duration-300" style={{ transform: menuOpen ? "rotate(45deg) translate(2px, 2px)" : "none" }} />
          <span className="block w-5 h-px bg-foreground transition-opacity duration-300" style={{ opacity: menuOpen ? 0 : 1 }} />
          <span className="block w-5 h-px bg-foreground transition-transform duration-300" style={{ transform: menuOpen ? "rotate(-45deg) translate(2px, -2px)" : "none" }} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-1" style={{ background: "hsl(230 25% 4% / 0.95)", backdropFilter: "blur(16px)" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2 px-3 text-left text-sm tracking-[0.15em] uppercase transition-all duration-300 rounded-md"
              style={{ color: pathname === link.href ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="py-2 px-3 text-left text-sm tracking-[0.15em] uppercase text-accent transition-all duration-300 rounded-md"
            onClick={() => setMenuOpen(false)}
          >
            Get in Touch
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
