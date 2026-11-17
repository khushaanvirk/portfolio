"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import {
  joinSkills,
  noteClass,
  rowClass,
  skillsClass,
} from "@/components/home/Rows";
import type { Project } from "@/content/projects/types";

// The preview sits to the right of the 560px column, so it only fits on a
// wide window. Below this it is not rendered at all, which also keeps phones
// from downloading the keyboard video.
const WIDE = "(min-width: 1100px)";

function subscribeWide(onChange: () => void) {
  const query = window.matchMedia(WIDE);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useIsWide() {
  return useSyncExternalStore(
    subscribeWide,
    () => window.matchMedia(WIDE).matches,
    () => false
  );
}

export default function ProjectList({ projects }: { projects: Project[] }) {
  // `hover` is the row under the pointer right now; the other rows dim.
  // `shown` is the preview on display, which stays after the pointer leaves.
  const [hover, setHover] = useState<string | null>(null);
  const [shown, setShown] = useState(projects[0].slug);
  const wide = useIsWide();
  const current = projects.find((p) => p.slug === shown) ?? projects[0];

  return (
    <section className="relative mt-[52px]">
      <h2 className="mb-2 text-[13px] text-muted">Projects</h2>

      <div
        onMouseLeave={() => setHover(null)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setHover(null);
        }}
      >
        {projects.map((project) => {
          const on = hover === project.slug;
          const dim = hover !== null && !on;
          const select = () => {
            setHover(project.slug);
            setShown(project.slug);
          };
          const row = (
            <>
              <span>
                <span
                  className={cn(
                    "font-medium transition-colors duration-200",
                    on ? "text-white" : dim ? "text-muted" : "text-primary"
                  )}
                >
                  {project.title}
                </span>
                {project.externalUrl && (
                  <span aria-hidden className="ml-1 text-muted">
                    ↗
                  </span>
                )}
                <span
                  className={cn(
                    "ml-2.5 transition-colors duration-200",
                    on ? "text-body" : dim ? "text-dim" : "text-secondary"
                  )}
                >
                  {project.line}
                </span>
                <span
                  className={cn(
                    skillsClass,
                    "transition-colors duration-200",
                    on ? "text-secondary" : dim ? "text-dim" : "text-muted"
                  )}
                >
                  {joinSkills(project.skills)}
                </span>
              </span>
              <span
                className={cn(
                  noteClass,
                  "transition-colors duration-200",
                  on ? "text-body" : dim && "text-dim"
                )}
              >
                {project.year}
              </span>
            </>
          );

          return project.externalUrl ? (
            <a
              key={project.slug}
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={rowClass}
              onMouseEnter={select}
              onFocus={select}
            >
              {row}
            </a>
          ) : (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={rowClass}
              onMouseEnter={select}
              onFocus={select}
            >
              {row}
            </Link>
          );
        })}
      </div>

      {wide && (
        <aside
          aria-hidden
          className="absolute left-[calc(100%+72px)] top-[29px] w-[380px]"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-border bg-surface">
            {projects.map((project) => {
              const { preview } = project;
              const layer = cn(
                "absolute inset-0 h-full w-full transition-opacity duration-300",
                project.slug === shown ? "opacity-100" : "opacity-0",
                preview.type === "drawing" ? "object-contain" : "object-cover",
                preview.position
              );
              return preview.type === "video" ? (
                <video
                  key={project.slug}
                  src={preview.src}
                  poster={preview.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className={layer}
                />
              ) : (
                <Image
                  key={project.slug}
                  src={preview.src}
                  alt=""
                  fill
                  sizes="380px"
                  unoptimized={preview.type === "drawing"}
                  className={layer}
                />
              );
            })}
          </div>
          <div className="mt-3 flex justify-between gap-4 text-[13px]">
            <span>{current.title}</span>
            <span className={noteClass}>{current.year}</span>
          </div>
        </aside>
      )}
    </section>
  );
}
