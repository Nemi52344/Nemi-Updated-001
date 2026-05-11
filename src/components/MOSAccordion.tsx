"use client";

import { useState } from "react";
import Link from "next/link";

const akio = "hsl(0, 72%, 52%)";
const henry = "hsl(217, 91%, 60%)";
const sam = "hsl(142, 71%, 45%)";

interface LayerRow {
  key: string;
  label: string;
  description: React.ReactNode;
  body: React.ReactNode;
  // Top-down purple intensity (0 brightest at top → 1 darkest at bottom)
  depth: number;
}

const ApplicationsDesc = () => (
  <span>
    <Link
      href="/services?tab=akio"
      className="hover:underline"
      onClick={(e) => e.stopPropagation()}
    >
      AKIO
    </Link>
    {" · "}
    <Link
      href="/services?tab=henry"
      className="hover:underline"
      onClick={(e) => e.stopPropagation()}
    >
      HENRY
    </Link>
    {" · "}
    <Link
      href="/services?tab=sam"
      className="hover:underline"
      onClick={(e) => e.stopPropagation()}
    >
      SAM
    </Link>
    {", the user-facing systems that run on top of the OS"}
  </span>
);

const ApplicationsBody = () => (
  <div className="grid grid-cols-3 gap-3 md:gap-4">
    {[
      { name: "AKIO", role: "Design", color: akio, href: "/services?tab=akio" },
      { name: "HENRY", role: "Develop", color: henry, href: "/services?tab=henry" },
      { name: "SAM", role: "Deploy", color: sam, href: "/services?tab=sam" },
    ].map((app) => (
      <Link
        key={app.name}
        href={app.href}
        onClick={(e) => e.stopPropagation()}
        className="block rounded-lg border px-3 py-3 md:px-5 md:py-4 text-center transition-all duration-300 hover:-translate-y-0.5"
        style={{
          borderColor: app.color.replace(")", " / 0.55)"),
          background: app.color.replace(")", " / 0.08)"),
          boxShadow: `inset 0 0 20px ${app.color.replace(")", " / 0.1)")}`,
        }}
      >
        <p
          className="font-black text-sm md:text-base lg:text-lg tracking-[0.2em]"
          style={{
            color: app.color,
            textShadow: `0 0 14px ${app.color.replace(")", " / 0.5)")}`,
          }}
        >
          {app.name}
        </p>
        <p className="text-[0.6rem] md:text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground/80 mt-1">
          {app.role}
        </p>
      </Link>
    ))}
  </div>
);

const LMMBody = () => {
  const agents = [
    { name: "Far-seer", role: "Simulation", lean: [akio, henry] },
    { name: "Craftsman", role: "Design-to-Product", lean: [akio, henry] },
    { name: "Taskmaster", role: "Inference CNS", lean: [akio, henry, sam] },
    { name: "Sommelier", role: "Quality", lean: [henry] },
    { name: "Dispatcher", role: "Supply chain", lean: [henry] },
    { name: "Trainer", role: "Lifecycle", lean: [sam] },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
      {agents.map((a) => (
        <Link
          key={a.name}
          href="#flywheel"
          onClick={(e) => e.stopPropagation()}
          className="rounded-lg border px-2.5 py-2.5 md:px-3 md:py-3 text-center transition-colors duration-200 hover:bg-[hsl(var(--accent)/0.08)]"
          style={{
            borderColor: "hsl(var(--accent) / 0.35)",
            background: "hsl(var(--accent) / 0.04)",
          }}
        >
          <div className="flex gap-0.5 justify-center mb-1.5">
            {a.lean.map((c, idx) => (
              <span
                key={idx}
                className="block w-3 h-[3px] rounded-full"
                style={{ background: c, boxShadow: `0 0 6px ${c.replace(")", " / 0.55)")}` }}
              />
            ))}
          </div>
          <p className="font-bold text-[0.7rem] md:text-xs tracking-wide text-foreground">
            {a.name}
          </p>
          <p className="text-[0.55rem] md:text-[0.6rem] tracking-wider uppercase text-muted-foreground/75 mt-0.5">
            {a.role}
          </p>
        </Link>
      ))}
    </div>
  );
};

const SimpleBoxesBody = ({ items, cols }: { items: string[]; cols: string }) => (
  <div className={`grid grid-cols-2 ${cols} gap-2 md:gap-3`}>
    {items.map((item) => (
      <div
        key={item}
        className="rounded-lg border px-3 py-2.5 text-center text-[0.7rem] md:text-xs text-muted-foreground/85"
        style={{
          borderColor: "hsl(var(--accent) / 0.2)",
          background: "hsl(var(--card) / 0.6)",
        }}
      >
        {item}
      </div>
    ))}
  </div>
);

