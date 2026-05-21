import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import NebulaGlow from "@/components/NebulaGlow";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://invest.nemi-ai.com"),
  title: {
    default: "Invest in NEMI AI",
    template: "%s | NEMI AI"
  },
  description:
    "NEMI AI investor portal. Select your jurisdiction to view the applicable offering.",
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="min-h-screen bg-deep-space font-sans text-soft-grey antialiased">
        <NebulaGlow />
        {children}
      </body>
    </html>
  );
}
