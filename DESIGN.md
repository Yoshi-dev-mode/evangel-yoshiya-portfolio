---
name: Evangel Yoshiya Aranas Portfolio
description: Blue-white technology portfolio with an inline project explorer.
colors:
  paper: "#f2f6fa"
  section-alternate: "#e8eff6"
  navy: "#142b47"
  action-blue: "#285da6"
  secondary-ink: "#52677d"
  separator: "#cad7e4"
  action-hover: "#204d8c"
  white: "#ffffff"
typography:
  headline:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(36px, 4.8vw, 68px)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "28px"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "16px"
    lineHeight: 1.8
  label:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 600
rounded:
  tag: "4px"
  control: "5px"
  project-tab: "6px"
  visual: "8px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  section-mobile: "72px"
  section-tablet: "88px"
  section-desktop: "112px"
components:
  button-primary:
    backgroundColor: "{colors.action-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "14px 20px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
  project-tab-selected:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.paper}"
    rounded: "{rounded.project-tab}"
    padding: "23px 20px"
---

# Design System: Evangel Yoshiya Aranas Portfolio

## Overview

Preserve the incumbent blue-white and navy identity. The below-hero experience pairs generous editorial typography with inspectable project evidence and direct contact actions. Experience is the working mode: interaction helps visitors explore existing work rather than adding unsupported claims.

This document describes the below-hero system in `app/portfolio.css`. The portrait hero and navigation retain their existing appearance; `components/hero.tsx` and `app/globals.css` are outside this enhancement's edit scope. Manrope applies below the hero; the hero keeps its existing font stack.

Key characteristics:

- Pale blue section surfaces and navy ink.
- An inline, source-linked project explorer.
- Bounded state feedback and explicit content status.

## Colors

Action blue identifies controls and focus. Navy carries headings, selected project tabs, and the contact section. Paper and the alternating pale surface divide sections without adding heavy containers. Secondary ink supports readable descriptions and metadata; separators define groups. The contact section reverses to light text and pale blue controls, with local muted and focus-color overrides.

## Typography

Self-hosted Manrope, weights 400–700, supplies the below-hero typography with Arial and sans-serif fallbacks. Headings use sentence case, balanced wrapping, medium weight, and tight tracking. Body text is 16px with 1.8 line-height; project descriptions use 15px and a 65ch measure. Metadata ranges from 12–14px. Section headings become 38px at the mobile breakpoint; contact and credential headings have their own scale.

## Layout

The shared gutter is `clamp(22px, 4.2vw, 72px)`. Section padding is 112px, 88px at widths up to 1100px, and 72px up to 760px. About, learning, and contact use split grids that stack at 760px. The project explorer pairs a selector with a larger detail panel, then stacks on mobile; mobile tabs form a two-column grid. About and learning use viewport-height sections on larger screens and content-driven heights on mobile. Work uses a 100svh minimum, with a 730px explorer minimum removed on mobile; do not restore a 200svh work section.

## Elevation & Depth

The below-hero system is flat. Tonal surfaces, thin borders, and navy selection convey hierarchy without box shadows. Hover movement is small and local rather than a persistent raised-card effect.

## Shapes

Use modest radii: 4px technology tags, 5px controls, 6px project tabs, and 8px project visuals. Workflow nodes are circles. Borders and horizontal rules group content; decorative card shells are unnecessary.

## Components

### Controls and focus

Links and buttons have at least 44px target height. Primary controls pair action blue with white; hover deepens the blue and shifts the control upward 2px, with a 1px downward active state. Focus is a 3px blue outline with 5px offset. The screenshot link uses a negative 5px outline offset so its ring remains inside the clipped visual.

### Project explorer

Category filters expose pressed state; project tabs expose selection, use roving focus, and support arrow keys, Home, and End with labelled panels. Keep source links alongside project details. The selected panel uses one 300ms clip/opacity entrance. Controls use 180–200ms state feedback. The storefront screenshot has a bounded 600ms hover scale to 1.025.

The storefront visual is a real screenshot. Other project visuals are semantic workflow diagrams based on verified descriptions, not invented product screens.

Asset provenance:

- Storefront screenshot: user’s public `Yoshi-dev-mode/e-commerce-website-project` repository, `docs/storefront-preview.webp`, downloaded through the GitHub contents API. Shipped as `public/images/projects/storefront.webp`; no alteration.
- Manrope Latin variable font: Google Fonts, `https://fonts.gstatic.com/s/manrope/v23/xn7gYHE41ni1AdIRggexSg.woff2`; license from the Google Fonts Manrope directory. The OFL license is included with the self-hosted font.
- The other project visuals are semantic workflow diagrams derived from previously verified README descriptions, not fabricated product screenshots.

### Learning and contact

Learning disclosures reveal existing descriptions and relevant public links, with a 180ms opacity entrance rather than animated dimensions. Contact presents LinkedIn, GitHub, and clipboard copying with explicit success/error feedback. Keep feedback space reserved to avoid abrupt shifts.

### Motion and verification scope

Use CSS state transitions and the existing easing `cubic-bezier(0.16, 1, 0.3, 1)`. Each below-hero section now has a user-requested, one-time 650ms fade and 24px upward arrival as it enters the viewport. Content stays visible without JavaScript. No autoplay loop, parallax, or animation dependency is introduced. Reduced-motion preferences disable the new animation and transition layer. The independent finish reviewer returned a ship disposition on the two requested fixes. The inset focus-ring fix was verified in source; no focused-state capture was taken. An updated desktop capture confirms the project spacing fix. Production build, lint, and type checking pass. Responsive captures cover 1440, 1024, 820, 768, and 390px; the layout checker reported template-specific viewport/grid findings, with content-height and two-column layouts intentionally accepted, so no clean automated layout verdict is claimed. The consistency checker was stopped before completion; the detector was unavailable because launcher setup failed.

## Do's and Don'ts

- Do preserve the hero, navigation, blue-white identity, and source facts in `data/portfolio.ts`.
- Do keep selected, focus, expanded, and clipboard result states explicit.
- Do preserve the screenshot and font provenance above.
- Don't add expertise, employment, outcome, or credential claims. Certification entries must match the authenticated LinkedIn source in data/certifications.json; do not imply an independent issuer audit.
- Don't substitute fabricated screenshots for semantic diagrams or obscure source links.
- Keep scroll arrivals subtle and one-time; never animate layout dimensions in learning disclosures.



