# Portfolio scroll animation

Open `/concept` on the local Next.js preview and press **Play film**. This is a browser-rendered Three.js concept, not a generated video or an exported MP4.

## Scope

- The homepage now includes a scroll-controlled phone sequence between the unchanged portrait hero and About. Navigation and portfolio content are unchanged.
- No link to this route is added to the public homepage.
- The user approved the integrated animation and its GitHub push.
- The Higgsfield generation request was rejected before receiving a job ID. The account reports no currently spendable free video generation. This alternative uses no generation credits.

## Preview

- Ten-second continuous shot in a responsive 16:9 studio frame.
- An unbranded phone displays a text-only portfolio introduction; no portrait, people, hands, or brand marks appear.
- A single deforming paper mesh emerges from the screen and unfurls onto the studio floor. Canvas textures preserve the section headings and source-backed portfolio details.
- Play, pause, replay, reset, and keyboard-accessible scrubbing are provided.
- Reduced-motion mode presents the finished composition without autoplay. Manual scrubbing remains available.
- Playback suspends while offscreen or in a hidden tab. Geometry, materials, textures, observers, and the renderer are cleaned up on unmount.
- Three.js loads dynamically when the animation approaches the viewport. Reduced-motion preferences and initial section deep links bypass the sequence.

## Files

- `app/concept/page.tsx`: isolated review route and no-index metadata.
- `app/concept/concept.css`: route-scoped presentation.
- `components/portfolio-film.tsx`: phone, lighting, printed textures, deformation, camera, and controls.
- `package.json` / lockfile: Three.js and its TypeScript definitions.

The small food thumbnail is cropped from the existing, user-authorized storefront preview to exclude its wordmark. No new remote image or video asset is used.

## Checks

Production build, lint, and TypeScript checks pass. Browser inspection verified the initial composition, midpoint, completed page, keyboard timeline at five seconds and ten seconds, playback progress, and reset to zero. A resize-clearing issue and tight final camera framing were corrected. The portrait hero hash remains `FC2C0092A8291D2A5CD4E912016D03D26833F9AE8F6B4D3D06469D8DA1A5DB0A`.

The homepage sequence unfolds over scrolling, zooms into About, and blends into the existing About section. Scrolling upward reverses it. Skip to About bypasses the sequence. The user reviewed and approved this integration for GitHub.


