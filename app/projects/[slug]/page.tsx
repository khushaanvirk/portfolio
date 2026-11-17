import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { pageProjects, projectsBySlug } from "@/content/projects";
import type { Hero } from "@/content/projects/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return pageProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsBySlug[slug];
  if (!project?.page) return {};
  return {
    title: `${project.title} · Khushaan Virk`,
    description: project.page.blurb,
  };
}

const ASPECT: Record<Hero["aspect"], string> = {
  "9/16": "aspect-[9/16]",
  "3/4": "aspect-[3/4]",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "16/9": "aspect-video",
};

const frame = "overflow-hidden rounded-[10px] border border-border bg-surface";

const linkClass =
  "inline-flex min-h-11 items-center underline decoration-[#4A4A4D] underline-offset-4 transition-colors hover:text-white";

function HeroMedia({ hero, sizes }: { hero: Hero; sizes: string }) {
  if (hero.type === "video") {
    return (
      <video
        src={hero.src}
        poster={hero.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={hero.alt}
        className={cn("block w-full object-cover", frame, ASPECT[hero.aspect])}
      />
    );
  }
  return (
    <div className={cn("relative", frame, ASPECT[hero.aspect])}>
      <Image
        src={hero.src}
        alt={hero.alt}
        fill
        priority
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectsBySlug[slug];
  if (!project?.page) notFound();
  const { page } = project;

  const portrait = page.hero.aspect === "9/16" || page.hero.aspect === "3/4";
  const index = pageProjects.indexOf(project);
  const next = pageProjects[(index + 1) % pageProjects.length];

  const details = (
    <>
      <dl className="border-b border-border">
        {page.specs.map((spec) => (
          <div
            key={spec.label}
            className="grid grid-cols-[96px_minmax(0,1fr)] items-baseline gap-4 border-t border-border py-[11px]"
          >
            <dt className="text-secondary">{spec.label}</dt>
            <dd>{spec.value}</dd>
          </div>
        ))}
      </dl>
      {page.links.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-x-5">
          {page.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );

  return (
    <main className="mx-auto w-full max-w-[808px] px-6 pb-24 pt-14">
      <Link
        href="/"
        className="inline-flex min-h-11 items-center text-secondary transition-colors hover:text-white print:hidden"
      >
        Back to Khushaan Virk
      </Link>

      <header className="mt-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h1 className="text-[28px] font-medium leading-tight tracking-[-0.02em]">
          {project.title}
        </h1>
        <span className="font-mono text-[12.5px] text-muted">{page.dates}</span>
      </header>
      <p className="mt-3.5 max-w-[560px] text-body">{page.blurb}</p>

      {portrait ? (
        // A tall photo or video sits beside the specs, and above them on a phone.
        <div className="mt-10 flex flex-wrap items-start gap-x-12 gap-y-8">
          <div className="w-[280px] max-w-full shrink-0">
            <HeroMedia hero={page.hero} sizes="280px" />
          </div>
          <div className="min-w-0 flex-[999_1_320px]">{details}</div>
        </div>
      ) : (
        <>
          <div className="mt-10">
            <HeroMedia hero={page.hero} sizes="(max-width: 808px) 100vw, 760px" />
          </div>
          <div className="mt-10">{details}</div>
        </>
      )}

      {page.media.length > 0 && (
        <div className="mt-14 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          {page.media.map((item) => (
            <figure key={item.src}>
              <a
                href={item.src}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("relative block aspect-video", frame)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 372px"
                  className="object-cover"
                />
              </a>
              <figcaption className="mt-2 text-[13px] text-muted">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <nav
        aria-label="More projects"
        className="mt-14 flex flex-wrap justify-between gap-x-6 border-t border-border pt-1"
      >
        <Link
          href="/"
          className="inline-flex min-h-11 items-center text-secondary transition-colors hover:text-white"
        >
          All projects
        </Link>
        <Link
          href={`/projects/${next.slug}`}
          className="inline-flex min-h-11 items-center transition-colors hover:text-white"
        >
          Next: {next.title}
        </Link>
      </nav>
    </main>
  );
}
