type Props = {
  offering: "reg-d" | "reg-s";
};

export function DealMakerCta({ offering }: Props) {
  const label =
    offering === "reg-d"
      ? "Begin Investment Process: U.S. Accredited Investors"
      : "Begin Investment Process: Non-U.S. Persons";

  return (
    <section
      aria-label="DealMaker investment CTA"
      className="nemi-surface relative overflow-hidden p-8 md:p-10"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-transparent to-violet-700/20"
      />
      <div className="relative space-y-5 text-center">
        <p className="nemi-eyebrow">Powered by DealMaker</p>
        <h3 className="nemi-heading text-2xl md:text-3xl">
          Continue on our investment platform
        </h3>
        <p className="mx-auto max-w-xl text-sm leading-body text-soft-grey/80">
          The full investment process (verification, subscription documents,
          and funding) is completed through DealMaker, a registered
          broker-dealer. You will be redirected to a secure DealMaker page.
        </p>

        <div className="pt-2">
          <button
            type="button"
            disabled
            aria-disabled
            className="nemi-btn-primary w-full md:w-auto"
            title="DealMaker embed / URL pending; replace before launch"
          >
            <span>{label}</span>
            <span aria-hidden className="ml-1">→</span>
          </button>
          <p className="mt-3 text-[0.7rem] uppercase tracking-nemi-wide text-soft-grey/50">
            Placeholder: DealMaker {offering === "reg-d" ? "506(c)" : "Reg S"} embed
            URL to be supplied by partner
          </p>
        </div>
      </div>
    </section>
  );
}
