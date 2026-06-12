import type { Metadata } from "next";
import AboutUs from "@/views/AboutUs";

export const metadata: Metadata = {
  title: "About NEMI AI, Building the Future of Manufacturing",
  description:
    "Learn about NEMI AI, the team, mission, and technology behind the end-to-end Physical AI manufacturing platform. Led from Coimbatore, India.",
  alternates: { canonical: "https://nemi-ai.com/about" },
  openGraph: {
    title: "About NEMI AI, Building the Future of Manufacturing",
    description:
      "Meet the team behind NEMI, combining Physical AI, deep manufacturing know-how, and Coimbatore's engineering advantage to reshape global manufacturing.",
    url: "https://nemi-ai.com/about",
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
    title: "About NEMI AI, Building the Future of Manufacturing",
    description:
      "Meet the team behind NEMI, combining Physical AI, deep manufacturing know-how, and Coimbatore's engineering advantage to reshape global manufacturing.",
    images: ["https://nemi-ai.com/Images/nemi%2001.png"],
  },
};

export default function AboutPage() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://nemi-ai.com/about#webpage",
    url: "https://nemi-ai.com/about",
    name: "About NEMI AI, Building the Future of Manufacturing",
    description:
      "Learn about NEMI AI, the team, mission, and technology behind the end-to-end Physical AI manufacturing platform.",
    isPartOf: { "@id": "https://nemi-ai.com/#website" },
    about: { "@id": "https://nemi-ai.com/#organization" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://nemi-ai.com/" },
        { "@type": "ListItem", position: 2, name: "About", item: "https://nemi-ai.com/about" },
      ],
    },
  };

  // Structured data for the team — separate from the page schema so crawlers
  // and AI screening tools can ingest the org's people directly.
  const teamJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://nemi-ai.com/#organization-team",
    name: "NEMI AI",
    url: "https://nemi-ai.com",
    employee: [
      { "@type": "Person", name: "Anirudh Ravi Narayanan", jobTitle: "Chief Executive Officer", sameAs: "https://www.linkedin.com/in/anirudh-narayanan-26b0a121/" },
      { "@type": "Person", name: "Gokul Madhavan", jobTitle: "Chief Financial Officer", sameAs: "https://www.linkedin.com/in/madhavangokul/" },
      { "@type": "Person", name: "Shreerith Seshadri", jobTitle: "Chief Technology Officer", sameAs: "https://www.linkedin.com/in/shreerith-seshadri/" },
      { "@type": "Person", name: "Vinoth Thiruvenkatasamy", jobTitle: "Chief Operating Officer", sameAs: "https://www.linkedin.com/in/vinoth-thiruvenkatasamy-523338219/" },
      { "@type": "Person", name: "Subramanian Rangaswamy", jobTitle: "CFO, India" },
      { "@type": "Person", name: "Vijay Ragavalu", jobTitle: "Manufacturing Head" },
      { "@type": "Person", name: "Sadasivam Balasubramaniam", jobTitle: "Electrical Head" },
      { "@type": "Person", name: "Vijay Ramakrishnan", jobTitle: "Distribution Head" },
    ],
    member: [
      { "@type": "Person", name: "Sam Swaminathan", jobTitle: "Non-Executive Board Member" },
      { "@type": "Person", name: "Naoya Nishimura", jobTitle: "Non-Executive Board Member" },
      { "@type": "Person", name: "Dr. Sampath Ravinarayanan", jobTitle: "Board Advisor" },
      { "@type": "Person", name: "Ramesh Mangaleshwaran", jobTitle: "Advisor" },
      { "@type": "Person", name: "Vinod K. Dasari", jobTitle: "Advisor" },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamJsonLd) }}
      />

      {/*
        sr-only: Visually hidden but fully readable by search engines and AI
        crawlers. The visible AboutUs view is scroll-progress driven and renders
        empty until JS hydrates — so we mirror the canonical content here for
        indexing (team, board, advisors, journey, locations).
      */}
      <div className="sr-only" aria-hidden="false">
        <main>
          <h2>About NEMI AI</h2>
          <p>
            NEMI AI is a full-stack, end-to-end manufacturing automation platform powered
            by Physical AI. Headquartered in Coimbatore, India, with manufacturing
            operations in Coimbatore and Chennai, NEMI compresses traditional months of
            product development into hours, days, and weeks under one Large Manufacturing
            Model (LMM).
          </p>

          <section aria-label="Our Journey">
            <h2>Our Journey</h2>

            <h3>Phase 1, 2020 – 2023: Started as an EV Company</h3>
            <ul>
              <li>Founded with the goal of helping the world transition into sustainable energy, beginning with indigenously developed electric two-wheelers.</li>
              <li>Built first EV product, the Challenger motorcycle, launched in July 2023.</li>
              <li>Multiple product expansion planned in pipeline including commercial two-wheeler and four-wheeler platforms.</li>
            </ul>

            <h3>Phase 2, 2023 – 2026: Expanded to provide design and manufacturing services</h3>
            <ul>
              <li>In the process of building EVs, built a wide and deep set of engineering and manufacturing competence: metals, plastics, composites, batteries, electronics, motors.</li>
              <li>Started extending in-house built capabilities as services to high-critical and demanding applications.</li>
            </ul>

            <h3>Phase 3, 2026 – onwards: Applying AI to create end-to-end full-stack automated manufacturing</h3>
            <ul>
              <li>With full-stack in hand, started automating across Design, Development and Distribution cycles to completely transform the manufacturing platform.</li>
              <li>Achieving levels of speed and efficiencies never before seen in manufacturing.</li>
            </ul>
          </section>

          <section aria-label="Our Goal">
            <h2>Make manufacturing compound.</h2>
            <p>
              Software compounds. Every line of code ships once and improves with every
              user. Manufacturing never did, more revenue meant more machines, more
              capital, more people. Growth stayed linear.
            </p>
            <p>
              NEMI changes the equation. Every factory job becomes training data. Every
              production run feeds the loop. The more we build, the smarter, faster, and
              cheaper the next job becomes.
            </p>
          </section>

          <section aria-label="Our Locations">
            <h2>Our Locations</h2>
            <p>Manufacturing today from India. Expanding to three new regions in 2026.</p>
            <h3>Active</h3>
            <ul>
              <li>Coimbatore, India</li>
              <li>Chennai, India</li>
            </ul>
            <h3>Coming Soon (2026)</h3>
            <ul>
              <li>United States</li>
              <li>Western Europe</li>
              <li>United Arab Emirates</li>
            </ul>
          </section>

          <section aria-label="Leadership Team">
            <h2>Leadership Team</h2>
            <p>
              Leadership team that built manufacturing at scale and AI systems at scale,
              now combining both.
            </p>

            <h3>Core Leadership</h3>
            <ul>
              <li>
                <strong>Anirudh Ravi Narayanan</strong>, Chief Executive Officer. Built
                NEMI from a garage to 300k sq ft and $15M ARR; led 10+ recovery and margin
                transformations at McKinsey. BS ECE Rose-Hulman, MBA Yale.
                {" "}<a href="https://www.linkedin.com/in/anirudh-narayanan-26b0a121/">LinkedIn</a>
              </li>
              <li>
                <strong>Gokul Madhavan</strong>, Chief Financial Officer. Supported M&amp;A
                integrations, built digital finance ops, led digital transformations.
                A.B., PhD from Harvard, MBA from Yale.
                {" "}<a href="https://www.linkedin.com/in/madhavangokul/">LinkedIn</a>
              </li>
              <li>
                <strong>Shreerith Seshadri</strong>, Chief Technology Officer. Deployed AI
                systems used by 100M+ users, shaped early architecture at eightfold.AI.
                CS, UIUC.
                {" "}<a href="https://www.linkedin.com/in/shreerith-seshadri/">LinkedIn</a>
              </li>
              <li>
                <strong>Vinoth Thiruvenkatasamy</strong>, Chief Operating Officer. 20+
                years in automotive manufacturing. Scaled production lines from pilot to
                100K+ units multiple times.
                {" "}<a href="https://www.linkedin.com/in/vinoth-thiruvenkatasamy-523338219/">LinkedIn</a>
              </li>
            </ul>

            <h3>Extended Leadership</h3>
            <ul>
              <li>
                <strong>Subramanian Rangaswamy</strong>, CFO India. Chartered &amp; Cost
                Accountant with 27+ years in manufacturing across auto, industrial, and
                consumer goods.
              </li>
              <li>
                <strong>Vijay Ragavalu</strong>, Manufacturing Head. 30+ years in
                manufacturing leadership, automation, operational optimization, and
                large-scale team management.
              </li>
              <li>
                <strong>Sadasivam Balasubramaniam</strong>, Electrical Head. 20 years in
                electronics product development across telematics, defense, aerospace,
                and factory automation.
              </li>
              <li>
                <strong>Vijay Ramakrishnan</strong>, Distribution Head. 15+ years in
                Sales &amp; Marketing across automotive, finance, and tourism. Built and
                led 100+ person sales teams.
              </li>
            </ul>
          </section>

          <section aria-label="Board and Advisors">
            <h2>Board &amp; Advisors</h2>
            <p>Guided by operators who scaled global enterprises.</p>

            <h3>Board</h3>
            <ul>
              <li>
                <strong>Sam Swaminathan</strong>, Non-Executive Board Member. General
                Partner, De La Crème Ventures. Ex-SVP Fractal Analytics. IIT Madras
                alumnus.
              </li>
              <li>
                <strong>Naoya Nishimura</strong>, Non-Executive Board Member. CEO, Musashi
                Auto Parts India. Leads EV expansion for Musashi Seimitsu in India &amp;
                Africa.
              </li>
            </ul>

            <h3>Advisors</h3>
            <ul>
              <li>
                <strong>Dr. Sampath Ravinarayanan</strong>, Board Advisor. Chairman &amp;
                MD, Axis CADES. Former Board member at Air India, Airbus India, and KPTCL.
              </li>
              <li>
                <strong>Ramesh Mangaleshwaran</strong>, Advisor. Senior Partner Emeritus,
                McKinsey &amp; Company. Co-led Industrials Practice, India &amp; Asia.
              </li>
              <li>
                <strong>Vinod K. Dasari</strong>, Advisor. Former MD &amp; CEO, Ashok
                Leyland and Royal Enfield. Led global innovation and international
                expansion.
              </li>
            </ul>
          </section>

          <section aria-label="Strategic moats">
            <h2>Why NEMI Wins</h2>
            <ul>
              <li><strong>Sovereign Manufacturing.</strong> Edge AI within national borders: full data sovereignty.</li>
              <li><strong>Extreme Capital Efficiency.</strong> US-level engineering quality at 20% of US-level cost.</li>
              <li><strong>The LMM Advantage.</strong> Proprietary AI stack that gets smarter with each job.</li>
              <li><strong>End-to-End Integration.</strong> One partner from design to deployment.</li>
              <li><strong>AI Retrofit for Legacy.</strong> Upgrade existing factories with the NEMI AI stack.</li>
              <li><strong>Mid-Market Focus.</strong> Physical AI for the markets enterprise vendors ignore.</li>
            </ul>
          </section>

          <section aria-label="Join Our Team">
            <h2>Join Our Team</h2>
            <p>
              We&rsquo;re hiring across engineering, manufacturing and AI. Build the
              future of Physical AI with us.
              {" "}<a href="/careers">View Open Roles</a> or email
              {" "}<a href="mailto:info@nemi-ai.com">info@nemi-ai.com</a>.
            </p>
          </section>
        </main>
      </div>

      <AboutUs />
    </>
  );
}
