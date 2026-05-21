export function CompanyOverview() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <p className="nemi-eyebrow">Company Overview</p>
        <h2 className="nemi-heading text-2xl md:text-3xl">
          NEMI AI builds systems that think, for the physical world.
        </h2>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <p className="nemi-eyebrow text-soft-grey/70">What we do</p>
          <p className="nemi-body text-sm md:text-base">
            NEMI AI develops physical AI for industrial environments,
            embedding perception, reasoning, and control into the machines that
            build, move, and power the modern economy.
          </p>
        </div>
        <div className="space-y-3">
          <p className="nemi-eyebrow text-soft-grey/70">The problem</p>
          <p className="nemi-body text-sm md:text-base">
            Manufacturing and heavy industry remain bottlenecked by manual
            processes that have not benefitted from the last decade of AI
            progress. NEMI AI brings that progress to the factory floor.
          </p>
        </div>
        <div className="space-y-3">
          <p className="nemi-eyebrow text-soft-grey/70">Approach</p>
          <p className="nemi-body text-sm md:text-base">
            A unified stack (sensing hardware, on-device inference, and a
            cloud control plane) designed to be deployed alongside existing
            equipment, not in place of it.
          </p>
        </div>
        <div className="space-y-3">
          <p className="nemi-eyebrow text-soft-grey/70">Team</p>
          <p className="nemi-body text-sm md:text-base">
            Operators and engineers from the BNC Group portfolio, drawing on
            decades of precision manufacturing, energy systems, and applied AI
            experience. Full bios at{" "}
            <a
              href="https://nemi-ai.com"
              className="text-violet-300 underline decoration-violet-300/40 underline-offset-4 hover:text-white"
            >
              nemi-ai.com
            </a>
            .
          </p>
        </div>
      </div>

      <p className="rounded-lg border border-white/10 bg-white/[0.02] p-4 text-xs leading-body text-soft-grey/60">
        Forward-looking statements are not provided on this page. Any
        projections or future-performance information will be contained only in
        the Private Placement Memorandum or Subscription Documents made
        available to verified investors.
      </p>
    </section>
  );
}
