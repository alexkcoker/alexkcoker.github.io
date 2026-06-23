# Alex Coker — Portfolio

A faithful recreation of [alexcoker505.github.io](https://alexcoker505.github.io/),
rebuilt on a modern stack while preserving the original's visual design, content,
layout, responsiveness, and interactive behavior.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · static export for GitHub Pages.

---

## Overview

The original is a single-page, dark-themed personal portfolio for a physics student
and robotics-focused engineer. It presents a hero, then five sections — **Projects,
Research, Awards & Accomplishments, Outreach, Philosophy** — using a reusable card
component with hover lift, scroll-reveal animations, embedded videos, and an image
slideshow.

This recreation reproduces all of that with reusable, typed React components and the
original design tokens ported into the Tailwind theme.

## Project structure

```
.
├── public/
│   ├── .nojekyll                 # disables Jekyll so /_next assets are served
│   └── assets/images/            # portfolio images (originals)
├── src/
│   ├── app/
│   │   ├── globals.css           # base styles + reveal/link animations (ported 1:1)
│   │   ├── layout.tsx            # <html>, Inter font, SEO metadata
│   │   └── page.tsx              # page composition (hero + sections + philosophy)
│   ├── components/
│   │   ├── Card.tsx              # .card / .card-reverse layout + hover
│   │   ├── CardMediaView.tsx     # picks video / image / slideshow media
│   │   ├── Reveal.tsx            # IntersectionObserver scroll-reveal (client)
│   │   ├── Section.tsx           # titled section of stacked cards
│   │   └── Slideshow.tsx         # prev/next image carousel (client)
│   ├── data/
│   │   └── content.ts            # all page content as typed data (single source)
│   └── lib/
│       └── asset.ts              # basePath-aware asset URL helper
├── next.config.mjs               # static export + GitHub Pages basePath
├── tailwind.config.ts            # design tokens (colors, radii, timings, breakpoint)
└── .github/workflows/deploy.yml  # CI build + deploy to GitHub Pages
```

## Design system (ported from the original)

| Token            | Value      |
| ---------------- | ---------- |
| Background       | `#0F1115`  |
| Surface (cards)  | `#151922`  |
| Border           | `#23283A`  |
| Text primary     | `#EDEFF3`  |
| Text secondary   | `#A6ADBB`  |
| Accent           | `#6EA8FF`  |
| Font             | Inter (400/500/600/700) |
| Radius           | 12px / 8px |
| Mobile breakpoint| ≤ 700px    |

Interactions reproduced: card hover lift + border highlight + image zoom, animated
link underline, scroll-reveal fade/rise (threshold 0.15, fires once), and the
prev/next image slideshow with wrap-around.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build (static export)

```bash
npm run build    # outputs a fully static site to ./out
npx serve out    # preview the production build locally
```

## Deployment — GitHub Pages

This repo ships a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds
the static export and publishes it to Pages on every push to `main`.

1. Create a new GitHub repository and push this project to its `main` branch.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually). The site deploys automatically.

**Base path is handled automatically:**

- For a **user/org page** repo named `your-username.github.io`, the site is served
  from the domain root — base path is empty.
- For a **project page** repo (e.g. `portfolio`), the site is served from
  `/<repo>` — the workflow sets `BASE_PATH=/<repo>` at build time so all asset URLs
  resolve.

To build for a project path locally:

```bash
BASE_PATH=/portfolio npm run build
```

## Assumptions & known limitations

These reflect the state of the **live source site** and are reproduced faithfully:

- **Placeholder project videos.** The three Projects cards embed YouTube iframes whose
  `src` is `https://www.youtube.com/embed/YOUR_VIDEO_ID` — a placeholder in the
  original. Replace the IDs in [`src/data/content.ts`](src/data/content.ts) with real
  video IDs when available.
- **Missing slideshow & outreach images.** On the live site, the Research slideshow
  images (`sandia1–3.png`, `unm1–3.png`) and `carnival_chemistry.png` return **404** —
  they are broken there too. The markup and slideshow controls are reproduced exactly;
  drop the real files into `public/assets/images/` to fill them in.
- **Available images** (`greengro.jpg`, `hack.jpg`, `design2_punks.jpg`,
  `gearmasters.webp`) were downloaded from the live site and included as-is.
- **No navigation / extra routes.** The original is a single page with no nav menu,
  no `robots.txt`, `sitemap.xml`, or `404.html`. The original `<head>` had no meta
  description; this recreation adds sensible SEO metadata (title, description, Open
  Graph, Twitter) derived from the hero copy as an enhancement.
- **Text-only card quirk preserved.** The "Wrestling Accomplishments" card has no media,
  so it occupies only the narrow media column in the original grid — reproduced as-is.

## Credit

Recreation of the publicly visible design and content of
[alexcoker505.github.io](https://alexcoker505.github.io/). All portfolio content and
images belong to their original author.
