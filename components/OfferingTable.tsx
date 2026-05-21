type Row = { label: string; value: string; tbd?: boolean };

type Props = {
  rows: Row[];
};

export function OfferingTable({ rows }: Props) {
  return (
    <dl className="nemi-surface divide-y divide-white/5">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-1 gap-1 px-5 py-4 md:grid-cols-[14rem_1fr] md:items-baseline md:gap-6"
        >
          <dt className="nemi-eyebrow text-soft-grey/70">{row.label}</dt>
          <dd
            className={`font-sans text-sm md:text-base ${
              row.tbd ? "text-violet-300/80" : "text-soft-grey"
            }`}
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
