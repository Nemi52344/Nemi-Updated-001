"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Linkedin, Twitter, Instagram, Youtube, Facebook, Phone, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { SOCIAL_LINKS, CONTACT_INFO } from "@/lib/socialLinks";

const SOCIAL_ICONS: Record<string, typeof Linkedin> = {
  LinkedIn: Linkedin,
  X: Twitter,
  Instagram: Instagram,
  YouTube: Youtube,
  Facebook: Facebook,
};

interface ContactChannel {
  id: string;
  title: string;
  description: string;
  email: string;
  accent: string;
}

const channels: ContactChannel[] = [
  {
    id: "sales",
    title: "Sales & Partnerships",
    description:
      "Manufacturing programs, RFPs, capability questions, NDAs and partnerships.",
    email: "info@nemi-ai.com",
    accent: "275 80% 65%",
  },
  {
    id: "careers",
    title: "Careers",
    description:
      "Open roles across engineering, AI/ML, manufacturing, and operations.",
    email: "info@nemi-ai.com",
    accent: "210 85% 65%",
  },
  {
    id: "general",
    title: "General & Press",
    description:
      "All other inquiries, media questions, and general communication.",
    email: "info@nemi-ai.com",
    accent: "150 60% 55%",
  },
];

const Contact = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && !window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "hsl(230 25% 4%)" }}>
      <Navbar scrollProgress={1} />

      {/* Hero */}
      <header className="pt-28 pb-12 md:pt-36 md:pb-16 px-6 md:px-12 lg:px-16 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 30%, hsl(275 80% 40% / 0.18) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <p
            className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-semibold mb-3"
            style={{ color: "hsl(275 60% 70%)" }}
          >
            Contact
          </p>
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-5"
            style={{ color: "hsl(0 0% 98%)", textShadow: "0 0 28px hsl(275 80% 60% / 0.35)" }}
          >
            Let&rsquo;s build together.
          </h1>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Whether you&rsquo;re scoping a program, hiring talent, or just curious about the
            Large Manufacturing Model &mdash; the right team will get back to you within one
            business day.
          </p>

          {/* Primary CTA — opens the existing contact modal via the global hash gate */}
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="#contact"
              className="font-bold text-xs tracking-[0.2em] uppercase px-8 py-3.5 rounded-xl text-white transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, hsl(275 80% 55%), hsl(260 70% 45%))",
                boxShadow: "0 4px 24px hsl(275 80% 55% / 0.3)",
                minHeight: 48,
              }}
            >
              Send Us a Message
            </a>
            <a
              href="mailto:info@nemi-ai.com"
              className="font-semibold text-xs tracking-[0.2em] uppercase px-7 py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                color: "hsl(0 0% 95%)",
                border: "1px solid hsl(275 80% 60% / 0.4)",
                background: "hsl(275 80% 30% / 0.08)",
                minHeight: 48,
              }}
            >
              Or Email Directly
            </a>
          </div>
        </div>
      </header>

      {/* Department channels */}
      <main className="px-6 md:px-12 lg:px-16 pb-16 md:pb-24">
        <section className="max-w-6xl mx-auto" aria-label="Reach the right team">
          <div className="text-center mb-8 md:mb-12">
            <h2
              className="text-xl md:text-3xl font-extrabold tracking-tight mb-2"
              style={{ color: "hsl(0 0% 98%)" }}
            >
              Reach the right team
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Pick the channel that matches your need &mdash; we&rsquo;ll route you the first time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {channels.map((ch) => (
              <div
                key={ch.id}
                className="rounded-2xl p-5 md:p-6 transition-transform duration-300 hover:-translate-y-1"
                style={{
                  background: `linear-gradient(145deg, hsl(${ch.accent} / 0.08), hsl(230 25% 6% / 0.6))`,
                  border: `1px solid hsl(${ch.accent} / 0.25)`,
                  boxShadow: `0 0 24px hsl(${ch.accent} / 0.1), inset 0 0 30px hsl(${ch.accent} / 0.04)`,
                }}
              >
                <p
                  className="text-[10px] tracking-[0.25em] uppercase font-bold mb-2"
                  style={{ color: `hsl(${ch.accent})` }}
                >
                  {ch.title}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 min-h-[3rem]">
                  {ch.description}
                </p>
                <a
                  href={`mailto:${ch.email}`}
                  className="inline-block text-sm font-semibold transition-colors"
                  style={{ color: `hsl(${ch.accent})` }}
                >
                  {ch.email} <span aria-hidden>&rarr;</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Locations */}
        <section className="max-w-6xl mx-auto mt-16 md:mt-24" aria-label="Locations">
          <div className="text-center mb-8">
            <h2
              className="text-xl md:text-3xl font-extrabold tracking-tight mb-2"
              style={{ color: "hsl(0 0% 98%)" }}
            >
              Where to find us
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Manufacturing today from India. Expanding to three new regions in 2026.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div
              className="rounded-2xl p-6"
              style={{
                background: "linear-gradient(145deg, hsl(275 80% 55% / 0.10), hsl(230 25% 6% / 0.6))",
                border: "1px solid hsl(275 80% 55% / 0.28)",
              }}
            >
              <p className="text-[10px] tracking-[0.25em] uppercase font-bold mb-2" style={{ color: "hsl(275 60% 70%)" }}>
                Headquarters
              </p>
              <p className="text-lg font-bold text-foreground mb-1">Coimbatore, India</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Engineering, tooling, and assembly under one roof. 300,000+ sq ft of owned
                manufacturing footprint.
              </p>
            </div>

            <div
              className="rounded-2xl p-6"
              style={{
                background: "linear-gradient(145deg, hsl(210 85% 60% / 0.08), hsl(230 25% 6% / 0.6))",
                border: "1px solid hsl(210 85% 60% / 0.25)",
              }}
            >
              <p className="text-[10px] tracking-[0.25em] uppercase font-bold mb-2" style={{ color: "hsl(210 70% 70%)" }}>
                Manufacturing
              </p>
              <p className="text-lg font-bold text-foreground mb-1">Coimbatore &middot; Chennai</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Active production lines across both cities. Coming soon (2026): United States,
                Western Europe, United Arab Emirates.
              </p>
            </div>
          </div>
        </section>

        {/* Quick contact — phone + email side by side */}
        <section className="max-w-6xl mx-auto mt-16 md:mt-20" aria-label="Quick contact">
          <div className="grid sm:grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto">
            <a
              href={`tel:${CONTACT_INFO.phoneTel}`}
              className="flex items-center gap-3 rounded-xl px-5 py-4 transition-all duration-200 hover:scale-[1.02]"
              style={{
                border: "1px solid hsl(275 80% 60% / 0.3)",
                background: "hsl(275 80% 30% / 0.06)",
                minHeight: 56,
              }}
            >
              <span
                className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: "hsl(275 80% 55% / 0.18)",
                  color: "hsl(275 80% 80%)",
                }}
                aria-hidden
              >
                <Phone className="w-4 h-4" />
              </span>
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-muted-foreground">
                  Phone
                </p>
                <p className="text-sm font-semibold text-foreground">{CONTACT_INFO.phoneDisplay}</p>
              </div>
            </a>

            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center gap-3 rounded-xl px-5 py-4 transition-all duration-200 hover:scale-[1.02]"
              style={{
                border: "1px solid hsl(210 85% 60% / 0.3)",
                background: "hsl(210 85% 30% / 0.06)",
                minHeight: 56,
              }}
            >
              <span
                className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: "hsl(210 85% 55% / 0.18)",
                  color: "hsl(210 85% 80%)",
                }}
                aria-hidden
              >
                <Mail className="w-4 h-4" />
              </span>
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-muted-foreground">
                  Email
                </p>
                <p className="text-sm font-semibold text-foreground">{CONTACT_INFO.email}</p>
              </div>
            </a>
          </div>
        </section>

        {/* Social row — all 5 platforms */}
        <section className="max-w-6xl mx-auto mt-12 md:mt-16 text-center" aria-label="Follow NEMI">
          <p className="text-[10px] tracking-[0.3em] uppercase font-semibold text-muted-foreground mb-4">
            Follow NEMI
          </p>
          <ul className="flex justify-center items-center gap-3 flex-wrap">
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
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "hsl(275 80% 55% / 0.10)",
                      border: "1px solid hsl(275 80% 60% / 0.30)",
                      color: "hsl(0 0% 90%)",
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

      </main>

      {/* Bottom CTA — its own full-viewport section so it sits before the footer in the scroll */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-16 text-center relative overflow-hidden py-16"
        aria-labelledby="contact-cta-heading"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 40% 50% at 50% 50%, hsl(275 80% 40% / 0.25) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <h2
            id="contact-cta-heading"
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase mb-5"
            style={{
              color: "hsl(0 0% 98%)",
              textShadow: "0 0 40px hsl(275 80% 60% / 0.5), 0 0 80px hsl(270 70% 50% / 0.3)",
            }}
          >
            Ready to start?
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
            Tell us about your product, volumes, and timelines. We&rsquo;ll come back with a
            scoped response and a path forward.
          </p>
          <Link
            href="/contact#contact"
            className="inline-block font-bold text-xs tracking-[0.2em] uppercase px-10 py-4 rounded-lg text-white transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, hsl(275 80% 55%), hsl(260 70% 45%))",
              boxShadow: "0 4px 25px hsl(275 80% 55% / 0.3)",
              minHeight: 48,
            }}
          >
            Open the Form
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Contact;
