import type { Metadata } from "next";
import { Suspense } from "react";
import Services from "@/views/Services";

export const metadata: Metadata = {
  title: "Services | NEMI AI, Full-Stack Manufacturing Automation",
  description:
    "Cost unmatched. Quality par excellence. Speed never before seen. Full-stack manufacturing services under one Physical AI platform.",
  alternates: { canonical: "https://nemi-ai.com/services" },
  openGraph: {
    title: "Services | NEMI AI",
    description:
      "Full-stack manufacturing under one Physical AI platform. Cost, Quality, Speed.",
    url: "https://nemi-ai.com/services",
    images: [
      {
        url: "https://nemi-ai.com/Images/nemi%2001.png",
        width: 1200,
        height: 630,
        alt: "NEMI AI, End-to-End Physical AI Platform for Manufacturing",
      },
    ],
  },
  twitter: { card: "summary_large_image",
    title: "Services | NEMI AI",
    description:
      "Full-stack manufacturing under one Physical AI platform. Cost, Quality, Speed.",
    images: ["https://nemi-ai.com/Images/nemi%2001.png"],
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
      "Full-stack manufacturing services under one Physical AI platform.",
    isPartOf: { "@id": "https://nemi-ai.com/#website" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://nemi-ai.com/" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://nemi-ai.com/services" },
      ],
    },
  };

  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "NEMI AI Manufacturing Services",
    itemListElement: [
      { "@type": "Offer", name: "Tooling & Fixturing", description: "Injection moulding, die casting, press tools, fixtures." },
      { "@type": "Offer", name: "SPMs", description: "Special purpose machinery and robotic automation for production." },
      { "@type": "Offer", name: "Metal Parts Manufacturing", description: "Cutting, bending, forming, welding, machining, casting, forging." },
      { "@type": "Offer", name: "Plastics, Rubbers, Composites", description: "Injection moulding, extrusion, blow moulding, thermoforming." },
      { "@type": "Offer", name: "Battery Manufacturing", description: "Portable chargers to drones to EVs to industrial energy storage." },
      { "@type": "Offer", name: "Motor Manufacturing", description: "Design and manufacturing of BLDC, Axial Flux and other motors." },
      { "@type": "Offer", name: "Electronics Production", description: "PCB assemblies, box builds, system integration and testing." },
      { "@type": "Offer", name: "Speedshop", description: "Rapid response production for fast turnaround." },
      { "@type": "Offer", name: "Complex Assemblies", description: "Multiple part types into complex assemblies for EVs, drones, robotics." },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />

      {/*
        sr-only: Visually hidden but fully readable by search engines and AI
        crawlers. The visible Services view is scroll-progress driven and renders
        empty until JS hydrates — so we mirror the canonical content here for
        indexing (services, industries, case studies).
      */}
      <div className="sr-only" aria-hidden="false">
        <main>
          <h2>Services | NEMI AI, Full-Stack Manufacturing Automation</h2>
          <p>
            We deliver on what matters: <strong>Cost, Quality, Speed</strong>. Cost
            unmatched. Quality par excellence. Speed never before seen. Physical AI turns
            every job into compounding advantage.
          </p>

          <section aria-label="Services we offer">
            <h2>Full-Stack Manufacturing Services</h2>
            <ul>
              <li><strong>Tooling &amp; Fixturing.</strong> Injection moulding, die casting, press tools, fixtures.</li>
              <li><strong>SPMs.</strong> Special purpose machinery and robotic automation for production.</li>
              <li><strong>Metal Parts Manufacturing.</strong> Cutting, bending, forming, welding, machining, casting, forging.</li>
              <li><strong>Plastics, Rubbers, Composites.</strong> Injection moulding, extrusion, blow moulding, thermoforming.</li>
              <li><strong>Battery Manufacturing.</strong> Portable chargers to drones to EVs to industrial energy storage.</li>
              <li><strong>Motor Manufacturing.</strong> Design and manufacturing of BLDC, Axial Flux and other motors.</li>
              <li><strong>Electronics Production.</strong> PCB assemblies, box builds, system integration and testing.</li>
              <li><strong>Speedshop.</strong> Rapid response production for fast turnaround.</li>
              <li><strong>Complex Assemblies.</strong> Multiple part types into complex assemblies, EVs, drones, robotics.</li>
            </ul>
          </section>

          <section aria-label="Industries we serve">
            <h2>Industries We Serve</h2>
            <ul>
              <li>
                <strong>Aerospace &amp; Defense.</strong> AS9100D-certified production of
                UAV airframes, structural assemblies and mission electronics for defense
                primes.
              </li>
              <li>
                <strong>Automotive.</strong> Electronics and battery enclosures: PCBAs,
                sensor modules, EV battery enclosures and trim assemblies for automotive
                OEMs.
              </li>
              <li>
                <strong>Appliance &amp; Consumer Hardware.</strong> Connected appliances
                and consumer hardware: PCBs, plastics, sheet metal and final assembly
                under one roof.
              </li>
              <li>
                <strong>Robotics &amp; AI.</strong> Industrial robot platforms: precision
                actuators, vision modules and motion control sub-systems.
              </li>
            </ul>
            <p>
              From aerospace and automotive to consumer hardware and robotics, NEMI
              partners with manufacturers across every sector that demands precision,
              scale, and speed.
            </p>
          </section>

          <section aria-label="Case studies">
            <h2>Case Studies</h2>

            <h3>Case Study 1, Electric Motorcycle for Africa</h3>
            <p>
              <em>Context.</em> Ruggedised electric motorcycle design required for
              African road conditions and bike taxi use cases.
            </p>
            <p>
              <em>Outcome.</em> PRD to production-ready in 6 months, delivering full CAD
              and component designs. Tooling and fixture designs, and supplier base all
              delivered in additional 3 months.
            </p>
            <ul>
              <li>Design time: 24 months traditional → 9 months with NEMI.</li>
              <li>Development cost: baseline → 1/10th with NEMI integrated stack.</li>
            </ul>

            <h3>Case Study 2, Aerospace Machined Parts</h3>
            <p>
              <em>Context.</em> Mass production of aluminium 6061-T651 machined parts
              with tight tolerances under 2 micron.
            </p>
            <p>
              <em>Outcome.</em> Created fixturing and innovative methods to manufacture
              part in standard 3-axis instead of 5-axis.
            </p>
            <ul>
              <li>Machining time: 9 hrs/part (5-axis) → 3 hrs/part (NEMI 3-axis with fixturing).</li>
              <li>Cost reduction: greater than 50% versus industry-standard aerospace machining.</li>
            </ul>

            <h3>Case Study 3, Complex Assembly Production</h3>
            <p>
              <em>Context.</em> Mass production of automated coffee machine.
            </p>
            <p>
              <em>Outcome.</em> End-to-end manufacturing from fabrication, machining,
              electronics, wiring harnesses to complete assembly.
            </p>
            <ul>
              <li>Initial setup lead time: benchmark → under 6 weeks with NEMI in-house tooling.</li>
              <li>Cost reduction: greater than 30% versus traditional outsourced assembly.</li>
            </ul>
          </section>

          <section aria-label="Certifications">
            <h2>Certifications</h2>
            <ul>
              <li>AS9100D (Aerospace / Defense)</li>
              <li>ISO 9001:2015</li>
            </ul>
          </section>

          <section aria-label="Contact">
            <h2>Talk to Us</h2>
            <p>
              Ready to build with NEMI? Email
              {" "}<a href="mailto:info@nemi-ai.com">info@nemi-ai.com</a>.
            </p>
          </section>
        </main>
      </div>

      <Suspense fallback={null}>
        <Services />
      </Suspense>
    </>
  );
}
