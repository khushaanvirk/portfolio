# Khushaan Virk — Personal Portfolio Site

Project-first portfolio at **khushaanvirk.com**. The homepage is a hero, a
projects section, and a contact form; every project also has its own detail
page. Deployed on Vercel from `main` — a push to `main` is a deploy.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS v4** — configured in `app/globals.css` via `@theme inline`,
  not a `tailwind.config.js`
- **framer-motion** for scroll-reveal and tilt, **react-hook-form** +
  **resend** for the contact form
- Fonts: `Geist` and `Geist_Mono` via `next/font/google`
- npm. No test runner is set up.

```bash
npm run dev     # localhost:3000
npm run build   # also runs tsc; must pass before pushing
npm run lint
```

## Design system

Dark-first, high-contrast, editorial. Colours live as `@theme` tokens in
`app/globals.css`, but components mostly write the hex directly — match the
surrounding file rather than mixing the two conventions.

| Token | Value | Used for |
|---|---|---|
| background | `#0A0A0A` | page background |
| surface | `#141414` | cards, code blocks, figures |
| border | `#1F1F1F` | every hairline border |
| primary | `#F5F5F5` | headings, body emphasis |
| secondary | `#737373` | captions, meta lines, eyebrows |
| accent | `#3B82F6` | status pills, focus rings |

Recurring patterns worth preserving:

- **Mono eyebrows.** Small labels are
  `font-mono text-[10px] uppercase tracking-widest` — section kickers, meta
  lines, figure captions, tag pills.
- **Body copy** is `#D4D4D4` on detail pages, `#A3A3A3` on cards.
- **Rounded-3xl cards** with a `#1F1F1F` border on `#141414`.
- **Motion is subtle**: fade + small y-offset on scroll into view, `once: true`.
  No looping or attention-seeking animation.
- Print styles exist (`print:` variants) so detail pages export cleanly to PDF.
  Don't drop them when editing a detail-page component.

## Content model

Projects are **data, not JSX**. Each one is a `ProjectContent` object in
`content/projects/<slug>.ts`, typed by `content/projects/types.ts`, and
registered in `content/projects/index.ts`. Both the homepage cards and
`/projects/[slug]` render from the same object, so adding a project means
adding one file and one entry — never a new page component.

```
content/projects/
  types.ts       ProjectContent, ProjectSection, MediaItem, SpecRow, ...
  index.ts       projectsBySlug · projectOrder · allProjects
                 featuredProject · gridProjects
  <slug>.ts      one export per project
```

### Adding a project

1. Write `content/projects/<slug>.ts` exporting a `ProjectContent`.
2. Import it in `index.ts`, add it to `projectsBySlug` **and** `projectOrder`.
3. Drop images in `public/projects/` (see the image rules below).
4. `npm run build` — `/projects/<slug>` is generated from
   `generateStaticParams`, so a broken entry fails the build, not runtime.

### Featured vs grid

`projectOrder` is a **curated** order, not chronological. Which project gets
the large card is a separate, explicit decision: set `featured: true` on
exactly one project. `featuredProject` resolves from that flag and
`gridProjects` is everything else, so reordering the list never silently
changes what's highlighted. The large card renders a "Featured project"
eyebrow so its size reads as intentional rather than as "newest".

### Placeholders

A string starting with `[TODO ...]` is a placeholder — `lib/placeholder.ts`
detects it and the UI degrades gracefully (a "media pending" panel instead of
a broken image, italic grey text instead of a fake claim). Use this for
content that genuinely isn't ready yet; **never invent a spec, number, or
result to fill a gap.** Every figure on the site is a real measurement.

## Images

`public/projects/`, referenced by absolute path (`/projects/foo.png`).

**The gallery and cards crop with `object-cover`, so aspect ratio matters:**

- `MediaGallery` figures render in a **16:9** box. Pad diagrams, plots, and
  screenshots to 16:9 before committing them, otherwise the crop eats axis
  labels and titles. Trim the dead border first, then pad — don't just letterbox
  a small image inside a big canvas.
- `ProjectHero` uses `object-contain` in 16:9, so it never crops.
- Project card previews crop to roughly 1.47:1 (featured) and 16:10 (grid), so
  a 16:9 source needs a little side margin to survive both.
- Video heroes must supply a `poster`; cards render the poster so a grid never
  autoplays several videos at once.

If a figure looks cropped in dev after you replace a file, clear Next's image
cache — `rm -rf .next/cache/images`. It keys on URL, not file contents.

## Code conventions

- Server components by default. `"use client"` only for state, effects, or
  handlers (`ProjectCard`, `MediaGallery`, `SectionHeader`, `Hero`).
- Tailwind utilities only — no inline `style`, no CSS modules. Merge conditional
  classes with `cn()` from `lib/utils.ts`.
- Components stay small and single-purpose: `components/sections/` for homepage
  bands, `components/project/` for detail-page blocks, `components/ui/` for
  shared primitives.
- Prefer extending `ProjectContent` over adding per-project special cases in
  components.

## Routes

| Route | Notes |
|---|---|
| `/` | Hero · Projects · Contact · Footer |
| `/projects/[slug]` | SSG from `generateStaticParams` |
| `/resume` | embeds `public/resume.pdf`; filename-agnostic, so swapping the PDF needs no code change |
| `/api/contact` | Resend, needs `RESEND_API_KEY` |
| `/opengraph-image`, `/icon.svg` | generated social preview and favicon |

## Notes

- Mobile-first; verify 375 / 768 / 1440 on layout changes.
- Keep it lean — no new dependency without a real reason.
- `.env.local` holds `RESEND_API_KEY` and is gitignored. Never commit secrets.
