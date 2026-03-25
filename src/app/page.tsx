import type { Metadata } from "next";
import Index from "@/views/Index";

export const metadata: Metadata = {
  title: "NEMI AI — End-to-End Physical AI Platform for Manufacturing",
  description:
    "NEMI AI is the world's first end-to-end Physical AI platform. Design, manufacture, and deploy physical products 10× faster at a fraction of Western costs. Powered by the Large Manufacturing Model (LMM).",
  alternates: { canonical: "/" },
  openGraph: {
    title: "NEMI AI — End-to-End Physical AI Platform for Manufacturing",
    description:
      "Design, manufacture, and deploy physical products 10× faster at a fraction of Western costs. One partner. The full stack.",
    url: "/",
  },
};

export default function HomePage() {
  return <Index />;
}
