type Props = {
  variant: "reg-d" | "reg-s";
};

export function ComplianceBanner({ variant }: Props) {
  if (variant === "reg-d") {
    return (
      <aside
        role="note"
        aria-label="Accredited investor compliance notice"
        className="nemi-banner space-y-3"
      >
        <p className="nemi-eyebrow text-violet-100">⚠ Accredited Investors Only</p>
        <h2 className="nemi-heading text-lg md:text-xl">
          This offering is available only to U.S. accredited investors.
        </h2>
        <p className="text-sm leading-body text-soft-grey">
          This offering is being made pursuant to Rule 506(c) of Regulation D
          under the Securities Act of 1933. Securities offered have not been
          registered under the Securities Act or any state securities laws and
          are "restricted securities." They may not be resold absent
          registration or an applicable exemption. Accredited investor status
          must be verified before any investment is accepted.
        </p>
      </aside>
    );
  }

  return (
    <aside
      role="note"
      aria-label="Non-U.S. persons compliance notice"
      className="nemi-banner space-y-3"
    >
      <p className="nemi-eyebrow text-violet-100">⚠ Non-U.S. Persons Only</p>
      <h2 className="nemi-heading text-lg md:text-xl">
        This offering is available only to non-U.S. persons.
      </h2>
      <p className="text-sm leading-body text-soft-grey">
        This offering is being made outside the United States in reliance on
        Regulation S under the Securities Act of 1933. It is{" "}
        <strong className="font-semibold text-white">NOT</strong> available to
        "U.S. persons" as defined in SEC Rule 902(k). This includes U.S.
        citizens, U.S. residents, and certain entities organized in the United
        States.
      </p>
      <p className="text-sm leading-body text-soft-grey">
        If you are a U.S. person, you must leave this page immediately and may
        not participate in this offering. By remaining on this page, you confirm
        that you are not a U.S. person and are not acquiring these securities
        for the account or benefit of a U.S. person.
      </p>
    </aside>
  );
}