const rows: LayerRow[] = [
  {
    key: "applications",
    label: "Applications Layer",
    description: <ApplicationsDesc />,
    body: <ApplicationsBody />,
    depth: 0,
  },
  {
    key: "lmm",
    label: "Large Manufacturing Model (LMM)",
    description: (
      <span>
        AI inference engine: process intelligence, quality prediction, supply chain optimization
      </span>
    ),
    body: <LMMBody />,
    depth: 0.34,
  },
  {
    key: "data",
    label: "Data Infrastructure",
    description: (
      <span>
        Sensor networks, machine telemetry, CAD ingestion, quality data pipelines
      </span>
    ),
    body: (
      <SimpleBoxesBody
        items={["Sensor networks", "Machine telemetry", "CAD ingestion", "Quality data pipelines"]}
        cols="md:grid-cols-4"
      />
    ),
    depth: 0.66,
  },
  {
    key: "physical",
    label: "Physical Layer",
    description: (
      <span>
        CNC machines · Injection molders · Robotic arms · Assembly lines · Inspection systems
      </span>
    ),
    body: (
      <SimpleBoxesBody
        items={["CNC machines", "Injection molders", "Robotic arms", "Assembly lines", "Inspection systems"]}
        cols="md:grid-cols-5"
      />
    ),
    depth: 1,
  },
];

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    aria-hidden
    width="16"
    height="16"
    viewBox="0 0 18 18"
    className="flex-shrink-0 transition-transform duration-300"
    style={{
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
      color: "hsl(275 80% 75%)",
      opacity: 0.85,
    }}
  >
    <path
      d="M4 7 L9 12 L14 7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MOSAccordion = () => {
  const [openKey, setOpenKey] = useState<string | null>("applications");

  return (
    <div
      className="rounded-2xl border overflow-hidden relative"
      style={{
        // Top-down purple gradient - saturated at top fading to dark muted at
        // bottom, mirroring the descent from user-facing apps → silicon.
        background: `linear-gradient(180deg,
          hsl(275 80% 22% / 0.28) 0%,
          hsl(275 70% 16% / 0.22) 35%,
          hsl(275 50% 10% / 0.16) 70%,
          hsl(230 25% 6% / 0.6) 100%)`,
        borderColor: "hsl(275 80% 60% / 0.25)",
        boxShadow:
          "0 0 60px hsl(275 80% 50% / 0.08), inset 0 1px 0 hsl(275 80% 70% / 0.08)",
      }}
    >
      {/* Soft purple top hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(275 80% 70% / 0.5), transparent)",
        }}
      />
      {/* Left vertical accent stripe spanning all rows */}
      <div
        aria-hidden
        className="absolute top-0 bottom-0 left-0 w-[2px] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, hsl(275 80% 65% / 0.7), hsl(275 50% 35% / 0.4), hsl(275 30% 20% / 0.15))",
          boxShadow: "0 0 12px hsl(275 80% 60% / 0.4)",
        }}
      />

      {rows.map((row, i) => {
        const isOpen = openKey === row.key;
        // Per-layer label color: top is purple, then white, then grey, then dark grey.
        const labelStyle: React.CSSProperties = (() => {
          switch (row.key) {
            case "applications":
              return {
                color: "hsl(275 80% 70%)",
                textShadow: "0 0 16px hsl(275 80% 60% / 0.55)",
              };
            case "lmm":
              return {
                color: "hsl(0 0% 96%)",
                textShadow: "0 0 14px hsl(0 0% 100% / 0.35)",
              };
            case "data":
              return {
                color: "hsl(0 0% 70%)",
                textShadow: "0 0 12px hsl(0 0% 80% / 0.2)",
              };
            case "physical":
            default:
              return {
                color: "hsl(0 0% 50%)",
                textShadow: "0 0 10px hsl(0 0% 60% / 0.15)",
              };
          }
        })();
        return (
          <div
            key={row.key}
            className={i > 0 ? "border-t" : ""}
            style={{ borderColor: "hsl(275 80% 60% / 0.18)" }}
          >
            <button
              type="button"
              onClick={() => setOpenKey(isOpen ? null : row.key)}
              aria-expanded={isOpen}
              className="w-full px-5 md:px-7 py-5 md:py-6 cursor-pointer transition-colors duration-300 hover:bg-[hsl(275_80%_50%_/_0.06)] text-center relative"
            >
              <div className="flex items-center justify-center gap-3">
                <p
                  className="font-bold text-[0.65rem] md:text-xs tracking-[0.3em] uppercase"
                  style={labelStyle}
                >
                  {row.label}
                </p>
                <Chevron open={isOpen} />
              </div>
              <p className="text-xs md:text-sm text-muted-foreground/85 leading-snug mt-2">
                {row.description}
              </p>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="px-5 md:px-7 pb-5 md:pb-7">{row.body}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MOSAccordion;
