import type { Metadata } from "next";
import Careers from "@/views/Careers";

export const metadata: Metadata = {
  title: "Careers at NEMI AI — Join the Physical AI Revolution",
  description:
    "Build the Physical Internet. Join NEMI AI's world-class engineering team in Bangalore. Open roles in AI/ML, mechanical design, manufacturing, and operations.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers at NEMI AI — Join the Physical AI Revolution",
    description:
      "Open roles in LMM Research, Mechanical Design, Process Engineering, Fleet Operations and more. Based in Bangalore.",
    url: "/careers",
  },
};

export default function CareersPage() {
  return <Careers />;
}
