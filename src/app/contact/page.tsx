import type { Metadata } from "next";
import Contact from "@/views/Contact";

export const metadata: Metadata = {
  title: "Contact NEMI AI | Talk to Our Manufacturing Team",
  description:
    "Talk to the NEMI AI team about manufacturing programs across aerospace, automotive, consumer hardware, and robotics. Coimbatore, India.",
  alternates: { canonical: "https://nemi-ai.com/contact" },
  openGraph: {
    title: "Contact NEMI AI",
    description:
      "Reach the NEMI AI manufacturing team. Coimbatore, India · AS9100D · ISO 9001:2015.",
    url: "https://nemi-ai.com/contact",
    images: [
      {
        url: "https://nemi-ai.com/Images/nemi%2001.png",
        width: 1200,
        height: 630,
        alt: "Contact NEMI AI — End-to-End Physical AI Manufacturing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact NEMI AI",
    description:
      "Reach the NEMI AI manufacturing team. Coimbatore, India · AS9100D · ISO 9001:2015.",
    images: ["https://nemi-ai.com/Images/nemi%2001.png"],
  },
};

export default function ContactPage() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://nemi-ai.com/contact#webpage",
    url: "https://nemi-ai.com/contact",
    name: "Contact NEMI AI | Talk to Our Manufacturing Team",
    description:
      "Contact NEMI AI for manufacturing programs, careers, and partnerships.",
    isPartOf: { "@id": "https://nemi-ai.com/#website" },
    about: { "@id": "https://nemi-ai.com/#organization" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://nemi-ai.com/" },
        { "@type": "ListItem", position: 2, name: "Contact", item: "https://nemi-ai.com/contact" },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />

      {/*
        sr-only: Visually hidden but fully readable by crawlers. Mirrors the
        canonical contact content so search engines and AI tools index every
        contact channel without depending on JS.
      */}
      <div className="sr-only" aria-hidden="false">
        <main>
          <h2>Contact NEMI AI</h2>
          <p>
            Talk to our manufacturing team about programs across aerospace, automotive,
            consumer hardware, and robotics. Headquartered in Coimbatore, India, with
            manufacturing operations in Coimbatore and Chennai.
          </p>

          <section aria-label="Departments">
            <h2>Reach the Right Team</h2>
            <ul>
              <li>
                <strong>Sales &amp; Partnerships.</strong>{" "}
                <a href="mailto:info@nemi-ai.com">info@nemi-ai.com</a> &mdash; for
                manufacturing programs, RFPs, capability questions, and partnerships.
              </li>
              <li>
                <strong>Careers.</strong>{" "}
                <a href="mailto:info@nemi-ai.com">info@nemi-ai.com</a> &mdash; for
                open roles across engineering, AI/ML, manufacturing, and operations.
              </li>
              <li>
                <strong>General &amp; Press.</strong>{" "}
                <a href="mailto:info@nemi-ai.com">info@nemi-ai.com</a>
              </li>
              <li>
                <strong>Phone.</strong>{" "}
                <a href="tel:+914220000000">+91 422 XXX XXXX</a>
              </li>
            </ul>
          </section>

          <section aria-label="Locations">
            <h2>Our Locations</h2>
            <p>
              Headquartered in Coimbatore, India. Active manufacturing in Coimbatore and
              Chennai. Expanding to United States, Western Europe, and United Arab Emirates
              in 2026.
            </p>
          </section>

          <section aria-label="Social">
            <h2>Follow NEMI</h2>
            <ul>
              <li><a href="https://www.linkedin.com/company/nemi-ai/">LinkedIn</a></li>
              <li><a href="https://x.com/Nemi_ai_india">X</a></li>
              <li><a href="https://www.instagram.com/nemi_ai_/">Instagram</a></li>
              <li><a href="https://www.youtube.com/channel/UCd2rETRVgkA1WIWZ0epPpqQ">YouTube</a></li>
              <li><a href="https://www.facebook.com/profile.php?id=61590674342019">Facebook</a></li>
            </ul>
          </section>
        </main>
      </div>

      <Contact />
    </>
  );
}
