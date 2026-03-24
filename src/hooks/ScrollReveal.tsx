import React, { useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  threshold?: number;
  /** When true, element animates out when leaving viewport and re-animates in */
  repeat?: boolean;
  /** Animation variant: 'default' = translateY, 'scale' = scale+fade, 'zoom' = scale from 1.08 */
  variant?: "default" | "scale" | "zoom";
}

const getInitialStyles = (variant: string) => {
  switch (variant) {
    case "scale":
      return { opacity: "0", transform: "scale(0.92) translateY(24px)" };
    case "zoom":
      return { opacity: "0", transform: "scale(1.08)" };
    default:
      return { opacity: "0", transform: "translateY(32px)" };
  }
};

const getVisibleStyles = () => ({
  opacity: "1",
  transform: "translateY(0) scale(1)",
});

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = "",
  style,
  delay = 0,
  threshold = 0.15,
  repeat = false,
  variant = "default",
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const initial = getInitialStyles(variant);
    el.style.opacity = initial.opacity;
    el.style.transform = initial.transform;
    el.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const visible = getVisibleStyles();
          el.style.opacity = visible.opacity;
          el.style.transform = visible.transform;
          if (!repeat) observer.unobserve(el);
        } else if (repeat) {
          el.style.opacity = initial.opacity;
          el.style.transform = initial.transform;
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold, repeat, variant]);

  return (
    <div ref={ref} className={className} style={{ ...style, willChange: "opacity, transform" }}>
      {children}
    </div>
  );
};

export default ScrollReveal;
