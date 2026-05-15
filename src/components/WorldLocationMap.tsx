"use client";

import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const GEO_URL = "/data/countries-110m.json";

// ISO 3166-1 numeric country codes
const ACTIVE_COUNTRIES = new Set<string>([
  "356", // India
]);

const UPCOMING_COUNTRIES = new Set<string>([
  "840", // United States
  "784", // United Arab Emirates
  // Western Europe
  "826", // United Kingdom
  "250", // France
  "276", // Germany
  "724", // Spain
  "380", // Italy
  "528", // Netherlands
  "56",  // Belgium
  "756", // Switzerland
  "372", // Ireland
  "620", // Portugal
  "40",  // Austria
  "208", // Denmark
  "752", // Sweden
  "578", // Norway
  "246", // Finland
  "352", // Iceland
  "442", // Luxembourg
  "300", // Greece
]);

interface MarkerData {
  coordinates: [number, number];
  label: string;
  type: "active" | "upcoming";
  city?: string;
}

const MARKERS: MarkerData[] = [
  // India - active
  { coordinates: [76.96, 11.0], label: "Coimbatore", type: "active", city: "Coimbatore" },
  { coordinates: [80.27, 13.08], label: "Chennai", type: "active", city: "Chennai" },
  // Upcoming
  { coordinates: [-95.7, 38.5], label: "United States", type: "upcoming" },
  { coordinates: [4.5, 50.5], label: "Western Europe", type: "upcoming" },
  { coordinates: [54.37, 24.45], label: "UAE", type: "upcoming" },
];

interface WorldLocationMapProps {
  visibleProgress: number;
}

const WorldLocationMap = ({ visibleProgress }: WorldLocationMapProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative w-full" style={{ aspectRatio: "1280 / 720" }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 145,
          center: [10, 30],
        }}
        width={1280}
        height={720}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <defs>
          <radialGradient id="active-marker-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(275 90% 70%)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(275 90% 60%)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="upcoming-marker-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(200 80% 70%)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="hsl(200 80% 60%)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Country geometries */}
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const id = String(geo.id);
              const isActive = ACTIVE_COUNTRIES.has(id);
              const isUpcoming = UPCOMING_COUNTRIES.has(id);

              let fill = "hsl(230 20% 13%)";
              let stroke = "hsl(230 18% 22%)";
              let strokeWidth = 0.4;

              if (isActive) {
                fill = "hsl(275 75% 52%)";
                stroke = "hsl(275 95% 80%)";
                strokeWidth = 0.8;
              } else if (isUpcoming) {
                fill = "hsl(275 50% 38%)";
                stroke = "hsl(275 70% 65%)";
                strokeWidth = 0.6;
              }

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  style={{
                    default: { outline: "none", transition: "all 250ms" },
                    hover: {
                      outline: "none",
                      fill: isActive
                        ? "hsl(275 85% 60%)"
                        : isUpcoming
                          ? "hsl(275 60% 48%)"
                          : "hsl(230 20% 16%)",
                    },
                    pressed: { outline: "none" },
                  }}
                  filter={isActive ? "drop-shadow(0 0 6px hsl(275 80% 60% / 0.6))" : undefined}
                />
              );
            })
          }
        </Geographies>

        {/* Kashmir overlay — colored to match India (Natural Earth shows Kashmir as disputed; this paints it as India) */}
        <Marker coordinates={[76.5, 34.0]}>
          <g style={{ opacity: mounted ? 0.92 : 0 }}>
            {/* Approximated polygon over Kashmir region using geo-projected local coordinates is non-trivial;
                a simple filled ellipse covers the disputed area visually */}
            <ellipse cx="0" cy="0" rx="22" ry="14" fill="hsl(275 75% 52%)" stroke="hsl(275 95% 80%)" strokeWidth="0.8" />
          </g>
        </Marker>

        {/* Markers */}
        {MARKERS.map((m, i) => {
          const delay = i * 0.05;
          const p = Math.min(Math.max((visibleProgress - delay) / 0.3, 0), 1);
          const isActive = m.type === "active";
          return (
            <Marker key={`${m.label}-${i}`} coordinates={m.coordinates}>
              <g style={{ opacity: p }}>
                {/* Glow */}
                <circle r={isActive ? 16 : 12} fill={`url(#${isActive ? "active" : "upcoming"}-marker-glow)`}>
                  <animate
                    attributeName="r"
                    values={isActive ? "12;20;12" : "10;16;10"}
                    dur={isActive ? "2.5s" : "3s"}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values={isActive ? "0.9;0.3;0.9" : "0.6;0.1;0.6"}
                    dur={isActive ? "2.5s" : "3s"}
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Outer ring */}
                <circle
                  r={isActive ? 5 : 5.5}
                  fill={isActive ? "hsl(275 85% 60%)" : "hsl(230 25% 6%)"}
                  stroke={isActive ? "hsl(275 100% 92%)" : "hsl(200 80% 65%)"}
                  strokeWidth={isActive ? 1.2 : 1.1}
                  strokeDasharray={isActive ? undefined : "2.5 1.8"}
                />
                {/* Center dot */}
                <circle r={isActive ? 1.6 : 1.8} fill={isActive ? "hsl(0 0% 100%)" : "hsl(200 80% 70%)"} />

                {/* Label badges for upcoming */}
                {!isActive && (
                  <g>
                    <rect
                      x={-45}
                      y={11}
                      width={90}
                      height={22}
                      rx={5}
                      fill="hsl(230 25% 8% / 0.95)"
                      stroke="hsl(200 80% 60% / 0.4)"
                      strokeWidth={0.5}
                    />
                    <text
                      y={22}
                      textAnchor="middle"
                      fontSize={8}
                      fontWeight={700}
                      fill="hsl(200 80% 80%)"
                      style={{ letterSpacing: "0.4px" }}
                    >
                      {m.label.toUpperCase()}
                    </text>
                    <text
                      y={31}
                      textAnchor="middle"
                      fontSize={6}
                      fontWeight={600}
                      fill="hsl(200 60% 70%)"
                      style={{ letterSpacing: "1px" }}
                    >
                      2026
                    </text>
                  </g>
                )}
              </g>
            </Marker>
          );
        })}

        {/* India callout label */}
        <Marker coordinates={[88, 18]}>
          <g style={{ opacity: Math.min(Math.max((visibleProgress - 0.05) / 0.25, 0), 1) }}>
            <line x1="-8" y1="-2" x2="22" y2="14" stroke="hsl(275 80% 65% / 0.7)" strokeWidth={0.7} />
            <rect
              x={20}
              y={3}
              width={110}
              height={28}
              rx={5}
              fill="hsl(275 70% 22% / 0.95)"
              stroke="hsl(275 80% 60%)"
              strokeWidth={0.7}
            />
            <text x={75} y={14} textAnchor="middle" fontSize={7} fontWeight={700} fill="hsl(275 80% 80%)" style={{ letterSpacing: "1.4px" }}>
              INDIA · ACTIVE
            </text>
            <text x={75} y={25} textAnchor="middle" fontSize={9} fontWeight={800} fill="hsl(0 0% 100%)">
              Coimbatore · Chennai
            </text>
          </g>
        </Marker>
      </ComposableMap>
    </div>
  );
};

export default WorldLocationMap;
