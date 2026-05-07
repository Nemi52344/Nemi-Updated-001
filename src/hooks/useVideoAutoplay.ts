import { useEffect, useRef } from "react";

/**
 * Returns a ref to attach to a <video> element.
 * The video plays automatically when ≥50% of it enters the viewport
 * and pauses when it leaves.
 */
export function useVideoAutoplay(threshold = 0.5) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.currentTime = 0;
          video.play().catch(() => {
            // Autoplay blocked — silently ignore; user can still use controls
          });
        } else {
          video.pause();
        }
      },
      { threshold }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [threshold]);

  return videoRef;
}
