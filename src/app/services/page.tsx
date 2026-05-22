import type { Metadata } from "next";
import { Suspense } from "react";
import Services from "@/views/Services";

export const metadata: Metadata = {
  title: "Services | NEMI AI, Full-Stack Manufacturing Automation",
  description:
    "Cost unmatched. Quality par excellence. Speed never before seen. Tooling, metal parts, plastics, batteries, motors, electronics, complex assemblies — all under one Physical AI platform.",
  alternates: { canonical: "https://nemi-ai.com/services" },
  openGraph: {
    title: "Services | NEMI AI",
    description:
      "Tooling, metal parts, plastics, batteries, motors, electronics, complex assemblies — full-stack manufacturing under one Physical AI platform.",
    url: "https://nemi-ai.com/services",
  },
  twitter: {
    title: "Services | NEMI AI",
    description:
      "Tooling, metal parts, plastics, batteries, motors, electronics, complex assemblies — full-stack manufacturing under one Physical AI platform.",
  },
};

export default function ServicesPage() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://nemi-ai.com/services#webpage",
    url: "https://nemi-ai.com/services",
    name: "Services | NEMI AI, Full-Stack Manufacturing Automation",
    description:
      "Tooling, metal parts, plastics, batteries, motors, electronics, complex assemblies, all delivered under one Physical AI platform.",
    isPartOf: { "@id": "https://nemi-ai.com/#website" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://nemi-ai.com/" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://nemi-ai.com/services" },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <Suspense fallback={null}>
        <Services />
      </Suspense>
    </>
  );
}
