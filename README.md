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

Content is stored in **Firestore** (collection `siteContent`, one document per
section) and edited at `/admin`. The TypeScript files in `src/content/` are the
**seed and the fallback**: they hold the original copy, are used whenever
Firestore is unreachable (a build without credentials, a network blip), and are
never written to by the admin.

| Firestore doc | What it controls | Seed file |
| --- | --- | --- |
| `main` | Name, role, tagline, summary, email, socials, stats, principles, nav, theme | `src/content/site.ts` |
| `projects` | Project list, categories, featured flags, links, metrics, case-study copy | `src/content/projects.ts` |
| `experience` | Work history and highlights | `src/content/experience.ts` |
| `education` | Degrees and certifications | `src/content/education.ts` |
| `skills` | Skill groups and the tech marquee | `src/content/skills.ts` |
| `reviews` | Client reviews and the rating summary | `src/content/testimonials.ts` |
| `recommendations` | LinkedIn-style recommendations and the home-page carousel | `src/content/recommendations.ts` |

Each document is shaped `{ data, updatedAt, updatedBy }`, so saving one section
never overwrites another. Reads go through a single cached function in
`src/lib/content/store.ts` (`'use cache'` + `cacheTag("site-content")`), and a
save calls `updateTag` so the next render sees the change immediately.

To edit the seed values instead, change the file — it still compiles and renders
exactly as before.

## Admin

`/admin` is a login-protected editor for everything above: site identity, theme
colours, contacts, socials, stats, navigation, experience, projects, reviews,
recommendations, education and skills.

- **Sign-in** uses Firebase Auth (email + password). The account must be in the
  `ADMIN_EMAILS` allow-list; any other account in the shared Firebase project is
  rejected.
- The Firebase ID token is exchanged server-side for an httpOnly session cookie
  (`/api/auth/session`), so no token is ever kept in `localStorage`.
- All writes go through Server Actions that re-validate the payload
  (`src/lib/content/schema.ts`) and then write with the Admin SDK. Client-side
  Firestore access is not used, so security rules stay deny-by-default.
- Each section saves independently, and the header tells you whether the browser
  holds unsaved edits.

The admin UI uses shadcn/ui components kept in `src/components/admin/ui/` so they
can't collide with the site's own primitives in `src/components/ui/`. Its
semantic tokens are scoped to `.admin-shell` in `globals.css`.

## Hero portrait

The hero image is a **URL, not an upload**. It is stored on the `main` document
as `site.portrait` and edited at `/admin/site` → **Profile** → **Hero portrait**:

- Paste an absolute `https://` URL for an image hosted anywhere (a CDN, object
  storage, your GitHub avatar). The field previews it before you save.
- Leave the field empty to fall back to the bundled `public/images/portrait.jpg`.
- A path starting with `/` works too, if you would rather commit the image to
  the repository.

The schema only accepts an `http(s)` URL or a root-relative path, so a
`javascript:` value or a protocol-relative `//host/x.jpg` is rejected at save
time. Remote portraits render as-is (`unoptimized`), which keeps the site from
needing a `remotePatterns` rule that would allow every host through the image
optimiser. The hero crops to 4:5 and greyscales it, and a save calls
`updateTag`, so the next request already shows the new image.

## Recommendations

`/admin/recommendations` edits the LinkedIn-style recommendations that sit
between the reviews and the about section. They are a **separate document** from
reviews: a review is a marketplace verdict with a rating, a recommendation is
the paragraph a manager, teammate or client wrote about working together.

The home page renders them as an auto-rotating carousel
(`src/components/recommendations/recommendation-carousel.tsx`), not a grid:

- It advances every 7 seconds, pauses on hover and on keyboard focus, and has an
  explicit pause button — hovering is not a control a keyboard user can reach.
- With `prefers-reduced-motion: reduce` it never auto-advances and the slide
  transition is removed, but the prev/next buttons and dots still work.
- All slides are stacked in one CSS grid cell, so the card keeps the height of
  the longest recommendation and nothing jumps when it changes.
- Name and quote are required; title, company, relationship, date, avatar and a
  profile URL are optional. Without an avatar the card shows their initials.
- Removing every recommendation hides the whole section.

## Routes

