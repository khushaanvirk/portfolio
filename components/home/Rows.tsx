import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared by every hairline-separated line on the site. */
export const rowClass =
  "grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-t border-border py-[11px]";

export const noteClass = "font-mono text-[12.5px] text-muted";

/** The "|" between a row's description and its skills. */
export const pipeClass = "mx-2 text-dim";

export function joinSkills(skills: readonly string[]) {
  return skills.join(" · ");
}

/** A titled block on the homepage: Work, Projects, Off the clock. */
export function Section({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mt-[52px]", className)}>
      <h2 className="mb-2 text-[13px] text-muted">{title}</h2>
      {children}
    </section>
  );
}

/**
 * One line: a name, a short description, then "| skills" when there are any,
 * and a note on the right such as a year.
 */
export function Row({
  name,
  detail,
  note,
  skills = [],
}: {
  name: string;
  detail: string;
  note: string;
  skills?: readonly string[];
}) {
  return (
    <div className={rowClass}>
      <span>
        <span className="font-medium">{name}</span>
        <span className="ml-2.5 text-secondary">{detail}</span>
        {skills.length > 0 && (
          <>
            <span aria-hidden className={pipeClass}>
              |
            </span>
            <span className="text-muted">{joinSkills(skills)}</span>
          </>
        )}
      </span>
      <span className={noteClass}>{note}</span>
    </div>
  );
}

/** A line with a fixed-width grey label on the left. */
export function LabelRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[96px_minmax(0,1fr)] items-baseline gap-4 border-t border-border py-[11px]">
      <span className="text-secondary">{label}</span>
      <span>{children}</span>
    </div>
  );
}
