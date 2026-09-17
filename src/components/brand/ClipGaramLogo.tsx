import { useEffect, useSyncExternalStore } from "react";
import primaryTransparentLogo from "../../assets/clipgaram-logo-on-light-cropped.svg";
import logoOnDark from "../../assets/clipgaram-logo-on-dark-cropped.svg";

// Preload both logo assets into memory immediately to prevent flash during theme changes
if (typeof window !== "undefined") {
  const p1 = new Image();
  p1.src = primaryTransparentLogo;
  const p2 = new Image();
  p2.src = logoOnDark;
}

function getActiveThemeSnapshot(): "light" | "dark" {
  if (typeof document !== "undefined") {
    const fromAttr = document.documentElement.dataset.theme;
    if (fromAttr === "light" || fromAttr === "dark") return fromAttr;
    try {
      const saved = localStorage.getItem("clipgaram-theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch {
      /* Storage unavailable */
    }
    if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  }
  return "light";
}

function subscribeToTheme(callback: () => void) {
  if (
    typeof MutationObserver === "undefined" ||
    typeof document === "undefined"
  ) {
    return () => {};
  }
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "data-theme"
      ) {
        callback();
        return;
      }
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

export function useActiveTheme(): "light" | "dark" {
  return useSyncExternalStore(
    subscribeToTheme,
    getActiveThemeSnapshot,
    () => "light",
  );
}

export interface ClipGaramLogoProps {
  className?: string;
  priority?: boolean;
  alt?: string;
  theme?: "light" | "dark";
}

/**
 * Official ClipGaram logo component.
 *
 * Requirements satisfied:
 * - Selects official SVG assets based on active theme:
 *   * In light mode: official dark SVG logo (clipgaram-primary-transparent.svg)
 *   * In dark mode: official light SVG logo (clipgaram-logo-on-dark.svg)
 * - Zero layout shift: both cropped assets share 990x265 dimensions and the same wrapper
 * - No CSS recoloring, stroke, or filters applied
 * - Responsive desktop/mobile sizing preserving aspect ratio
 * - Preloaded assets to avoid flicker
 */
export function ClipGaramLogo({
  className,
  priority = true,
  alt = "ClipGaram",
  theme: explicitTheme,
}: ClipGaramLogoProps) {
  const activeTheme = useActiveTheme();
  const theme = explicitTheme ?? activeTheme;
  const isDark = theme === "dark";

  useEffect(() => {
    const p1 = new Image();
    p1.src = primaryTransparentLogo;
    const p2 = new Image();
    p2.src = logoOnDark;
  }, []);

  const src = isDark ? logoOnDark : primaryTransparentLogo;

  return (
    <span className={`clipgaram-logo-wrapper ${className ?? ""}`.trim()}>
      <img
        src={src}
        alt={alt}
        width={990}
        height={265}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        className="clipgaram-logo clipgaram-logo-img"
      />
    </span>
  );
}
