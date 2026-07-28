# khushaanvirk.com

Personal portfolio site — [khushaanvirk.com](https://khushaanvirk.com)

Project-first: a hero, a projects section, and a contact form, with a full detail page behind every project. Built for hardware and embedded work, where the interesting artifacts are schematics, oscilloscope traces, and drift plots rather than screenshots.

**Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · framer-motion**

## The idea

Projects are **data, not JSX**. Each one is a single typed object:

```ts
export const pedestrianDeadReckoning: ProjectContent = {
  slug: "pedestrian-dead-reckoning",
  title: "Pedestrian Dead Reckoning (Phone IMU)",
  tags: ["Python", "NumPy", "SciPy", "Signal processing"],
  specs: [{ label: "Run A result", value: "150 steps · drift 5.14 m (6.7 %)" }],
  sections: [{ heading: "Step detection", body: [...], code: {...}, media: [...] }],
  // ...
};
```

The homepage cards and `/projects/[slug]` render from the same object, so adding a project is one content file plus one registry entry — never a new page component. Detail pages are statically generated via `generateStaticParams`, which means a malformed project fails the build instead of breaking at runtime.

Two details worth calling out:

- **Featured is a flag, not a position.** `featured: true` on exactly one project drives the large card. Reordering the list can't silently change what's highlighted.
- **Placeholders are first-class.** A content string starting with `[TODO ...]` is detected by `lib/placeholder.ts` and the UI degrades gracefully — a "media pending" panel instead of a broken image. Unfinished work stays visibly unfinished rather than getting filled in with a plausible-sounding invention.

## Layout

```
app/
  page.tsx              Hero · Projects · Contact · Footer
  projects/[slug]/      SSG detail pages
  resume/               embedded PDF viewer
  api/contact/          Resend
components/
  sections/             homepage bands
  project/              detail-page blocks (hero, specs, gallery, code, diagram)
  ui/                   ProjectCard, StatusBadge, TiltCard, shader background
content/projects/       one typed object per project + registry
```

`CLAUDE.md` documents the design tokens, content model, and image aspect-ratio rules.

## Running it

```bash
npm install
npm run dev      # localhost:3000
npm run build    # also type-checks
```

The contact form needs `RESEND_API_KEY` in `.env.local`; everything else runs without configuration.

## Notes

Dark-first, high-contrast, no UI framework — Tailwind utilities and a small set of hand-built primitives. Deployed on Vercel.
