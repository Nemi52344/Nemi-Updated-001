import type { Metadata } from "next";
import { NemiMark } from "@/components/NemiMark";
import { JurisdictionCard } from "@/components/JurisdictionCard";
import { LegalFooter } from "@/components/LegalFooter";
import ConstellationCanvas from "@/components/ConstellationCanvas";

export const metadata: Metadata = {
  title: "Invest in NEMI AI",
  description:
    "NEMI AI is conducting two concurrent securities offerings. Select the option that applies to you.",
  alternates: {
    canonical: "https://invest.nemi-ai.com/"
  }
};

export default function LandingPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden">
      {/* Brand background: nemi-ai-background.jpg — heavily faded so the
          layout-level nebula reads through as the dominant visual */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-nemi-hero bg-cover bg-center opacity-25"
      />
      {/* Animated constellation overlay — violet nodes drift in front of the nebula */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-[3] opacity-90"
      >
        <ConstellationCanvas />
      </div>

      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <NemiMark href={undefined} />
        <a
          href="mailto:invest@nemi-ai.com"
          className="hidden text-xs uppercase tracking-nemi-wide text-soft-grey/70 transition hover:text-violet-300 md:inline"
        >
          invest@nemi-ai.com
        </a>
      </header>

      <section className="mx-auto max-w-5xl px-6 pb-10 pt-8 md:px-10 md:pb-16 md:pt-16">
        <p className="nemi-eyebrow">Investor Portal</p>
        <h1 className="mt-4 nemi-heading text-3xl leading-tight md:text-5xl">
          Invest in NEMI AI
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-body text-soft-grey/85 md:text-lg">
          NEMI AI is conducting two concurrent securities offerings. Please
          read the descriptions below carefully and select the option that
          applies to you.
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-body text-soft-grey/60">
          This website is for informational purposes only and does not
          constitute an offer to sell or a solicitation of an offer to buy any
          securities in any jurisdiction where such offer or solicitation is
          not permitted.
        </p>
      </section>

      <section
        aria-label="Select your jurisdiction"
        className="mx-auto grid max-w-5xl gap-6 px-6 pb-12 md:grid-cols-2 md:gap-8 md:px-10"
      >
        <JurisdictionCard
          offering="reg-d"
          eyebrow="For U.S. Persons: Accredited Investors Only"
          heading="Regulation D, Rule 506(c)"
          ctaLabel="Invest: U.S. Accredited Investors"
          attestation='By proceeding, I represent and warrant that I am a "U.S. accredited investor" as defined in SEC Rule 501(a), and that I will complete the accredited investor verification process administered by DealMaker prior to any investment.'
          body={
            <>
              <p>
                This offering is made pursuant to Rule 506(c) of Regulation D
                under the Securities Act of 1933, as amended. It is available
                exclusively to "accredited investors" as defined under SEC
                Rule 501(a). Verification of accredited investor status is
                required before investment.
              </p>
              <p>
                This offering has not been registered with the SEC. Securities
                offered pursuant to Regulation D are restricted securities.
              </p>
            </>
          }
        />

        <JurisdictionCard
          offering="reg-s"
          eyebrow="For Non-U.S. Persons Only"
          heading="Regulation S"
          ctaLabel="Invest: Non-U.S. Persons Only"
          attestation='By proceeding, I represent and warrant that I am NOT a "U.S. person" as defined in SEC Rule 902(k), that I am not located in the United States, and that I am not acting for the account or benefit of any U.S. person.'
          body={
            <>
              <p>
                This offering is made in reliance on Regulation S under the
                Securities Act of 1933, as amended, and is available ONLY to
                persons who are not "U.S. persons" as defined in SEC Rule
                902(k). If you are a U.S. person (including U.S. citizens,
                U.S. residents, and certain U.S.-organized entities), you must
                NOT click this button and must not participate in this
                offering.
              </p>
              <p>
                By proceeding, you represent and warrant that you are not a
                U.S. person and are not acting for the account or benefit of a
                U.S. person.
              </p>
            </>
          }
        />
      </section>

      <LegalFooter variant="landing" />
    </main>
  );
}
