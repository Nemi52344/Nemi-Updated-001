import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

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
      "NEMI AI is the world's first end-to-end Physical AI platform. Design with AKIO, manufacture with HENRY, deploy with SAM — powered by the Large Manufacturing Model (LMM).",
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
