import { useRef } from "react";
export type AuthTab = "signup" | "login";

export function AuthTabs({
  value,
  onChange,
}: {
  value: AuthTab;
  onChange: (tab: AuthTab) => void;
}) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const tabs = ["signup", "login"] as const;
  return (
    <div className="auth-tabs" role="tablist" aria-label="Authentication">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          ref={(node) => {
            buttons.current[index] = node;
          }}
          type="button"
          role="tab"
          id={`tab-${tab}`}
          aria-controls={`panel-${tab}`}
          aria-selected={value === tab}
          tabIndex={value === tab ? 0 : -1}
          onClick={() => onChange(tab)}
          onKeyDown={(event) => {
            let next: number;
            if (event.key === "ArrowRight" || event.key === "ArrowLeft")
              next = 1 - index;
            else if (event.key === "Home") next = 0;
            else if (event.key === "End") next = 1;
            else return;
            event.preventDefault();
            onChange(tabs[next]);
            buttons.current[next]?.focus();
          }}
        >
          {tab === "signup" ? "Sign Up" : "Log In"}
        </button>
      ))}
    </div>
  );
}
