import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared by every hairline-separated line on the site. */
export const rowClass =
  "grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-t border-border py-[11px]";

export const noteClass = "font-mono text-[12.5px] text-muted";

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

/** A name, a short description, and a note on the right such as a year. */
export function Row({
  name,
  detail,
  note,
}: {
  name: string;
  detail: string;
  note: string;
}) {
  return (
    <div className={rowClass}>
      <span>
        <span className="font-medium">{name}</span>
        <span className="ml-2.5 text-secondary">{detail}</span>
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
