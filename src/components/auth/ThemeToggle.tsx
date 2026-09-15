import { Moon, Sun } from "@phosphor-icons/react";
import type { ClipGaramThemeName } from "../../theme/clipgaram-theme";

export function ThemeToggle({
  theme,
  onChange,
}: {
  theme: ClipGaramThemeName;
  onChange: (theme: ClipGaramThemeName) => void;
}) {
  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      onClick={() => onChange(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <Moon size={21} /> : <Sun size={21} />}
    </button>
  );
}
