import { useEffect, useRef, useState } from "react";
import { X } from "@phosphor-icons/react";
import type { ClipGaramThemeName } from "../theme/clipgaram-theme";

import { MobileAuthExperience } from "../components/auth/MobileAuthExperience";
import "../styles/mobile-auth.css";

function initialTheme(): ClipGaramThemeName {
  try {
    const saved = localStorage.getItem("clipgaram-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* Storage may be unavailable. */
  }
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function SignupPage() {
  const params = new URLSearchParams(window.location.search);
  const initialTab = window.location.pathname === "/login" ? "login" : "signup";
  const initialRole = params.get("role") === "Creator" ? "Creator" : "Clipper";
  const [theme, setTheme] = useState<ClipGaramThemeName>(initialTheme);
  const [info, setInfo] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#122621" : "#f4f0e8");
    try {
      localStorage.setItem("clipgaram-theme", theme);
    } catch {
      /* Theme still works without storage. */
    }
  }, [theme]);
  function openInfo(title: string) {
    setInfo(title);
    dialog.current?.showModal();
  }
  return (
    <main className="signup-page">
      <MobileAuthExperience
        onInfo={openInfo}
        theme={theme}
        onThemeChange={setTheme}
        initialTab={initialTab}
        initialRole={initialRole}
        onSuccess={() => window.location.assign("/dashboard")}
      />
      <dialog ref={dialog} className="info-dialog" aria-labelledby="info-title">
        <button
          className="dialog-close"
          aria-label="Close dialog"
          onClick={() => dialog.current?.close()}
        >
          <X size={23} />
        </button>
        <h2 id="info-title">{info}</h2>
        <p>
          {info === "Forgot password"
            ? "Password reset will be available when accounts are connected. No reset email is sent in this preview."
            : info === "Sign in"
              ? "Sign-in will be available when accounts are connected. For now, you can try the signup experience on this page."
              : `${info} will be published before ClipGaram launches. This frontend preview does not create accounts or send your signup details anywhere.`}
        </p>
        <button
          className="primary-button"
          onClick={() => dialog.current?.close()}
        >
          Back to signup
        </button>
      </dialog>
    </main>
  );
}
