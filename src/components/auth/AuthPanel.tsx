import { useEffect, useRef, useState } from "react";
import { AuthTabs, type AuthTab } from "./AuthTabs";
import { SignupForm } from "./SignupForm";
import { LoginForm } from "./LoginForm";

export function AuthPanel({ onInfo }: { onInfo: (title: string) => void }) {
  const [tab, setTab] = useState<AuthTab>("signup");
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, []);
  return (
    <section className="auth-panel" aria-labelledby="auth-heading">
      <header className="auth-panel-heading">
        <h1 id="auth-heading" ref={heading} tabIndex={-1}>
          {tab === "signup" ? "Join ClipGaram" : "Welcome back"}
        </h1>
        <p>
          {tab === "signup"
            ? "Create. Clip. Earn. Your next chapter starts here."
            : "Your next great moment is waiting."}
        </p>
      </header>
      <AuthTabs value={tab} onChange={setTab} />
      <div
        key={tab}
        role="tabpanel"
        id={`panel-${tab}`}
        aria-labelledby={`tab-${tab}`}
      >
        {tab === "signup" ? (
          <SignupForm panel onInfo={onInfo} onSwitch={() => setTab("login")} />
        ) : (
          <LoginForm onInfo={onInfo} onSignup={() => setTab("signup")} />
        )}
      </div>
    </section>
  );
}
