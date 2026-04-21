import { useState } from "react";

import droneFull from "@/assets/drone-full.webp";
import droneBattery from "@/assets/drone-battery.webp";
import droneElectronics from "@/assets/drone-electronics.webp";
import droneMechanical from "@/assets/drone-mechanical.webp";
import droneMotor from "@/assets/drone-motor.webp";

import vehicleFull from "@/assets/vehicle-full.webp";
import vehicleBattery from "@/assets/vehicle-battery.webp";
import vehicleElectronics from "@/assets/vehicle-electronics.webp";
import vehicleMechanical from "@/assets/vehicle-mechanical.webp";
import vehicleMotor from "@/assets/vehicle-motor.webp";

import humanoidFull from "@/assets/humanoid-full.webp";
import humanoidBattery from "@/assets/humanoid-battery.webp";
import humanoidElectronics from "@/assets/humanoid-electronics.webp";
import humanoidMechanical from "@/assets/humanoid-mechanical.webp";
import humanoidMotor from "@/assets/humanoid-motor.webp";

interface CapabilitiesSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

type PartKey = "complex_parts" | "battery" | "motor" | "mechanical" | "electronics";

const parts: { key: PartKey; label: string }[] = [
  { key: "complex_parts", label: "Complex Assemblies" },
  { key: "battery", label: "Battery" },
  { key: "motor", label: "Motor" },
  { key: "mechanical", label: "Mechanical Parts" },
  { key: "electronics", label: "Electrical & Electronics" },
];

// Map each vehicle to its images per part. null = use full image as fallback
const vehicleImages: Record<string, { full: string; parts: Record<PartKey, string | null> }> = {
  drone: {
    full: droneFull,
    parts: {
      complex_parts: droneFull,
      battery: droneBattery,
      motor: droneMotor,
      mechanical: droneMechanical,
      electronics: droneElectronics,
    },
  },
  vehicle: {
    full: vehicleFull,
    parts: {
      complex_parts: vehicleFull,
      battery: vehicleBattery,
      motor: vehicleMotor,
      mechanical: vehicleMechanical,
      electronics: vehicleElectronics,
    },
  },
  humanoid: {
    full: humanoidFull,
    parts: {
      complex_parts: humanoidFull,
      battery: humanoidBattery,
      motor: humanoidMotor,
      mechanical: humanoidMechanical,
      electronics: humanoidElectronics,
    },
  },
};

const vehicles = [
  { key: "drone", label: "Drone" },
  { key: "vehicle", label: "Vehicle" },
  { key: "humanoid", label: "Humanoid" },
];

const CapabilitiesSection = ({ scrollProgress }: CapabilitiesSectionProps) => {
  const [selectedPart, setSelectedPart] = useState<PartKey>("complex_parts");

  // Section: 0.45–0.62
  const sectionVisible = scrollProgress > 0.44 && scrollProgress < 0.63;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.46, 0.50));
  const exitP = easeOut(rangeProgress(scrollProgress, 0.58, 0.62));

  if (!sectionVisible) return null;

  const opacity = enterP * (1 - exitP);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none overflow-y-auto"
      style={{ zIndex: 40, opacity, background: "hsl(230 25% 4%)" }}
    >
      <div className="max-w-6xl w-full px-4 md:px-6 mx-auto pointer-events-auto flex flex-col items-center py-8 md:py-0">
        {/* Subtitle */}
        <h2
          className="text-[10px] md:text-sm tracking-[0.4em] uppercase mb-3 md:mb-6"
          style={{
            color: "hsl(0 65% 55%)",
            opacity: enterP,
            transform: `translateY(${(1 - enterP) * 30}px)`,
          }}
        >
          Hardware Anatomy
        </h2>

        {/* Heading */}
        <h3
          className="text-sm md:text-3xl lg:text-4xl font-light text-foreground tracking-wide text-center max-w-4xl mx-auto mb-4 md:mb-10"
          style={{
            opacity: enterP,
            transform: `translateY(${(1 - enterP) * 25}px)`,
          }}
        >
          Design and development capabilities from components to complex assemblies
        </h3>

        {/* Parts pills - horizontal row */}
        <div
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-14 px-2"
          style={{ opacity: enterP }}
        >
          {parts.map((part) => {
            const isActive = selectedPart === part.key;
            return (
              <button
                key={part.key}
                className="px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg border transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedPart(part.key)}
                style={{
                  borderColor: isActive
                    ? "hsl(0 65% 55% / 0.7)"
                    : "hsl(230 15% 25% / 0.5)",
                  background: isActive
                    ? "hsl(0 65% 55% / 0.1)"
                    : "transparent",
                  boxShadow: isActive
                    ? "0 0 15px hsl(0 65% 55% / 0.12)"
                    : "none",
                }}
              >
                <span
                  className="text-[9px] md:text-sm tracking-wider font-medium transition-colors duration-300"
                  style={{
                    color: isActive
                      ? "hsl(0 65% 70%)"
                      : "hsl(var(--muted-foreground))",
                  }}
                >
                  {part.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Vehicles row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 lg:gap-16 w-full max-w-5xl mx-auto justify-items-center">
          {vehicles.map((v) => {
            const data = vehicleImages[v.key];
            const highlightImg = data.parts[selectedPart];
            const showOverlay = selectedPart !== "complex_parts" && highlightImg;

            return (
              <div key={v.key} className="flex flex-col items-center gap-2 md:gap-4">
                <div className="relative w-[7.5rem] h-[8.5rem] md:w-52 md:h-56 lg:w-72 lg:h-72 flex items-center justify-center">
                  <img
                    src={data.full}
                    alt={v.label}
                    className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
                    loading="eager"
                    style={{
                      opacity: showOverlay ? 0.15 : 1,
                    }} decoding="async"
                  />
                  {showOverlay && (
                    <img
                      src={highlightImg!}
                      alt={`${v.label} - ${selectedPart}`}
                      className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
                      style={{ opacity: 1 }} decoding="async"
                    />
                  )}
                </div>
                <span className="text-[9px] md:text-sm tracking-[0.25em] uppercase text-muted-foreground font-medium">
                  {v.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CapabilitiesSection;
