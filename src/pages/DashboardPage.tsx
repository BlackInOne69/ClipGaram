import { useEffect, useState } from "react";
import { DashboardPageContent } from "../components/dashboard/DashboardPageContent";
import type { ClipGaramThemeName } from "../theme/clipgaram-theme";
import "../styles/dashboard.css";

function initialTheme(): ClipGaramThemeName {
  try {
    const saved = localStorage.getItem("clipgaram-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* storage unavailable */
  }
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function DashboardPage() {
  const [theme, setTheme] = useState<ClipGaramThemeName>(initialTheme);
  useEffect(() => {
    document.title = "Clipper Dashboard — ClipGaram";
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#101815" : "#f4f0e8");
    try {
      localStorage.setItem("clipgaram-theme", theme);
    } catch {
      /* theme remains active */
    }
  }, [theme]);
  return <DashboardPageContent theme={theme} onThemeChange={setTheme} />;
}
