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

## Clipper dashboard

Use `/dashboard` and `/clipper/dashboard` for the authenticated Clipper dashboard. Successful local Clipper authentication routes to `/dashboard`. Keep the dashboard on the shared light/dark theme system with one sidebar profile, no role switch, and no Active campaign card. Preserve the attached dashboard light/dark references as the source of truth, keep mock dashboard data separate from chart and page components, and retain internal mobile table reflow so the document never scrolls horizontally.

At the dashboard mobile breakpoint, hide the desktop sidebar and search bar. Use the full ClipGaram wordmark, notification control, and one profile-avatar menu in the top bar. Keep Dashboard, Campaigns, My clips, Earnings, and More in a fixed safe-area-aware bottom navigation; More exposes the remaining sidebar destinations. Preserve the single-column content order from metrics through Recent clips and reserve enough bottom padding that the navigation never covers content.

At desktop widths from 1024px, keep the dashboard shell within `100dvh` with no page scrolling. Lay out the main content as heading, metrics, flexible analytics, and Recent clips grid rows. Use height-aware spacing, chart, card, and table density so common 768px through 1440px viewport heights retain every section and the sidebar profile without overlap. These height rules must never apply below the desktop breakpoint.

## Discover campaigns

Use `/campaigns` (also `/clipper/campaigns`) and `/campaigns/:id` for the campaign list and local detail pages. The supplied `src/assets/campaign light.png` and `campaign dark.png` lock the desktop design. Reuse the dashboard shell, wordmark, theme, icons, and mobile navigation; Discover campaigns / Campaigns is active. Keep the five concise photo listings and the initially open desktop filter panel. Campaigns may scroll vertically on desktop and mobile; dashboard-only viewport density rules must not constrain this page. Use one responsive filter component with draft/apply state, an accessible mobile drawer, and rates explicitly expressed as NPR per 1,000 verified views. Mock records stay separate from UI; detail briefs are sample content, with no payment or submission workflow.
