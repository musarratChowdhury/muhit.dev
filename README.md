# muhit.dev

Personal portfolio for **Md. Musarrat Hossain Chowdhury** — software engineer working with .NET, React, and the cloud.

Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS v4, and Motion.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # eslint
```

## Where the content lives

All copy and data are centralized in `src/content/`. You should not need to touch components to update the site.

| File | What it controls |
| --- | --- |
| `src/content/site.ts` | Name, role, tagline, summary, email, socials, stats, principles, nav |
| `src/content/projects.ts` | Project list, categories, featured flags, links, metrics, case-study copy |
| `src/content/experience.ts` | Work history and highlights |
| `src/content/education.ts` | Degrees and certifications |
| `src/content/skills.ts` | Skill groups and the tech marquee |
| `src/types/content.ts` | Shared TypeScript types for the content layer |

To add a project, append an entry to `src/content/projects.ts`. The `/projects` grid, the home page (when `featured: true`), the detail route at `/projects/[slug]`, and the sitemap all pick it up automatically.

## Routes

| Route | Description |
| --- | --- |
| `/` | Home: hero, stats, selected work, experience, about |
| `/projects` | Full project archive with category filtering |
| `/projects/[slug]` | Project case study, statically generated from `projects.ts` |
| `/contact` | Contact details and a `mailto:`-based message form |
| `/cv` | Print-friendly CV — use **Print / Save as PDF** in the browser |

The CV page intentionally publishes only the email and social profiles, not the phone number or references from the source PDF.

## Project cover art

Covers in `public/projects/*.svg` are generated placeholders. To regenerate or edit them:

```bash
node scripts/generate-covers.mjs
```

Each cover is a 1200×800 SVG. Replace a file with a real screenshot (any aspect ratio) and update the `cover` path in `src/content/projects.ts` if the filename changes.

## Design tokens

The palette and typography are defined in `src/app/globals.css`:

- Background `#0f0e1a`, surfaces `#141420` / `#1a1a2a`
- Accent `#00ff99`
- Sora (sans) and JetBrains Mono, loaded through `next/font`

Reusable UI primitives live in `src/components/ui/` (button, badge, section, reveal, marquee, spotlight card, social links, copy email).

## Environment

Set `NEXT_PUBLIC_SITE_URL` to the production origin so canonical URLs, Open Graph, the sitemap, and `robots.txt` point at the right domain:

```bash
NEXT_PUBLIC_SITE_URL=https://muhit.dev
```

It defaults to `https://muhit.dev`.

## Deploy

The site builds as static/partially prerendered pages and deploys to any Next.js-compatible host. On Vercel, import the repository and set `NEXT_PUBLIC_SITE_URL` in the project environment variables.
