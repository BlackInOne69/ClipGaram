# ClipGaram signup design QA

## Result

final result: passed

No remaining actionable P0/P1/P2 findings for this frontend milestone.

## Source and evidence

- Source visual truth: `references/previews/clipgaram-signup-light.png` and `references/previews/clipgaram-signup-dark.png`, each 1487 × 1058 pixels.
- Final implementation: `verification/desktop-light.png` and `verification/desktop-dark.png`, each 1487 × 1058 pixels, matching the reference viewport and default Clipper state. Source and implementation were displayed together in the same comparison calls. Desktop device pixel ratio was approximately 1; no density normalization was required.
- Additional target: 1440 × 1024 CSS viewport, `verification/desktop-1440.png`.
- Mobile: 390 × 844 CSS viewport. Browser reports 375px document content width with its scrollbar. Viewport captures are 375 × 811 pixels due to browser capture scaling. `verification/mobile-light-form.png`, `verification/mobile-dark-form.png`, and `verification/mobile-dark-art.png` were inspected. No mobile source image was supplied; checked against the requested responsive behavior.
- The initial full-page mobile capture (`mobile-light.png`) has browser stitching duplication and is excluded from QA evidence. The separate form and scrolled illustration captures supersede it; the DOM confirms only one illustration.
- Full desktop captures were large enough to read labels, typography, borders, view counts, and receipt details directly; additional focused crops were unnecessary.

## Comparison history

1. [P2, fixed] Cut line rendered solid because its dash units conflicted with normalized path length. Removed path normalization. Final screenshots show separated dashes.
2. [P2, fixed] Dark artwork inherited a dark UI surface for pale clip interiors, reducing fidelity. Switched these interiors to the stable paper token and retained the forest-green artwork color across themes. Final dark comparison confirms the pale interiors.
3. [P2, fixed] Light cut line disappeared against the dark film strip. Added a paper-colored dashed segment across the film. Final light screenshot confirms visibility.
4. Final same-size light and dark comparisons after these fixes: passed.

## Required fidelity surfaces

- **Typography:** locally bundled Fraunces for headings, Inter for controls and data. Heading hierarchy, two-line illustration title, and introductory copy match the composition. Minor letterform differences from the raster target remain because the explicitly requested font governs implementation.
- **Spacing/layout:** 44/56 desktop split, continuous background, restrained shared role container, aligned full-width controls. Main form and artwork positions follow the references. Mobile presents the form and legal links before a simplified three-clip/receipt illustration. No horizontal overflow observed at 390px or 1440px.
- **Colors/tokens:** supplied semantic token values preserved. The tokens are deliberately preferred over the reference image's brighter oranges and near-white paper. Dark artwork uses light outlines, pale interiors, and warm primary actions.
- **Asset fidelity:** all ten SVG groups are present and manually constructed, per the user's explicit requirement. No raster illustration, generated image, gradients, or shadows. SVG geometry is a faithful interpretation rather than a traced pixel-identical asset.
- **Copy:** all requested signup, role, field, CTA, sign-in, and legal text present. Required-state hints and simulation messages appear only where relevant. Supplementary links open honest milestone notices, not fabricated legal documents or extra pages.

## Functional verification

- Default Clipper role; arrow-right keyboard selection changes to Creator.
- Empty submission displays accessible email/password errors and focuses email.
- Valid email and password accept submission; Enter submits from password.
- Password show/hide changes input type and accessible button state.
- Loading disables duplicate signup actions and exposes a status message.
- Email simulation reaches the Creator success message; Google simulation reaches the Clipper success message. Success receives focus.
- Terms dialog opens, traps focus through native dialog behavior, and closes with Escape.
- Light/dark switching and stored preference verified.
- Browser console checked: no warning/error entries returned.
- Animation is one-shot, completes in 3.55 seconds, and ends with 12K/48K/102K counts. All animated groups have a single iteration. Reduced-motion CSS and the media-query hook were reviewed; this browser API did not expose reduced-motion emulation, so an OS-level reduced-motion run remains a manual test gap.
- Formatting, TypeScript checking, and final Vite production build passed.

## Follow-up polish

- P3: exact perspective, landscape contour, and serif rasterization differences remain in the manually built SVG/font rendering.
- Browser coverage is the available Chromium-based in-app browser. Physical iOS/Android and screen-reader testing were not performed.

## Implementation checklist

- [x] Signup frontend only, no backend or additional routes
- [x] Both themes and mobile layout
- [x] Accessible form states and local simulation
- [x] Named SVG groups and one-shot animation
- [x] Visual comparison, fixes, formatting, typecheck, build
