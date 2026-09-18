import { useEffect, useRef, useState } from "react";
import { AuthTabs, type AuthTab } from "./AuthTabs";
import { SignupForm } from "./SignupForm";
import { LoginForm } from "./LoginForm";
import type { AccountType } from "./AccountTypeSelector";

export function AuthPanel({
  onInfo,
  active = true,
  initialTab = "signup",
  initialRole = "Clipper",
  onSuccess,
}: {
  onInfo: (title: string) => void;
  active?: boolean;
  initialTab?: AuthTab;
  initialRole?: AccountType;
  onSuccess?: (role: AccountType, mode: "signup" | "login") => void;
}) {
  const [tab, setTab] = useState<AuthTab>(initialTab);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (active) heading.current?.focus({ preventScroll: true });
  }, [active]);
  return (
    <section className="auth-panel" aria-labelledby="auth-heading">
      <header className="auth-panel-heading">
        <h1
          id="auth-heading"
          ref={heading}
          tabIndex={-1}
          className="auth-heading"
        >
          {tab === "signup" ? "Join ClipGaram" : "Welcome back"}
        </h1>
        <p>
          {tab === "signup"
            ? "Create. Clip. Earn. Be part of Nepal’s creator economy where great content finds real value."
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
          <SignupForm
            panel
            initialRole={initialRole}
            onInfo={onInfo}
            onSwitch={() => setTab("login")}
            onSuccess={onSuccess}
          />
        ) : (
          <LoginForm
            onInfo={onInfo}
            onSignup={() => setTab("signup")}
            onSuccess={onSuccess}
          />
        )}
      </div>
    </section>
  );
}
