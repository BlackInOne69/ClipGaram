import { SignupForm } from "./SignupForm";

// Reuse the established fields, errors, visibility toggle and local submission lifecycle.
export function LoginForm({
  onInfo,
  onSignup,
}: {
  onInfo: (title: string) => void;
  onSignup: () => void;
}) {
  return <SignupForm mode="login" panel onInfo={onInfo} onSwitch={onSignup} />;
}
