import { useState, useEffect } from "react";

/** Returns a 0–1 value representing how far the user has scrolled through the page */
const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // rAF-throttle so scroll handling runs at most once per frame, and skip
    // redundant state updates — both cut the re-render churn that makes the
    // scroll-driven pages feel heavy on mid-range mobile devices.
    let raf = 0;
    let last = -1;
    const compute = () => {
      raf = 0;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const next = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      if (Math.abs(next - last) > 0.0005) {
        last = next;
        setProgress(next);
      }
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    compute();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return progress;
};

export default useScrollProgress;
