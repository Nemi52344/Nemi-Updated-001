import type { Metadata } from "next";
import ProofPage from "@/views/ProofPage";

export const metadata: Metadata = {
  title: "Production Systems, Not Pilots | NEMI AI",
  description:
    "Real factories, real customers, repeatable outcomes. Explore NEMI's flagship case studies, traction metrics, and institutional credibility.",
  alternates: { canonical: "https://nemi-ai.com/proof" },
  openGraph: {
    title: "Production Systems, Not Pilots | NEMI AI",
    description:
      "36+ enterprise customers, 90%+ retention, 300%+ expansion pipeline. See the proof behind NEMI's AI manufacturing platform.",
    url: "https://nemi-ai.com/proof",
  },
  twitter: {
    title: "Production Systems, Not Pilots | NEMI AI",
    description:
      "36+ enterprise customers, 90%+ retention, 300%+ expansion pipeline. See the proof behind NEMI's AI manufacturing platform.",
  },
};

export default function Proof() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://nemi-ai.com/proof#webpage",
    url: "https://nemi-ai.com/proof",
    name: "Production Systems, Not Pilots | NEMI AI",
    description:
      "Real factories, real customers, repeatable outcomes. Explore NEMI's flagship case studies and traction metrics.",
    isPartOf: { "@id": "https://nemi-ai.com/#website" },
    about: { "@id": "https://nemi-ai.com/#organization" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://nemi-ai.com/" },
        { "@type": "ListItem", position: 2, name: "Proof", item: "https://nemi-ai.com/proof" },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <ProofPage />
    </>
  );
}
