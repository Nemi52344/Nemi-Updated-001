import Link from "next/link";

export function ReturnLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-xs uppercase tracking-nemi-wide text-soft-grey/70 transition hover:text-violet-300"
    >
      <span aria-hidden>←</span> Return to selection
    </Link>
  );
}
