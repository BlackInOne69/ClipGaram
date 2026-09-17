import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  CheckCircle,
  EnvelopeSimple,
  Eye,
  EyeSlash,
  LockKey,
} from "@phosphor-icons/react";
import { AccountTypeSelector, type AccountType } from "./AccountTypeSelector";

export function SignupForm({
  onInfo,
  panel = false,
  mode = "signup",
  onSwitch,
  initialRole = "Clipper",
}: {
  onInfo: (title: string) => void;
  panel?: boolean;
  mode?: "signup" | "login";
  onSwitch?: () => void;
  initialRole?: AccountType;
}) {
  const login = mode === "login";
  const [role, setRole] = useState<AccountType>(initialRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [loading, setLoading] = useState<"email" | "google" | null>(null);
  const [success, setSuccess] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (success) successRef.current?.focus();
  }, [success]);
  function simulate(method: "email" | "google") {
    setLoading(method);
    timer.current = setTimeout(() => {
      setLoading(null);
      setSuccess(true);
      setPassword("");
    }, 1200);
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    const next = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        ? undefined
        : "Enter a valid email address.",
      password: (
        login
          ? password.length > 0
          : password.length >= 8 &&
            /[A-Za-z]/.test(password) &&
            /\d/.test(password)
      )
        ? undefined
        : login
          ? "Enter your password."
          : "Use at least 8 characters, including a letter and a number.",
    };
    setErrors(next);
    if (next.email) emailRef.current?.focus();
    else if (next.password) passwordRef.current?.focus();
    else simulate("email");
  }
  return (
    <>
      {!panel && (
        <div className="form-intro">
          <h1>Join ClipGaram</h1>
          <p>
            Create. Clip. Earn. Be part of Nepal’s creator economy
            <br className="intro-break" /> where great content finds real value.
          </p>
        </div>
      )}
      {success ? (
        <div
          className="success-state"
          ref={successRef}
          tabIndex={-1}
          role="status"
        >
          <CheckCircle size={40} weight="regular" />
          <h2>
            {login ? "Welcome back." : `You’re all set, ${role.toLowerCase()}.`}
          </h2>
          <p>
            Your {login ? "login" : "signup"} was simulated successfully. No
            account was {login ? "accessed" : "created"} and no information was
            sent.
          </p>
          <button className="primary-button" onClick={() => setSuccess(false)}>
            {login ? "Back to log in" : "Back to signup"}{" "}
            <ArrowRight size={22} />
          </button>
        </div>
      ) : (
        <form noValidate onSubmit={submit} aria-busy={!!loading}>
          {!login && (
            <AccountTypeSelector
              value={role}
              onChange={setRole}
              disabled={!!loading}
            />
          )}
          <button
            type="button"
            className="google-button"
            disabled={!!loading}
            onClick={() => simulate("google")}
          >
            <svg className="google-logo" aria-hidden="true" viewBox="0 0 48 48">
              <path
                fill="#4285F4"
                d="M43.6 24.5c0-1.5-.1-2.9-.4-4.4H24v8.3h11a9.5 9.5 0 0 1-4.1 6.2v5.2h6.7c3.9-3.6 6-8.9 6-15.3Z"
              />
              <path
                fill="#34A853"
                d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.7-5.2c-1.8 1.2-4.1 2-6.8 2-5.3 0-9.8-3.6-11.4-8.4H5.7v5.4A20.4 20.4 0 0 0 24 44Z"
              />
              <path
                fill="#FBBC05"
                d="M12.6 27.5a12 12 0 0 1 0-7V15H5.7a20 20 0 0 0 0 18l6.9-5.5Z"
              />
              <path
                fill="#EA4335"
                d="M24 12.1c3 0 5.6 1 7.7 3l5.8-5.8A19.5 19.5 0 0 0 24 4 20.4 20.4 0 0 0 5.7 15l6.9 5.5A12 12 0 0 1 24 12.1Z"
              />
            </svg>
            {loading === "google"
              ? "Connecting…"
              : panel
                ? "Continue with Google"
                : "Sign up with Google"}
          </button>
          <div className="divider">
            <span>OR</span>
          </div>
          <div className="field">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <div className="input-wrap">
              <EnvelopeSimple size={24} aria-hidden="true" />
              <input
                ref={emailRef}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                value={email}
                disabled={!!loading}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((current) => ({ ...current, email: undefined }));
                }}
              />
            </div>
            {errors.email && (
              <p className="error" id="email-error" role="alert">
                {errors.email}
              </p>
            )}
          </div>
          <div className="field password-field">
            <label htmlFor="password">
              Password <span className="required">*</span>
            </label>
            <div className="input-wrap">
              <LockKey size={24} aria-hidden="true" />
              <input
                ref={passwordRef}
                id="password"
                name="password"
                type={visible ? "text" : "password"}
                autoComplete={login ? "current-password" : "new-password"}
                placeholder={
                  login ? "Enter your password" : "Create a password"
                }
                required
                minLength={login ? undefined : 8}
                value={password}
                disabled={!!loading}
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password
                    ? "password-error"
                    : login
                      ? undefined
                      : "password-hint"
                }
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((current) => ({ ...current, password: undefined }));
                }}
              />
              <button
                type="button"
                className="visibility-toggle"
                disabled={!!loading}
                aria-label={visible ? "Hide password" : "Show password"}
                aria-pressed={visible}
                onClick={() => setVisible(!visible)}
              >
                {visible ? <EyeSlash size={25} /> : <Eye size={25} />}
              </button>
            </div>
            {!login && (
              <p className="password-hint" id="password-hint">
                At least 8 characters, with a letter and a number.
              </p>
            )}
            {errors.password && (
              <p className="error" id="password-error" role="alert">
                {errors.password}
              </p>
            )}
          </div>
          {login && (
            <p className="forgot-password">
              <a
                href="#forgot-password"
                onClick={(event) => {
                  event.preventDefault();
                  onInfo("Forgot password");
                }}
              >
                Forgot password?
              </a>
            </p>
          )}
          <button className="primary-button" disabled={!!loading} type="submit">
            {loading === "email"
              ? login
                ? "Logging in…"
                : "Creating account…"
              : login
                ? "Log in"
                : "Create account"}
            {loading ? (
              <span className="loading-dot" />
            ) : (
              <ArrowRight size={25} />
            )}
          </button>
          <p className="sign-in">
            {login ? "New to ClipGaram?" : "Already have an account?"}{" "}
            <a
              href={login ? "#sign-up" : "#sign-in"}
              onClick={(e) => {
                e.preventDefault();
                if (onSwitch) onSwitch();
                else onInfo("Sign in");
              }}
            >
              {login ? "Sign Up" : "Sign in"}
            </a>
          </p>
          <span className="sr-only" role="status">
            {loading ? "Processing your simulated signup." : ""}
          </span>
        </form>
      )}
      {!login && (
        <p className="legal">
          By creating an account, you agree to our{" "}
          <a
            href="#terms"
            onClick={(e) => {
              e.preventDefault();
              onInfo("Terms of Service");
            }}
          >
            Terms of Service
          </a>
          <br className="legal-break" /> and{" "}
          <a
            href="#privacy"
            onClick={(e) => {
              e.preventDefault();
              onInfo("Privacy Policy");
            }}
          >
            Privacy Policy
          </a>
          .
        </p>
      )}
    </>
  );
}
