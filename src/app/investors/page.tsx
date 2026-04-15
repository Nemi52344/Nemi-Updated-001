import type { Metadata } from "next";
import InvestorPage from "@/views/InvestorPage";

export const metadata: Metadata = {
  title: "Investor Relations | NEMI AI",
  description:
    "Institutional-grade manufacturing intelligence. Request investor materials, review NEMI's traction, and connect with the team.",
  alternates: { canonical: "https://nemiholdings.com/investors" },
  openGraph: {
    title: "Investor Relations | NEMI AI",
    description:
      "The AI Operating System for Manufacturing. Request investor materials and explore NEMI's institutional-grade manufacturing platform.",
    url: "https://nemiholdings.com/investors",
  },
  twitter: {
    title: "Investor Relations | NEMI AI",
    description:
      "The AI Operating System for Manufacturing. Request investor materials and explore NEMI's institutional-grade manufacturing platform.",
  },
};

export default function InvestorsPage() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://nemiholdings.com/investors#webpage",
    url: "https://nemiholdings.com/investors",
    name: "Investor Relations | NEMI AI",
    description:
      "Institutional-grade manufacturing intelligence. Request investor materials and connect with NEMI.",
    isPartOf: { "@id": "https://nemiholdings.com/#website" },
    about: { "@id": "https://nemiholdings.com/#organization" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://nemiholdings.com/" },
        { "@type": "ListItem", position: 2, name: "Investors", item: "https://nemiholdings.com/investors" },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <InvestorPage />
    </>
  );
}
