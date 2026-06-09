import type { Metadata } from "next";
import Industries from "@/views/Industries";

export const metadata: Metadata = {
  title: "Industries We Serve | NEMI AI Manufacturing",
  description:
    "Full-stack manufacturing for Aerospace & Defense, Automotive, Appliance & Consumer Hardware, and Robotics & AI. AS9100D-certified, ISO 9001:2015, DRDO and ISRO cleared.",
  alternates: { canonical: "https://nemi-ai.com/industries" },
  openGraph: {
    title: "Industries We Serve | NEMI AI",
    description:
      "Aerospace, Automotive, Consumer Hardware, and Robotics. One Physical AI manufacturing platform under one roof.",
    url: "https://nemi-ai.com/industries",
    images: [
      {
        url: "https://nemi-ai.com/Images/nemi%2001.png",
        width: 1200,
        height: 630,
        alt: "NEMI AI Industries — Aerospace, Automotive, Consumer, Robotics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries We Serve | NEMI AI",
    description:
      "Aerospace, Automotive, Consumer Hardware, and Robotics. One Physical AI manufacturing platform under one roof.",
    images: ["https://nemi-ai.com/Images/nemi%2001.png"],
  },
};

export default function IndustriesPage() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://nemi-ai.com/industries#webpage",
    url: "https://nemi-ai.com/industries",
    name: "Industries We Serve | NEMI AI Manufacturing",
    description:
      "Full-stack manufacturing services across Aerospace & Defense, Automotive, Appliance & Consumer Hardware, and Robotics & AI.",
    isPartOf: { "@id": "https://nemi-ai.com/#website" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://nemi-ai.com/" },
        { "@type": "ListItem", position: 2, name: "Industries", item: "https://nemi-ai.com/industries" },
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
        canonical industries content so search engines and AI tools have the
        full data even before JS hydrates.
      */}
      <div className="sr-only" aria-hidden="false">
        <main>
          <h2>Industries We Serve</h2>
          <p>
            From aerospace and automotive to consumer hardware and robotics, NEMI partners
            with manufacturers across every sector that demands precision, scale, and speed.
            All under AS9100D and ISO 9001:2015 quality systems, DRDO and ISRO cleared.
          </p>

          <section id="aerospace" aria-label="Aerospace and Defense">
            <h2>Aerospace &amp; Defense</h2>
            <p>
              AS9100D-certified production of UAV airframes, structural assemblies and mission
              electronics for defense primes. DRDO and ISRO cleared facilities. Aluminium
              6061-T651 machined parts under 2-micron tolerance. UAV airframes, structural
              assemblies, mission electronics, ground control systems.
            </p>
            <ul>
              <li>UAV airframes and structural assemblies</li>
              <li>Mission electronics and avionics</li>
              <li>Aluminium and titanium machined parts (under 2-micron tolerance)</li>
              <li>Ground control and tele-command systems</li>
              <li>Defense-grade harnesses and EMI/EMC qualified assemblies</li>
            </ul>
          </section>

          <section id="automotive" aria-label="Automotive">
            <h2>Automotive</h2>
            <p>
              Electronics and battery enclosures for automotive OEMs: PCBAs, sensor modules,
              EV battery enclosures, trim assemblies, telematics and BMS systems. Production
              scale validated from pilot to 100K+ units.
            </p>
            <ul>
              <li>EV battery packs and BMS systems</li>
              <li>PCBA, sensor modules, telematics units</li>
              <li>Sheet-metal enclosures and trim assemblies</li>
              <li>Wiring harnesses, charging ports, motor controllers</li>
              <li>2,500+ EV units already deployed across India and Africa</li>
            </ul>
          </section>

          <section id="consumer" aria-label="Appliance and Consumer Hardware">
            <h2>Appliance &amp; Consumer Hardware</h2>
            <p>
              Connected appliances and consumer hardware: PCBs, plastics, sheet metal and
              final assembly under one roof. End-to-end from injection moulding to FOT (final
              outgoing testing) to packaging.
            </p>
            <ul>
              <li>Connected appliance electronics and IoT modules</li>
              <li>Injection-moulded enclosures and plastic sub-assemblies</li>
              <li>Sheet-metal chassis, brackets, and decorative trim</li>
              <li>Box build, system integration and functional testing</li>
              <li>Kitting, packaging and direct-to-warehouse shipment</li>
            </ul>
          </section>

          <section id="robotics" aria-label="Robotics and AI">
            <h2>Robotics &amp; AI</h2>
            <p>
              Industrial robot platforms: precision actuators, vision modules and motion
              control sub-systems. Complex assemblies for humanoid, robotic arms, and AGVs.
            </p>
            <ul>
              <li>Precision actuators and gearboxes</li>
              <li>BLDC and axial-flux motor manufacturing</li>
              <li>Vision modules and sensor sub-systems</li>
              <li>Motion control and edge-AI compute boards</li>
              <li>Full robotic-arm and humanoid assembly capability</li>
            </ul>
          </section>

          <section aria-label="Certifications">
            <h2>Certifications &amp; Clearances</h2>
            <ul>
              <li>AS9100D (Aerospace / Defense Quality)</li>
              <li>ISO 9001:2015 (Quality Management)</li>
              <li>DRDO Cleared (Defence Research and Development Organisation)</li>
              <li>ISRO Cleared (Indian Space Research Organisation)</li>
            </ul>
          </section>

          <section aria-label="Talk to us">
            <h2>Discuss Your Program</h2>
            <p>
              Ready to manufacture with NEMI? <a href="/contact">Contact our team</a> or
              email <a href="mailto:info@nemi-ai.com">info@nemi-ai.com</a>.
            </p>
          </section>
        </main>
      </div>

      <Industries />
    </>
  );
}