| Route | Description |
| --- | --- |
| `/` | Home: hero, stats, selected work, experience, client reviews, about |
| `/projects` | Full project archive with category filtering |
| `/projects/[slug]` | Project case study, prerendered per project |
| `/contact` | Contact details and a `mailto:`-based message form |
| `/cv` | Print-friendly CV — use **Print / Save as PDF** in the browser |
| `/admin` | Content admin (redirects to `/admin/login` when signed out) |

The CV page intentionally publishes only the email and social profiles, not the phone number or references from the source PDF.

## Project cover art

Covers in `public/projects/*.svg` are generated placeholders. To regenerate or edit them:

```bash
node scripts/generate-covers.mjs
```

Each cover is a 1200×800 SVG. Replace a file with a real screenshot (any aspect ratio) and update the project's `cover` path in `/admin/projects` (or the seed file) if the filename changes.

## Design tokens

Typography and the fallback palette live in `src/app/globals.css`:

- Background `#0f0e1a`, surfaces `#141420` / `#1a1a2a`
- Accent `#00ff99`
- Sora (sans) and JetBrains Mono, loaded through `next/font`

The colours themselves are editable at `/admin/site` → **Theme** and are injected
as a `:root { … }` rule in the root layout, so changing the accent re-tints the
whole site. Only the base colours are stored — the accent tint and the readable
text colour on top of it are derived in `src/lib/theme.ts`.

The admin's shadcn tokens are a separate block scoped to `:root:has(.admin-shell)`,
which is why shadcn's `--accent` (a hover surface) never leaks into the public
site, and why the real brand colour is also emitted as `--brand-accent`.

Reusable UI primitives live in `src/components/ui/` (button, badge, section, reveal, marquee, spotlight card, social links, copy email).

## Environment

Copy `.env.example` to `.env.local` and fill it in. `.env.local` is gitignored.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production origin for canonical URLs, OG, sitemap, robots |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Client SDK config (publishable) |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Client SDK config |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Client SDK config |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Client SDK config |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Client SDK config |
| `FIREBASE_SERVICE_ACCOUNT_PATH` | Absolute path to the service-account JSON (local dev) |
| `FIREBASE_SERVICE_ACCOUNT` | The same JSON as one line, for hosts that only take env vars |
| `ADMIN_EMAILS` | Comma-separated allow-list for `/admin` |

Without the Admin credentials the site still builds and renders — it falls back
to the seed content in `src/content/` — but `/admin` cannot sign anyone in.

## Deploy

Production is **Vercel**: project `muhit-dev` (team `musarrats-projects`) serving
<https://muhit.dev>. The app has server routes (`/admin`, `/api/auth/session`,
`sitemap.xml`), so it needs a Node host — not a static file host.

Deploys are handled by **GitHub Actions**, not by Vercel's Git integration:

```
.github/workflows/deploy.yml
  push to main  →  npm ci  →  vercel pull  →  vercel build --prod  →  vercel deploy --prebuilt --prod
```

- The workflow builds on GitHub and ships the prebuilt output, so a broken build
  fails the run before anything reaches production.
- `vercel pull` downloads the project's production environment variables, so the
  build uses the same Firebase config as the live site — none of the `NEXT_PUBLIC_*`
  values need duplicating as GitHub secrets.
- Runs are serialised (`concurrency`), and a newer push cancels an in-flight one.
- `workflow_dispatch` lets you redeploy from the Actions tab without a commit.

### One-time setup

1. Create a token at <https://vercel.com/account/tokens>.
2. Add three repository secrets (Settings → Secrets and variables → Actions):

   | Secret | Value |
   | --- | --- |
   | `VERCEL_TOKEN` | the token from step 1 |
   | `VERCEL_ORG_ID` | `team_iX7XzkCJGaFTPGOUeVEqNhbV` |
   | `VERCEL_PROJECT_ID` | `prj_wIZIiOSQb4xy1x6OvSXNVDrTVrgc` |

   Both IDs are in `.vercel/project.json` after `vercel link`; they are not secret,
   but the CLI reads them from the environment in CI.

Keep Vercel's own GitHub integration **off** for this project — the project has no
Git repository connected today, and connecting it would deploy every push twice.

Two notes for a fresh project:

- Add the production domain to **Firebase Auth → Settings → Authorized domains**, or
  sign-in fails with `auth/unauthorized-domain`.
- Set `FIREBASE_SERVICE_ACCOUNT` (inline JSON) rather than the path variable.

