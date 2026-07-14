import Link from "next/link";
import StatusBadge from "@/components/ui/StatusBadge";
import type { ProjectContent } from "@/content/projects/types";

interface Props {
  project: ProjectContent;
}

export default function ProjectHeader({ project }: Props) {
  const meta = [project.dates, project.role, project.status]
    .filter(Boolean)
    .join(" · ");

  return (
    <header className="sticky top-0 z-30 border-b border-[#1F1F1F] bg-[#0A0A0A]/90 backdrop-blur-sm print:static print:bg-white print:border-black/20">
      <div className="max-w-5xl mx-auto px-6 py-4">
        <Link
          href="/#projects"
          className="text-[#737373] text-xs font-mono uppercase tracking-widest hover:text-[#F5F5F5] transition-colors print:hidden"
        >
          ← All projects
        </Link>
        <div className="mt-2 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-[#F5F5F5] text-2xl md:text-3xl font-semibold tracking-tight print:text-black">
                {project.title}
              </h1>
              {project.badge && (
                <StatusBadge label={project.badge} className="print:hidden" />
              )}
            </div>
            {meta && (
              <p className="text-[#737373] text-xs font-mono mt-1 print:text-black/60">
                {meta}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-widest text-[#737373] bg-[#141414] border border-[#1F1F1F] px-2 py-1 rounded print:bg-white print:text-black/70 print:border-black/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
