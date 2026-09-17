import { useEffect, useState } from "react";
import { Brand } from "./Brand";
import { ClipJourneyAnimation } from "./ClipJourneyAnimation";
import { AuthPanel } from "./AuthPanel";
import { ThemeToggle } from "./ThemeToggle";
import { useMediaQuery } from "./useMediaQuery";
import type { ClipGaramThemeName } from "../../theme/clipgaram-theme";
import type { AccountType } from "./AccountTypeSelector";
import type { AuthTab } from "./AuthTabs";

type Stage = "intro" | "intro-exiting" | "auth";

export function MobileAuthExperience({
  onInfo,
  theme,
  onThemeChange,
  initialTab,
  initialRole,
}: {
  onInfo: (title: string) => void;
  theme: ClipGaramThemeName;
  onThemeChange: (theme: ClipGaramThemeName) => void;
  initialTab?: AuthTab;
  initialRole?: AccountType;
}) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [stage, setStage] = useState<Stage>(() =>
    reducedMotion ? "auth" : "intro",
  );
  // A live preference change immediately removes the intro, even during exit.
  useEffect(() => {
    if (reducedMotion) setStage("auth");
  }, [reducedMotion]);
  const showAuth = reducedMotion || stage === "auth";
  return (
    <div
      className="auth-shell mobile-auth-experience"
      data-stage={showAuth ? "auth" : stage}
    >
      <section
        className="auth-column auth-form-column form-side"
        aria-label="ClipGaram authentication"
      >
        <header className="auth-brand">
          <Brand />
          <ThemeToggle
            className="mobile-auth-theme-toggle"
            theme={theme}
            onChange={onThemeChange}
          />
        </header>
        <div className="form-content">
          <AuthPanel
            onInfo={onInfo}
            active={showAuth}
            initialTab={initialTab}
            initialRole={initialRole}
          />
        </div>
      </section>
      <section
        className={`auth-column auth-visual-column illustration-side mobile-intro ${stage === "intro-exiting" ? "is-exiting" : ""}`}
        aria-label="Welcome to ClipGaram"
        onAnimationEnd={(event) => {
          if (
            event.target === event.currentTarget &&
            event.animationName === "mobile-intro-exit"
          )
            setStage("auth");
        }}
      >
        <header className="mobile-intro-header">
          <div className="mobile-brand">
            <Brand />
          </div>
          <div className="mobile-intro-actions">
            {!showAuth && (
              <button
                className="skip-intro"
                aria-label="Skip introduction"
                type="button"
                onClick={() => setStage("auth")}
              >
                Skip<span className="sr-only"> introduction</span>
              </button>
            )}
            <ThemeToggle theme={theme} onChange={onThemeChange} />
          </div>
        </header>
        <div className="mobile-intro-stage">
          <h2 className="mobile-intro-title" id="journey-heading">
            Turn moments
            <br />
            into momentum.
          </h2>
          <div className="auth-animation-wrapper mobile-intro-animation">
            <ClipJourneyAnimation
              onComplete={() =>
                setStage((current) =>
                  current === "intro" ? "intro-exiting" : current,
                )
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}
