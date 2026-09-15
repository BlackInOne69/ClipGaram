# ClipGaram Auth Visual System

This document locks the visual foundation for the ClipGaram signup experience in light and dark modes.

## Typography

### Display font — Fraunces

Use **Fraunces** for the signup headline, illustration headline, marketing headings, and occasional high-emphasis statistics.

- Recommended weights: 600 and 700
- Desktop signup heading: 64–72px, line-height 0.98–1.04
- Mobile signup heading: 38–44px, line-height 1.04–1.1
- Keep sentence case; avoid using Fraunces for form labels or long paragraphs.

### Interface font — Inter

Use **Inter** for all controls, labels, form fields, navigation, body copy, legal text, data, and buttons.

- Body: 16px / 24px
- Form labels: 14px / 20px, weight 600
- Inputs and buttons: 16px / 24px
- Small/legal text: 12–13px / 18px
- Account-type label: 12px, weight 600, tracking 0.08em

Install for React web with `@fontsource/fraunces` and `@fontsource/inter`. Use the same font files in the mobile app so metrics stay consistent.

## Brand Primitives

| Name | Value | Role |
|---|---:|---|
| Forest | `#203A35` | Core identity and light-mode primary |
| Clay | `#D7653D` | Warm accent |
| Paper | `#F4F0E8` | Core light background and dark-mode text |
| Sage | `#8FAE9F` | Supporting illustration color |

Brand primitives should remain stable. Semantic tokens may adapt between modes.

## Light Mode

| Token | Value | Use |
|---|---:|---|
| Background | `#F4F0E8` | Continuous page background |
| Surface | `#FBF8F1` | Inputs and subtle controls |
| Raised surface | `#FFFFFF` | OAuth button or necessary emphasis |
| Primary text | `#203A35` | Headings and body |
| Muted text | `#5F6D68` | Supporting and legal copy |
| Primary | `#203A35` | CTA and selected role |
| Primary hover | `#172F2A` | Hover/pressed state |
| Accent | `#D7653D` | Illustration and focused highlights |
| Border | `#D5D9D3` | Inputs and dividers |
| Focus | `#D7653D` | Keyboard focus ring |

## Dark Mode

| Token | Value | Use |
|---|---:|---|
| Background | `#122621` | Continuous page background |
| Surface | `#1B352E` | Inputs and OAuth button |
| Raised surface | `#203A35` | Selected/raised elements |
| Primary text | `#F4F0E8` | Headings and body |
| Muted text | `#B8C4BE` | Supporting and legal copy |
| Primary | `#EF8A67` | CTA and selected role |
| Primary hover | `#F3A487` | Hover/pressed state |
| Border | `#3C554F` | Inputs and dividers |
| Strong border | `#769087` | High-emphasis boundaries |
| Focus | `#F3A487` | Keyboard focus ring |

## Verified Contrast

| Pair | Contrast |
|---|---:|
| Light primary text / light background | 10.75:1 |
| Light muted text / light background | 4.77:1 |
| Paper text / forest button | 10.75:1 |
| Dark primary text / dark background | 13.94:1 |
| Dark muted text / dark background | 8.81:1 |
| Dark background text / clay button | 6.42:1 |

These core combinations meet WCAG AA for normal text. Clay should not be used for small text directly on the paper background; use forest for light-mode links.

## Mode Rules

- Use one continuous background across the form and illustration sides in both modes.
- Do not invert every color mechanically. Dark mode uses a brighter clay (`#EF8A67`) for legibility.
- Inputs use surface color and a visible border; avoid relying on shadows.
- The selected account type and primary CTA use the same semantic `primary` token.
- Illustration geometry remains identical between themes; only token assignments change.
- The logo should use its light lockup in dark mode and dark lockup in light mode.

## Animation Preparation

Keep the illustration as separate SVG groups named `filmStrip`, `cutLine`, `scissors`, `clipOne`, `clipTwo`, `clipThree`, `viewCounts`, `arrows`, `receipt`, and `verifiedCheck`. Animation must respect `prefers-reduced-motion`.

