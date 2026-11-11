# Evangel Yoshiya Aranas — Portfolio

A responsive personal portfolio with a portrait-led hero, opposing seamless text marquees, and source-backed project content. Built with the App Router, TypeScript, Next.js **16.4.6**, React **19.3.1**, and Tailwind CSS **4.3.5**. Versions were checked against npm’s stable `latest` tags on November 11, 2026 and pinned in `package.json` / `package-lock.json`.

## Run locally

Use a current Node.js LTS release (Next.js requires Node 20.9 or newer) and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. No credentials, database, or environment variables are required.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

`npm start` serves the production build. Stop a running server before starting another on the same port. Deploy as a standard Next.js application on a supported Node host or a Next.js hosting provider.

## Update content

- `data/portfolio.ts`: profile links, portrait path/alt text, project names/descriptions, technologies, learning areas, and verified certifications.
- `public/images/portrait-cutout.png`: the user-supplied portrait. Replace this file, or update the path and alt text in the profile data. The hero uses `next/image`, a responsive `sizes` value, and preload for its prominent image. The transparent image is cropped inside a centered frame; adjust `.portrait` object positioning if replacing it with a different crop.
- `app/globals.css`: palette, responsive layouts, interaction states, and keyframes.
- `app/portfolio.css`: the scoped visual and interaction system below the hero.
- `components/project-explorer.tsx`: category filters, keyboard-accessible project tabs, real storefront preview, and workflow diagrams.
- `components/learning-explorer.tsx`: learning disclosures and related repository links.
- `components/contact-actions.tsx`: contact links and clipboard success/error feedback.
- `app/layout.tsx`: page title and description.

The hero, project explorer, learning disclosures, and clipboard action are small client components. The page shell and factual content render on the server. Below-hero typography uses self-hosted Manrope with its license included in `public/fonts`; the hero keeps its original system font. No external font requests or build-time font downloads are required. Motion stops for `prefers-reduced-motion`; the hero pause control still stops both rows. The native mobile navigation works without JavaScript. See `DESIGN.md` for the below-hero design direction and asset sources.

Compatibility: TypeScript 6 is pinned because Next.js’s lint dependency does not yet support TypeScript 7. ESLint 9 matches the peer support of the bundled import/accessibility/React lint plugins. The run and build scripts explicitly select the supported Webpack bundler because Turbopack’s PostCSS worker failed to connect on this Windows/Node 25 machine. This does not change the Next.js or Tailwind versions or App Router conventions.

## Research and content limitations

Public GitHub profile and repository metadata/READMEs were reviewed on November 11, 2026 using the GitHub API. The featured projects link to their repositories. Titles follow the READMEs; the original repository identifiers are retained in the data file.

| Featured project               | Source                                                                  | Supported technologies / scope                                                   |
| ------------------------------ | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Yoshiya Storefront             | https://github.com/Yoshi-dev-mode/e-commerce-website-project#readme     | Next.js, TypeScript, Supabase, PostgreSQL; includes demo checkout                |
| Kabisera Ledger                | https://github.com/Yoshi-dev-mode/kabisera-ledger#readme                | Next.js, TypeScript, Tailwind CSS, Supabase; prototype with manual recordkeeping |
| MediVault                      | https://github.com/Yoshi-dev-mode/MediVault-Group-1#readme              | Flask, MySQL, Nginx, Ubuntu; group project, no individual contribution claims    |
| Network Incident Investigation | https://github.com/Yoshi-dev-mode/network-incident-investigation#readme | tcpdump and DNS/TCP/HTTP analysis; training scenarios with qualified findings    |

Profile source: https://github.com/Yoshi-dev-mode/Yoshi-dev-mode#readme. No claims of employment, seniority, education, years of experience, production adoption, or measurable outcomes were added. Learning areas are interests supplied by the user, not claimed expertise.

LinkedIn returned HTTP 999 and search did not expose verifiable certification details. The initial public-only attempt could not verify certification details. Authenticated browser access was subsequently provided by the user. All 42 profile-listed entries are now preserved in `data/certifications.json`, with exact titles, issuer labels, displayed dates, IDs, and linked credential destinations. `components/certification-explorer.tsx` supplies search, issuer filters, selected entries, and the full list. See `data/certifications-source.md` for provenance and limitations; this is profile verification, not an independent audit of every issuer page.

The attached Pink Rider prompt and image were treated only as visual references. Their standalone HTML instructions, identity, stock portrait URLs, pink styling, and hover-reveal effect were not applied. The user’s explicit Next.js, blue-and-white, personal-portfolio request governs this implementation. The supplied personal portrait is used instead of the earlier provisional image placeholder.

## Official setup references

- https://nextjs.org/docs/app/getting-started/installation
- https://tailwindcss.com/docs/installation/framework-guides/nextjs


