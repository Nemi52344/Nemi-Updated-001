import type { Metadata } from "next";
import { NemiMark } from "@/components/NemiMark";
import { ComplianceBanner } from "@/components/ComplianceBanner";
import { CompanyOverview } from "@/components/CompanyOverview";
import { OfferingTable } from "@/components/OfferingTable";
import { SafeOverview } from "@/components/SafeOverview";
import { DealMakerCta } from "@/components/DealMakerCta";
import { RiskFactors } from "@/components/RiskFactors";
import { LegalFooter } from "@/components/LegalFooter";
import { ReturnLink } from "@/components/ReturnLink";
import ConstellationCanvas from "@/components/ConstellationCanvas";

export const metadata: Metadata = {
  title: "Regulation S Offering",
  robots: { index: false, follow: false, nocache: true }
};

const OFFERING_ROWS = [
  {
    label: "Offering Type",
    value: "Simple Agreement for Future Equity (SAFE Note)"
  },
  {
    label: "Securities Act Rule",
    value: "Regulation S (offshore transaction; not registered)"
  },
  {
    label: "Eligible Investors",
    value: "Non-U.S. persons only (see Regulation S Rule 902(k))"
  },
  {
    label: "Offering Document",
    value: "Subscription Documents (available after verification)"
  },
  { label: "Valuation Cap", value: "[TBD]", tbd: true },
  { label: "Discount Rate", value: "[TBD]", tbd: true },
  { label: "Minimum Investment", value: "[TBD]", tbd: true },
  { label: "Maximum Raise", value: "[TBD]", tbd: true },
  { label: "Closing Date", value: "[TBD]", tbd: true }
];

export default function RegSPage() {
  return (
    <main className="relative isolate min-h-screen">
      {/* Animated constellation overlay — violet nodes drift across the page */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-70"
      >
        <ConstellationCanvas />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl"
      />

      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <NemiMark href={undefined} />
        <ReturnLink />
      </header>

      <div className="mx-auto max-w-5xl space-y-12 px-6 pb-10 md:px-10">
        <ComplianceBanner variant="reg-s" />

        <section className="space-y-3">
          <p className="nemi-eyebrow">Offering</p>
          <h1 className="nemi-heading text-3xl md:text-5xl">Regulation S</h1>
          <p className="max-w-2xl text-base leading-body text-soft-grey/85">
            SAFE Note investment for non-U.S. persons, conducted in offshore
            transactions in reliance on Regulation S.
          </p>
        </section>

        <CompanyOverview />

        <section className="space-y-5">
          <p className="nemi-eyebrow">About This Offering</p>
          <h2 className="nemi-heading text-2xl md:text-3xl">
            Key offering parameters
          </h2>
          <OfferingTable rows={OFFERING_ROWS} />
          <p className="rounded-lg border border-white/10 bg-white/[0.02] p-4 text-xs leading-body text-soft-grey/70">
            These securities have not been registered under the U.S. Securities
            Act of 1933 or the securities laws of any state. They are being
            offered in reliance on Regulation S and may not be offered or sold
            within the United States or to, or for the account or benefit of,
            U.S. persons, except in transactions exempt from the registration
            requirements of the Securities Act.
          </p>
        </section>

        <SafeOverview />

        <DealMakerCta offering="reg-s" />

        <RiskFactors />

        <div className="pt-2">
          <ReturnLink />
        </div>
      </div>

      <LegalFooter variant="reg-s" />
    </main>
  );
}
