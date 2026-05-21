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
  title: "Regulation D 506(c) Offering",
  robots: { index: false, follow: false, nocache: true }
};

const OFFERING_ROWS = [
  {
    label: "Offering Type",
    value: "Simple Agreement for Future Equity (SAFE Note)"
  },
  { label: "Securities Act Rule", value: "Rule 506(c), Regulation D" },
  { label: "Eligible Investors", value: "U.S. Accredited Investors only" },
  {
    label: "Offering Document",
    value: "Private Placement Memorandum (available after verification)"
  },
  { label: "Valuation Cap", value: "[TBD]", tbd: true },
  { label: "Discount Rate", value: "[TBD]", tbd: true },
  { label: "Minimum Investment", value: "[TBD]", tbd: true },
  { label: "Maximum Raise", value: "[TBD]", tbd: true },
  { label: "Closing Date", value: "[TBD]", tbd: true }
];

export default function RegDPage() {
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
        <ComplianceBanner variant="reg-d" />

        <section className="space-y-3">
          <p className="nemi-eyebrow">Offering</p>
          <h1 className="nemi-heading text-3xl md:text-5xl">
            Regulation D, Rule 506(c)
          </h1>
          <p className="max-w-2xl text-base leading-body text-soft-grey/85">
            SAFE Note investment for U.S. accredited investors, conducted in
            partnership with DealMaker.
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
            The PPM contains the full terms and conditions of the offering,
            including risk factors, use of proceeds, and investor rights.
            Investors are strongly encouraged to read the PPM in its entirety
            and consult with independent legal and financial advisors before
            investing.
          </p>
        </section>

        <SafeOverview />

        <section className="nemi-surface space-y-3 p-6 md:p-8">
          <p className="nemi-eyebrow">Verification Required</p>
          <h3 className="nemi-heading text-xl md:text-2xl">
            Accredited investor status will be verified before investment.
          </h3>
          <p className="text-sm leading-body text-soft-grey">
            Under Rule 506(c), NEMI AI is required to take reasonable steps to
            verify that all investors are accredited investors before accepting
            any investment. Verification is conducted through our investment
            platform partner, DealMaker.
          </p>
          <p className="text-sm leading-body text-soft-grey/80">
            You will be asked to provide documentation of your accredited
            investor status, e.g., tax returns, W-2, brokerage statements, or
            a letter from a licensed attorney, CPA, or investment advisor.
          </p>
        </section>

        <DealMakerCta offering="reg-d" />

        <RiskFactors />

        <div className="pt-2">
          <ReturnLink />
        </div>
      </div>

      <LegalFooter variant="reg-d" />
    </main>
  );
}
