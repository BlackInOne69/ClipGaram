// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { MobileAuthExperience } from "../src/components/auth/MobileAuthExperience";

let reduced = false;
let listeners: Set<() => void>;
function endAnimation(element: Element, animationName: string) {
  // jsdom lacks AnimationEvent; preserve the property React reads in browsers.
  const event = new Event("webkitAnimationEnd", { bubbles: true });
  Object.defineProperty(event, "animationName", { value: animationName });
  fireEvent(element, event);
}
beforeEach(() => {
  reduced = false;
  listeners = new Set();
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({
      get matches() {
        return reduced;
      },
      addEventListener: (_: string, cb: () => void) => listeners.add(cb),
      removeEventListener: (_: string, cb: () => void) => listeners.delete(cb),
    })),
  );
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("mobile authentication lifecycle", () => {
  it("mounts no form during the intro, then completes through the SVG callback and exit event", () => {
    const { container } = render(<MobileAuthExperience onInfo={() => {}} />);
    expect(container.querySelector("form")).toBeNull();
    endAnimation(container.querySelector("#clipOne")!, "rise");
    expect(
      container.querySelector("[data-stage]")?.getAttribute("data-stage"),
    ).toBe("intro");
    endAnimation(container.querySelector("#verifiedCheck path")!, "draw");
    expect(
      container.querySelector("[data-stage]")?.getAttribute("data-stage"),
    ).toBe("intro-exiting");
    expect(container.querySelector("form")).toBeNull();
    endAnimation(
      container.querySelector(".mobile-intro")!,
      "mobile-intro-exit",
    );
    expect(container.querySelector(".journey")).toBeNull();
    expect(container.querySelectorAll("form")).toHaveLength(1);
    expect(document.activeElement?.id).toBe("auth-heading");
  });

  it("skips directly to auth and does not replay the introduction when switching tabs", () => {
    const { container } = render(<MobileAuthExperience onInfo={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: "Skip introduction" }));
    expect(document.activeElement?.id).toBe("auth-heading");
    fireEvent.click(screen.getByRole("tab", { name: "Log In" }));
    expect(screen.queryByRole("group", { name: "Account Type" })).toBeNull();
    expect(screen.getByRole("button", { name: "Log in" })).toBeTruthy();
    fireEvent.click(screen.getByRole("link", { name: "Sign Up" }));
    expect(screen.getByRole("group", { name: "Account Type" })).toBeTruthy();
    expect(container.querySelectorAll("form")).toHaveLength(1);
    expect(container.querySelector(".journey")).toBeNull();
  });

  it("bypasses the intro on initial reduced motion and on a live preference change", () => {
    reduced = true;
    const first = render(<MobileAuthExperience onInfo={() => {}} />);
    expect(
      screen.queryByRole("button", { name: "Skip introduction" }),
    ).toBeNull();
    expect(document.activeElement?.id).toBe("auth-heading");
    first.unmount();
    reduced = false;
    const second = render(<MobileAuthExperience onInfo={() => {}} />);
    expect(second.container.querySelector(".journey")).toBeTruthy();
    act(() => {
      reduced = true;
      [...listeners].forEach((cb) => cb());
    });
    expect(second.container.querySelector(".journey")).toBeNull();
    expect(document.activeElement?.id).toBe("auth-heading");
    act(() => {
      reduced = false;
      [...listeners].forEach((cb) => cb());
    });
    expect(second.container.querySelector(".journey")).toBeNull();
  });

  it("validates login, simulates success, and cancels pending form timers on tab change", () => {
    vi.useFakeTimers();
    reduced = true;
    render(<MobileAuthExperience onInfo={() => {}} />);
    fireEvent.click(screen.getByRole("tab", { name: "Log In" }));
    fireEvent.click(screen.getByRole("button", { name: "Log in" }));
    expect(screen.getByText("Enter your password.")).toBeTruthy();
    expect(document.activeElement?.id).toBe("email");
    fireEvent.change(screen.getByLabelText("Email *"), {
      target: { value: "demo@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password *"), {
      target: { value: "existing-password" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Log in" }));
    expect(
      screen
        .getByRole("button", { name: "Logging in…" })
        .hasAttribute("disabled"),
    ).toBe(true);
    act(() => vi.advanceTimersByTime(1200));
    expect(
      screen.getByText(/Your login was simulated successfully/),
    ).toBeTruthy();
    fireEvent.click(screen.getByRole("tab", { name: "Sign Up" }));
    fireEvent.click(
      screen.getByRole("button", { name: "Continue with Google" }),
    );
    fireEvent.click(screen.getByRole("tab", { name: "Log In" }));
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.queryByText(/simulated successfully/)).toBeNull();
  });

  it("cleans up media subscriptions and the illustration animation frame on unmount", () => {
    const cancel = vi.spyOn(window, "cancelAnimationFrame");
    const { unmount } = render(<MobileAuthExperience onInfo={() => {}} />);
    unmount();
    expect(listeners.size).toBe(0);
    expect(cancel).toHaveBeenCalled();
    cancel.mockRestore();
  });
});
