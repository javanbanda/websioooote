# anchr

Christian clothing brand site. Originally built as a Vite + React single-page app. This branch is a full port to Next.js 16 App Router, optimized for Vercel.

The original `App.tsx` (1197 lines, client-only) has been split into focused section components that each own their own GSAP timeline.

## Stack

- Next.js 16.2
- React 19.2
- Tailwind CSS v4 (CSS-first, no tailwind.config.js)
- GSAP 3.14 + @gsap/react 2.1
- better-sqlite3 11.7 (product catalog)
- TypeScript 5.6
- Vercel (deployment target)

## Directory layout

```
src/
  app/
    layout.tsx        Root layout: next/font, ThemeProvider, inline theme-init script
    page.tsx          Home page: fetches products server-side, composes sections
    globals.css       Tailwind v4 + token-based theme system + ported custom CSS
    sitemap.ts        MetadataRoute.Sitemap
    robots.ts         MetadataRoute.Robots
  components/
    ThemeProvider.tsx Client context: reads localStorage, sets data-theme on <html>
    ThemeToggle.tsx   Client button: cycles light / dark / system
    Navigation.tsx    Fixed nav with mix-blend-mode: difference + ThemeToggle
    Hero.tsx          Full-viewport tile collage, GSAP entrance + pinned scroll exit
    Manifesto.tsx     Pinned scroll section with phrase tiles and image slices
    ProductSpotlight.tsx Pinned product/portrait tile grid
    Texture.tsx       Pinned macro/portrait tile grid
    ShadeRange.tsx    Scrolling product card grid, GSAP per-card reveal
    FinalStatement.tsx Pinned closing image/text tile grid
    Contact.tsx       Dark footer with links, form, social
    GrainOverlay.tsx  Fixed SVG noise overlay
  lib/
    config.ts         Single source of truth for all copy, image paths, and links
    db.ts             better-sqlite3 singleton (server-only, readonly)
    products.ts       getAllProducts / getProductBySlug (server-only)
scripts/
  seed-db.ts          Creates and seeds product.db from config data
public/
  images/             17 JPGs (hero, manifesto, product, texture, shades, closing)
product.db            SQLite product catalog (committed intentionally -- see below)
```

## Running locally

```bash
git clone <repo>
cd websioooote
npm install
npm run db:seed   # creates product.db -- only needed on first clone or after schema changes
npm run dev
```

Visit http://localhost:3000.

## Content

All visible copy and image references live in `src/lib/config.ts`. Edit that file to change headings, phrases, image paths, nav links, or contact details. No component files need to change.

Products live in `product.db`. The seed script (`scripts/seed-db.ts`) populates it from config data. After editing the seed script, run `npm run db:seed` and commit the updated `product.db`.

## Components

Each section is a separate client component that owns its GSAP context:

- GSAP `context()` is scoped to the section's `sectionRef`, so `querySelectorAll` calls do not bleed across sections.
- `useLayoutEffect` handles setup; the cleanup function calls `ctx.revert()`.
- Hero uses explicit `useRef` arrays for per-element targeting. All other sections use class-based selectors scoped to their ref.

The Contact section uses `var(--color-bg-inverted)` as its background to achieve the dark footer look on both themes without hardcoded colors.

## Theming

The site uses a token-based CSS custom property system defined in `globals.css`.

Default theme is light (off-white bg, dark text, blue accent). A dark theme is included that inverts the palette.

Available tokens:
- `--color-bg` background
- `--color-bg-inverted` inverted surface (used for dark footer tiles)
- `--color-fg` primary text
- `--color-fg-muted` secondary text
- `--color-accent` electric blue (lighter in dark mode for contrast)
- `--color-accent-fg` text on accent surfaces
- `--color-border` tile borders

To add a new theme:
1. Append a `[data-theme="name"] { ... }` block in `globals.css` with overrides.
2. Add `"name"` to the `NEXT_THEME` cycle in `ThemeToggle.tsx`.

No component changes are needed. All components read from CSS custom properties.

Theme persistence uses `localStorage` key `anchr-theme`. A tiny synchronous inline script in `<head>` sets `data-theme` before React hydrates, preventing a flash.

## Database

Schema (`product.db`):

```sql
CREATE TABLE products (
  id         INTEGER PRIMARY KEY,
  slug       TEXT UNIQUE NOT NULL,
  name       TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  category   TEXT NOT NULL,           -- 'hoodies' | 'tees'
  image_path TEXT NOT NULL,           -- e.g. /images/product_hoodie.jpg
  description TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
```

Seed: `npm run db:seed` (runs `scripts/seed-db.ts` via tsx).

The database is committed to the repo so Vercel has it available without a build-time seed step. It is opened `readonly: true`, which is safe on serverless read-only filesystems.

## Metadata and SEO

- Root metadata (title template, description, OG, Twitter) is in `layout.tsx`.
- Per-page metadata override is in `page.tsx`.
- `src/app/sitemap.ts` and `src/app/robots.ts` are auto-discovered by Next.js.
- Set `NEXT_PUBLIC_SITE_URL` in the Vercel project env to the production URL (e.g. `https://anchr.com`). The default fallback is `https://anchr.example.com`.

## Deployment (Vercel)

1. Push to main.
2. Vercel auto-detects Next.js 16.
3. Set environment variable `NEXT_PUBLIC_SITE_URL` to the production URL.
4. Deploy.

`better-sqlite3` is a native module. Vercel rebuilds it for the Lambda runtime during `npm install`. If the build fails on native compilation, add `"postinstall": "npm rebuild better-sqlite3"` to `package.json`, or swap to `@libsql/client` (pure JS, no native build).

`product.db` is committed and read at `process.cwd()/product.db` at runtime. Lambdas have a read-only filesystem, which works fine because the db is opened with `readonly: true`.

## Next.js 16 notes

- Middleware is still `middleware.ts` in Next.js 16 (the `proxy.ts` rename is a future change; not needed for this project).
- Turbopack is the default dev bundler in Next.js 16.
- React 19.2 features (async transitions, use(), improved Suspense) are available but not used here yet.

## Updating content

| What | Where |
|---|---|
| Nav links, logo | `src/lib/config.ts` navigationConfig |
| Hero image, title, CTA | `src/lib/config.ts` heroConfig |
| Manifesto phrases, image | `src/lib/config.ts` manifestoConfig |
| Product spotlight image, phrases | `src/lib/config.ts` productSpotlightConfig |
| Texture section images | `src/lib/config.ts` textureConfig |
| Shade range heading, CTA | `src/lib/config.ts` shadeRangeConfig |
| Final statement images, phrases | `src/lib/config.ts` finalStatementConfig |
| Contact links, form, social | `src/lib/config.ts` contactConfig |
| Images | Replace files in `public/images/`, update path in config |
| Products | Edit `scripts/seed-db.ts`, run `npm run db:seed`, commit `product.db` |
