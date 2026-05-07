interface ScrollTransitionProps {
  scrollProgress: number;
  /** Center of the transition in scroll progress (0–1) */
  at: number;
  /** How wide the fade window is (default 0.02) */
  spread?: number;
}

const ScrollTransition = ({ scrollProgress, at, spread = 0.02 }: ScrollTransitionProps) => {
  const dist = Math.abs(scrollProgress - at);
  if (dist > spread) return null;

  const intensity = 1 - dist / spread;
  const lineScale = intensity;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 35, opacity: intensity }}
    >
      {/* Expanding center line */}
      <div
        className="h-px w-[60%] max-w-xl"
        style={{
          transform: `scaleX(${lineScale})`,
          background: `linear-gradient(90deg, transparent, hsl(275 80% 60% / ${0.6 * intensity}), hsl(270 60% 55% / ${0.4 * intensity}), transparent)`,
          boxShadow: `0 0 ${20 * intensity}px hsl(275 80% 60% / ${0.3 * intensity})`,
          transition: "transform 0.05s linear",
        }}
      />
      {/* Subtle dot at center */}
      <div
        className="absolute w-1.5 h-1.5 rounded-full"
        style={{
          background: `hsl(275 80% 65% / ${intensity})`,
          boxShadow: `0 0 ${12 * intensity}px hsl(275 80% 60% / ${0.5 * intensity})`,
          transform: `scale(${0.5 + intensity * 0.5})`,
        }}
      />
    </div>
  );
};

export default ScrollTransition;
