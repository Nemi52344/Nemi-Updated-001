import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Providers from "./providers";

const GA_MEASUREMENT_ID = "G-RLBK1DLVN7";

export const metadata: Metadata = {
  metadataBase: new URL("https://nemi-ai.com"),
  authors: [{ name: "NEMI AI" }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    siteName: "NEMI AI",
    images: [
      {
        url: "https://nemi-ai.com/Images/nemi%2001.png",
        width: 1200,
        height: 630,
        alt: "NEMI AI — End-to-End Physical AI Platform for Manufacturing",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@NEMIai",
    creator: "@NEMIai",
    images: [
      {
        url: "https://nemi-ai.com/Images/nemi%2001.png",
        alt: "NEMI AI — End-to-End Physical AI Platform for Manufacturing",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://nemi-ai.com/#organization",
    name: "NEMI AI",
    url: "https://nemi-ai.com",
    logo: {
      "@type": "ImageObject",
      url: "https://nemi-ai.com/Images/nemi%2001.png",
      width: 1200,
      height: 630,
    },
    description:
      "NEMI AI is an end-to-end Physical AI platform. Design with AKIO, manufacture with HENRY, deploy with SAM — powered by the Large Manufacturing Model (LMM).",
    foundingLocation: { "@type": "Place", name: "Bangalore, India" },
    contactPoint: {
      "@type": "ContactPoint",
      email: "Humans@nemi-ai.com",
      contactType: "customer support",
    },
    sameAs: ["https://www.linkedin.com/company/nemi-ai"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "NEMI Platform Services",
      itemListElement: [
        {
          "@type": "Offer",
          name: "AKIO — Design Intelligence Suite",
          description:
            "AI-powered product and component design. From idea to production-ready validated design in weeks, not months.",
          url: "https://nemi-ai.com/services",
        },
        {
          "@type": "Offer",
          name: "HENRY — AI-Driven Manufacturing",
          description:
            "Full-stack manufacturing: tooling, metal parts, battery, motor, electronics, and complex assemblies.",
          url: "https://nemi-ai.com/services",
        },
        {
          "@type": "Offer",
          name: "SAM — Deployment & Lifecycle",
          description:
            "Deploy, monitor, and improve every unit. Real-world performance data feeds back into design.",
          url: "https://nemi-ai.com/services",
        },
      ],
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://nemi-ai.com/#website",
    name: "NEMI AI",
    url: "https://nemi-ai.com",
    description:
      "End-to-End Physical AI Platform for Design, Development, and Distribution of physical products.",
    publisher: { "@id": "https://nemi-ai.com/#organization" },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://nemi-ai.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        {/*
          <noscript> fallback — shown only when JavaScript is disabled.
          Gives search engines without JS + assistive tools a complete,
          readable summary of NEMI and links to every canonical route.
        */}
        <noscript>
          <div style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "2rem",
            color: "hsl(0 0% 95%)",
            background: "hsl(230 25% 4%)",
            fontFamily: "system-ui, -apple-system, sans-serif",
            lineHeight: 1.6,
          }}>
            <h1 style={{ fontSize: "2rem", margin: "0 0 0.5rem" }}>NEMI AI</h1>
            <p style={{ fontSize: "1.25rem", fontWeight: 600, margin: "0 0 1rem" }}>
              The AI Operating System for Manufacturing.
            </p>
            <p style={{ margin: "0 0 1rem", opacity: 0.85 }}>
              Design, manufacture, and deploy physical products &mdash; 10&times; faster,
              at aerospace-grade quality. AS9100D and ISO 9001 certified. DRDO and ISRO cleared.
            </p>
            <h2 style={{ fontSize: "1.1rem", margin: "1.5rem 0 0.5rem" }}>Platform</h2>
            <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
              <li><strong>AKIO</strong> &mdash; Design Intelligence Suite</li>
              <li><strong>HENRY</strong> &mdash; AI-Driven Manufacturing</li>
              <li><strong>SAM</strong> &mdash; Deployment &amp; Lifecycle</li>
              <li>
                Powered by the <strong>Large Manufacturing Model (LMM)</strong>
              </li>
            </ul>
            <h2 style={{ fontSize: "1.1rem", margin: "1.5rem 0 0.5rem" }}>Explore</h2>
            <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
              <li><a href="/services" style={{ color: "hsl(275 80% 65%)" }}>Services (AKIO, HENRY, SAM)</a></li>
              <li><a href="/technology" style={{ color: "hsl(275 80% 65%)" }}>Technology (Large Manufacturing Model)</a></li>
              <li><a href="/proof" style={{ color: "hsl(275 80% 65%)" }}>Proof (case studies, traction)</a></li>
              <li><a href="/about" style={{ color: "hsl(275 80% 65%)" }}>About NEMI AI</a></li>
              <li><a href="/careers" style={{ color: "hsl(275 80% 65%)" }}>Careers</a></li>
              <li><a href="/investors" style={{ color: "hsl(275 80% 65%)" }}>Investor Relations</a></li>
            </ul>
            <p style={{ margin: "1.5rem 0 0", opacity: 0.8 }}>
              Certifications: AS9100D &middot; ISO 9001 &middot; DRDO Cleared &middot; ISRO Cleared.
              <br />
              Contact: <a href="mailto:Humans@nemi-ai.com" style={{ color: "hsl(275 80% 65%)" }}>Humans@nemi-ai.com</a>
              {" "}&middot;{" "}
              <a href="mailto:investors@nemi-ai.com" style={{ color: "hsl(275 80% 65%)" }}>investors@nemi-ai.com</a>
            </p>
            <p style={{ margin: "1rem 0 0", fontSize: "0.85rem", opacity: 0.6 }}>
              This page uses JavaScript for its interactive scroll experience.
              You can still access the full site via the links above.
            </p>
          </div>
        </noscript>

        {/* Google Analytics 4 — loads after interactive so it never blocks LCP */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
