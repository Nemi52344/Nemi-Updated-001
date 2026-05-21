const RISKS = [
  "Investment in early-stage companies is speculative and involves a high degree of risk, including the possible loss of your entire investment.",
  "SAFE notes are not guaranteed and do not provide immediate equity ownership.",
  "There is no public market for these securities and there may never be one.",
  "The company is at an early stage and has limited operating history.",
  "Additional risks specific to the offering are described in the offering documents and must be reviewed in full prior to investment."
];

export function RiskFactors() {
  return (
    <section className="space-y-4">
      <p className="nemi-eyebrow">Risk Factors Summary</p>
      <h3 className="nemi-heading text-xl md:text-2xl">
        Read the offering documents before investing.
      </h3>
      <ul className="space-y-3">
        {RISKS.map((risk, i) => (
          <li key={i} className="flex gap-3 text-sm leading-body text-soft-grey/85">
            <span
              aria-hidden
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-300"
            />
            <span>{risk}</span>
          </li>
        ))}
      </ul>
      <p className="text-xs leading-body text-soft-grey/60">
        The above is a summary only. Full risk factors are set out in the
        Private Placement Memorandum (Reg D) or Subscription Documents (Reg S)
        and must be reviewed in their entirety.
      </p>
    </section>
  );
}
