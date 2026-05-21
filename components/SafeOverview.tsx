export function SafeOverview() {
  return (
    <section className="space-y-4">
      <p className="nemi-eyebrow">SAFE Note Overview</p>
      <h3 className="nemi-heading text-xl md:text-2xl">
        Simple Agreement for Future Equity
      </h3>
      <p className="nemi-body text-sm md:text-base">
        A SAFE (Simple Agreement for Future Equity) is not a debt instrument
        and does not carry interest or a maturity date. It converts to equity
        upon a future priced equity round, liquidity event, or dissolution,
        subject to the terms in the SAFE agreement and the offering documents.
      </p>
      <p className="text-sm leading-body text-soft-grey/70">
        Full details, including risk factors, are contained in the offering
        documents. A copy will be provided to verified investors.
      </p>
    </section>
  );
}
