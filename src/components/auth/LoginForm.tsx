import { SignupForm } from "./SignupForm";
import type { AccountType } from "./AccountTypeSelector";

// Reuse the established fields, errors, visibility toggle and local submission lifecycle.
export function LoginForm({
  onInfo,
  onSignup,
  onSuccess,
}: {
  onInfo: (title: string) => void;
  onSignup: () => void;
  onSuccess?: (role: AccountType, mode: "signup" | "login") => void;
}) {
  return (
    <SignupForm
      mode="login"
      panel
      onInfo={onInfo}
      onSwitch={onSignup}
      onSuccess={onSuccess}
    />
  );
}
