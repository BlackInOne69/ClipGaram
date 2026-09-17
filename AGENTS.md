# Prototype Instructions

## Locked mobile authentication behavior

At the existing 760px mobile breakpoint, show a full-viewport SVG introduction, then replace it with one scrollable Sign Up / Log In panel in the same viewport. Never stack the illustration and form. Preserve the desktop side-by-side composition exactly. The SVG signals completion; tab changes never replay the intro. Provide Skip, focus the auth heading, and bypass all intro/transition motion for reduced-motion users. Keep supplied tokens, fonts, and local-only authentication simulation.

Use one shared auth shell for desktop and mobile. CSS alone owns the 760px structural change; do not use JavaScript viewport detection, resolution-specific conditions, whole-page transforms, or additional device breakpoints. Within each mode, size against available width and height with intrinsic Grid/Flexbox layout and fluid CSS functions. Normal viewports must not scroll at the document level; abnormally short forms may scroll only inside the auth panel.

The mobile intro uses two intrinsic rows: a compact logo/Skip/theme header and one centered stage containing the two-line headline directly above the complete SVG animation. Keep intro elements in normal Grid/Flexbox flow; do not position the mobile headline or header controls with absolute offsets.

Use the shared `ClipGaramLogo` component with the equivalent cropped light/dark full-wordmark SVGs. Preserve the artwork and 990×265 viewBox crop, and size the logo fluidly so the visible wordmark remains prominent on desktop and mobile without using the square app icon.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Master 2 landing page

The root route is the responsive Master 2 marketing page. Keep `/signup`, `/login`, and `/auth` on the shared authentication shell; landing-page role CTAs pass `role=Clipper` or `role=Creator` into that shell. Build the landing artwork as reusable inline SVG components, and reveal section motion once with IntersectionObserver while immediately showing final states for reduced-motion users.
