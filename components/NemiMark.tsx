import Image from "next/image";
import Link from "next/link";

type Props = {
  href?: string;
  className?: string;
};

// Official NEMI infinity logo from nemi-ai.com. White on transparent — sits on
// our Deep Space surface. The wrapper adds a subtle violet glow tied to the
// brand background hue (#513A9F).
export function NemiMark({ href = "/", className = "" }: Props) {
  const content = (
    <span
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label="NEMI AI"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-2 -z-10 rounded-full bg-violet-500/0 blur-2xl transition group-hover:bg-violet-500/20"
      />
      <Image
        src="/nemi-logo.png"
        alt=""
        width={960}
        height={540}
        priority
        className="h-12 w-auto md:h-14"
        style={{
          filter:
            "drop-shadow(0 0 30px hsl(275 80% 60% / 0.5)) drop-shadow(0 0 60px hsl(270 70% 50% / 0.3)) drop-shadow(0 0 100px hsl(280 80% 45% / 0.15))"
        }}
      />
      <span className="sr-only">NEMI AI</span>
    </span>
  );

  if (!href) {
    return <span className="relative inline-flex">{content}</span>;
  }

  return (
    <Link
      href={href}
      aria-label="NEMI AI, return to selection"
      className="relative inline-flex"
    >
      {content}
    </Link>
  );
}
