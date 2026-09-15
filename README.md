# ClipGaram signup milestone

React, TypeScript, Vite, regular CSS, locally bundled Fraunces and Inter fonts.

## Commands

- `npm install`
- `npm run dev` — local preview at http://127.0.0.1:4173
- `npm run format` / `npm run format:check`
- `npm run typecheck`
- `npm run test:mobile` — focused lifecycle, reduced-motion, focus, login, and cleanup tests
- `npm run build` — production frontend in `dist/client`

## Scope

One authentication page. Desktop retains the original signup/illustration composition. At 760px and below, a full-viewport introduction is replaced by one Sign Up / Log In panel. Both forms simulate success after 1.2 seconds. No credentials are transmitted or persisted. Only the selected theme is stored locally. Terms, Privacy, and password reset open milestone notices; production authentication and legal documents are not included.

Mobile uses `intro → intro-exiting → auth`. The final SVG animation event invokes `onComplete`; the exit animation holds for 150ms and fades/scales out over 250ms. Auth mounts at approximately 3.95 seconds and enters over 280ms. Skip mounts auth immediately. Reduced-motion users bypass the introduction and all entrance/exit movement. Only the panel scrolls on small screens. Tabs never remount the introduction.

The provided files are preserved in `references/`. Semantic token values are used as supplied, even where screenshot colors differ. Artwork is manually layered inline SVG with all ten requested named groups. The animation finishes in 3.55 seconds and does not loop. CSS disables animation for reduced-motion preferences; the separate animation hook immediately completes counts and cancels pending frames when that preference changes.

Password validation requires eight characters including a letter and a number. Native radio controls provide arrow-key role selection. Invalid submission focuses the first invalid input. Dialogs use native modal focus management and Escape dismissal.

See `mobile-auth-qa.md` for current verification. `design-qa.md` records the original milestone before the mobile interaction update.
