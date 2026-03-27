import type { Metadata } from "next";
import Technology from "@/views/Technology";

export const metadata: Metadata = {
  title: "NEMI LMM Technology — Large Manufacturing Model | NEMI AI",
  description:
    "NEMI's proprietary Large Manufacturing Model (LMM) is trained on real CAD, sensor, and production data. Discover the AI architecture powering the Physical AI revolution.",
  alternates: { canonical: "https://nemiholdings.com/technology" },
  openGraph: {
    title: "NEMI LMM Technology — Large Manufacturing Model",
    description:
      "The LMM is trained on real manufacturing data — CAD, sensors, quality outcomes — creating an AI that gets smarter with every production job.",
    url: "https://nemiholdings.com/technology",
  },
  twitter: {
    title: "NEMI LMM Technology — Large Manufacturing Model",
    description:
      "The LMM is trained on real manufacturing data — CAD, sensors, quality outcomes — creating an AI that gets smarter with every production job.",
  },
};

export default function TechnologyPage() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://nemiholdings.com/technology#webpage",
    url: "https://nemiholdings.com/technology",
    name: "NEMI LMM Technology — Large Manufacturing Model | NEMI AI",
    description:
      "NEMI's proprietary Large Manufacturing Model (LMM) is trained on real CAD, sensor, and production data.",
    isPartOf: { "@id": "https://nemiholdings.com/#website" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://nemiholdings.com/" },
        { "@type": "ListItem", position: 2, name: "Technology", item: "https://nemiholdings.com/technology" },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <Technology />
    </>
  );
}
