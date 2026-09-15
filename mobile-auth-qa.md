# Mobile authentication update QA

Result: passed.

## Implementation

- Existing breakpoint retained: max-width 760px.
- `MobileAuthExperience`: mutually exclusive intro/auth DOM; three-stage state machine; native keyboard-accessible Skip; reduced-motion subscription with cleanup.
- `ClipJourneyAnimation`: unchanged SVG/timing with optional `onComplete` fired by the final checkmark animation event. No new intro timers.
- Exit includes a 150ms completed-frame hold plus 250ms fade/scale. Auth mounts at approximately 3.95s and enters with a 280ms subtle rise. Completion focuses the mounted heading.
- `AuthPanel`/`AuthTabs`: one mounted form; keyboard arrows/Home/End; semantic tabs and tabpanel. Login reuses the original SignupForm fields, error/focus behavior, visibility toggle, and cleaned-up simulation timer through a mode prop. Desktop defaults are unchanged.
- Login requires a valid email and nonempty existing password. Signup keeps its original stronger password rule.

## Browser verification

- **390 × 844:** observed full transition via six timed screenshots (`verification/transition-0.png` through `transition-5.png`). DOM observations: intro has zero forms; exiting has zero forms; auth has one form, no journey SVG, and focused `auth-heading`. Full document width/height equal 390/844.
- **430 × 932:** light signup panel inspected (`verification/mobile-signup-430.png`). Document width/height equal 430/932; no outer scroll or overflow.
- **320 × 568 extra check:** document stays 320/568. Panel client height 482px versus 725px scroll height; only the panel scrolls. Added explicit Google-button text padding after spotting a crowded icon/text gap.
- **Skip:** Enter on Skip mounts auth immediately and focuses heading.
- **Tabs:** clicking Log In and arrow-left back to Sign Up leaves stage `auth`, one form, zero journey SVGs. Login includes Google, email, current-password autocomplete, visibility toggle, forgot-password link, submit and signup switch.
- **Themes:** dark 390px and light 430px inspected. Existing semantic tokens/fonts retained.
- **Desktop 1440 × 1024:** before/after screenshots saved as `verification/desktop-before-mobile-update.png` and `desktop-after-mobile-update.png`, displayed together. Bounding rectangles of form side, heading, illustration side, and journey match exactly. Original controls, copy, and side-by-side layout remain. Capture scaling varies slightly with the in-app browser surface; CSS viewport/geometry were checked independently.
- No browser console warning/error entries returned.

## Automated verification

`npm run test:mobile`: 5 tests passed:

1. SVG callback/exit event progression and mutually exclusive DOM.
2. Skip, heading focus, tab switches without intro replay.
3. Reduced-motion initial bypass, live preference change, and no replay when re-enabled.
4. Login validation/simulation and cancellation of pending submission on tab change.
5. Media listener and animation-frame cleanup on unmount.

Reduced-motion media conditions are mocked in jsdom; OS-level media emulation is not exposed by the available browser API. CSS additionally disables all transitions/animations for the real preference. Real browser animation events were verified separately in the complete timed transition.

Formatting, TypeScript checking, and production build passed. No backend or extra routes added. Durable mobile requirements recorded in AGENTS.md.
