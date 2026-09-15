import { useEffect, useState } from "react";
import { Brand } from "./Brand";
import { ClipJourneyAnimation } from "./ClipJourneyAnimation";
import { AuthPanel } from "./AuthPanel";
import { useMediaQuery } from "./useMediaQuery";

type Stage = "intro" | "intro-exiting" | "auth";

export function MobileAuthExperience({
  onInfo,
}: {
  onInfo: (title: string) => void;
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
      className="mobile-auth-experience"
      data-stage={showAuth ? "auth" : stage}
    >
      <header className="mobile-brand">
        <Brand />
      </header>
      {showAuth ? (
        <AuthPanel onInfo={onInfo} />
      ) : (
        <>
          <button
            className="skip-intro"
            aria-label="Skip introduction"
            type="button"
            onClick={() => setStage("auth")}
          >
            Skip<span className="sr-only"> introduction</span>
          </button>
          <section
            className={`mobile-intro ${stage === "intro-exiting" ? "is-exiting" : ""}`}
            aria-label="Welcome to ClipGaram"
            onAnimationEnd={(event) => {
              if (
                event.target === event.currentTarget &&
                event.animationName === "mobile-intro-exit"
              )
                setStage("auth");
            }}
          >
            <h1>
              Turn moments
              <br />
              into momentum.
            </h1>
            <ClipJourneyAnimation
              onComplete={() =>
                setStage((current) =>
                  current === "intro" ? "intro-exiting" : current,
                )
              }
            />
          </section>
        </>
      )}
    </div>
  );
}
