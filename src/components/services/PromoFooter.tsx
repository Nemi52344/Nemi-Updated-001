"use client";

import Link from "next/link";

const akio = "hsl(0, 72%, 52%)";
const henry = "hsl(217, 91%, 60%)";
const sam = "hsl(142, 71%, 45%)";

const NameLink = ({
  href,
  color,
  children,
}: {
  href: string;
  color: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    style={{ color }}
    className="hover:underline focus:underline outline-none transition-[text-shadow] duration-200 hover:[text-shadow:0_0_24px_currentColor]"
  >
    {children}
  </Link>
);

const PromoFooter = () => (
  <div className="bg-card border-t border-b border-border" style={{ padding: "3rem", textAlign: "center" }}>
    <p
      className="text-foreground/40 font-bold tracking-wider uppercase leading-relaxed"
      style={{ fontSize: "clamp(1.2rem, 2.2vw, 2.2rem)" }}
    >
      Design with{" "}
      <NameLink href="/services?tab=akio" color={akio}>
        AKIO
      </NameLink>
      .{"   "}
      Build with{" "}
      <NameLink href="/services?tab=henry" color={henry}>
        HENRY
      </NameLink>
      .{"   "}
      Deploy with{" "}
      <NameLink href="/services?tab=sam" color={sam}>
        SAM
      </NameLink>
      .
    </p>
  </div>
);

export default PromoFooter;
