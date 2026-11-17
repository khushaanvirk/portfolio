# Khushaan Virk — Personal Portfolio Site

Portfolio at **khushaanvirk.com**. One quiet page: name, links, work, a list of
projects, and what he does off the clock. Most projects also have a short page
of their own. Deployed on Vercel from `main` — a push to `main` is a deploy.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS v4** — configured in `app/globals.css` via `@theme inline`,
  not a `tailwind.config.js`
- Fonts: `Inter` and `JetBrains_Mono` via `next/font/google`
- npm. No test runner is set up.

```bash
npm run dev     # localhost:3000
npm run build   # also runs tsc; must pass before pushing
npm run lint
```

## Design

Minimal on purpose. White text on near-black, **no accent colour**, no
animation beyond colour and opacity fades. Text is short everywhere: a project
gets one line on the homepage and one or two sentences on its page. Don't add
long write-ups, tag pills, cards, or decorative effects.

Colours are `@theme` tokens in `app/globals.css`. Use the token classes
(`text-secondary`, `border-border`, `bg-surface`), not raw hex.

| Token | Value | Used for |
|---|---|---|
| background | `#0B0B0C` | page |
| surface | `#121214` | image and video frames |
| border | `#1C1C1E` | every hairline |
| primary | `#EDEDED` | names, titles, values |
| body | `#C9C9C9` | the sentence on a project page |
| secondary | `#9A9A9A` | descriptions, row labels |
| muted | `#8C8C8C` | section titles, years, captions |
| dim | `#7C7C80` | rows faded while another is hovered |

Recurring patterns:

- **Rows.** Everything is a hairline-separated row (`rowClass` in
  `components/home/Rows.tsx`): name and description on the left, a mono note
  such as a year on the right.
- **Type.** 15px Inter for everything; 13px for section titles and captions;
  12.5px JetBrains Mono for years and dates. The only large text is a project
  page's 28px title.
- **Width.** Text sits in a 560px column. On windows 1100px and wider the
  project preview (380px) sits to its right.
- **Print.** `globals.css` turns any page black-on-white for "Save as PDF".

## Content

Words and data live in `content/`, layout lives in `app/` and `components/`.

```
content/
  site.ts            name, headline, links, work, books, hobbies,
                     chess username, Duolingo streak
  projects/
    types.ts         Project, ProjectPage, Preview, Hero, ...
    index.ts         projects (homepage order) · pageProjects · projectsBySlug
    <slug>.ts        one export per project
```

### Projects

A `Project` has a `title`, `year`, the homepage `line`, its `skills`, and a
`preview` (what shows beside the list while its row is hovered). Then one of:

- `page` — it gets `/projects/<slug>`: a sentence or two, one hero photo or
  video, at most six spec rows, a small image grid, links.
- `externalUrl` — the row opens that site in a new tab and there is no page
  (uQueue).

To add one: write `content/projects/<slug>.ts`, add it to the `projects` array
in `index.ts`, and put images in `public/projects/`. `npm run build` generates
the page, so a broken entry fails the build.

**Never invent a spec, number, or result.** Every figure on the site is a real
measurement.

### Skills

Each project, and each job in `site.ts`, lists three to five skills that show
on a second line under its row. Use the words a job posting would use (PCB
design, Embedded C, Python, SQL), and only skills the work really used. No
part numbers, features, or filler.

### Previews

- A good photo or video: `type: "image"` or `"video"`.
- A weak photo (breadboards, mostly): draw a white line SVG instead and use
  `type: "drawing"`. They live in `public/projects/drawings/`, share a
  400 × 300 viewBox, and use only `#EDEDED`, `#8C8C8C` and `#4A4A50` strokes.
  Draw something true about the project (its waveform, its readout), with real
  numbers if it carries any.

### Live numbers

`lib/live.ts`. The chess rating is fetched from chess.com's public API, at
most once an hour, and falls back to a plain link if the fetch fails. Duolingo
has no public API, so the streak counts up one a day from the date and count
in `content/site.ts`; reset those if the streak breaks.

## Images

`public/projects/`, referenced by absolute path (`/projects/foo.png`).

- The image grid on a project page crops to **16:9** with `object-cover`. Pad
  diagrams, plots, and screenshots to 16:9 before committing them, otherwise
  the crop eats axis labels and titles.
- A hero declares its shape in `aspect`; pick the one closest to the file.
- Homepage previews crop to **4:3**. Use `preview.position` (a Tailwind
  `object-*` class) when the subject is off-centre.
- A video must supply a `poster`.

If a figure looks cropped in dev after you replace a file, clear Next's image
cache — `rm -rf .next/cache/images`. It keys on URL, not file contents.

## Code conventions

- Server components by default. `"use client"` only for state or browser APIs
  (`ProjectList`, `LocalTime`).
- Tailwind utilities only — no inline `style`, no CSS modules. Merge conditional
  classes with `cn()` from `lib/utils.ts`.
- Keep it lean — no new dependency without a real reason.

## Routes

| Route | Notes |
|---|---|
| `/` | re-rendered at most hourly, for the chess rating and streak |
| `/projects/[slug]` | SSG from `generateStaticParams`, projects with a `page` |
| `/resume` | embeds `public/resume.pdf`; swapping the PDF needs no code change |
| `/opengraph-image`, `/icon.svg` | generated social preview and favicon |

## Notes

- Mobile-first; verify 375 / 768 / 1440 on layout changes.
- `.env*` is gitignored. Never commit secrets.
