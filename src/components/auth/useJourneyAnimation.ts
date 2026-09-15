import { useEffect, useState } from "react";

// One shared clock; motion changes and unmounts cancel all pending frames.
export function useJourneyAnimation() {
  const [progress, setProgress] = useState(1);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    function start() {
      cancelAnimationFrame(frame);
      if (preference.matches) {
        setProgress(1);
        return;
      }
      const startTime = performance.now();
      setProgress(0);
      function tick(now: number) {
        const value = Math.min(1, Math.max(0, (now - startTime - 1500) / 950));
        setProgress(value);
        if (value < 1) frame = requestAnimationFrame(tick);
      }
      frame = requestAnimationFrame(tick);
    }
    start();
    preference.addEventListener("change", start);
    return () => {
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", start);
    };
  }, []);
  return progress;
}
