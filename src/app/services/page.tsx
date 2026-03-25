import type { Metadata } from "next";
import Services from "@/views/Services";

export const metadata: Metadata = {
  title: "NEMI Services — AKIO, HENRY & SAM | Physical AI Platform",
  description:
    "Explore NEMI's three integrated AI systems: AKIO for design intelligence, HENRY for full-stack manufacturing, and SAM for deployment and lifecycle management.",
  alternates: { canonical: "https://nemiholdings.com/services" },
  openGraph: {
    title: "NEMI Services — AKIO, HENRY & SAM",
    description:
      "Three integrated AI systems. One platform. Design with AKIO, manufacture with HENRY, deploy with SAM.",
    url: "https://nemiholdings.com/services",
  },
  twitter: {
    title: "NEMI Services — AKIO, HENRY & SAM",
    description:
      "Three integrated AI systems. One platform. Design with AKIO, manufacture with HENRY, deploy with SAM.",
  },
};

export default function ServicesPage() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://nemiholdings.com/services#webpage",
    url: "https://nemiholdings.com/services",
    name: "NEMI Services — AKIO, HENRY & SAM | Physical AI Platform",
    description:
      "Explore NEMI's three integrated AI systems: AKIO for design intelligence, HENRY for full-stack manufacturing, and SAM for deployment and lifecycle management.",
    isPartOf: { "@id": "https://nemiholdings.com/#website" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://nemiholdings.com/" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://nemiholdings.com/services" },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <Services />
    </>
  );
}
