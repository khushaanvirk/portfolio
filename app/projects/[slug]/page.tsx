import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectHeader from "@/components/project/ProjectHeader";
import ProjectHero from "@/components/project/ProjectHero";
import SpecTable from "@/components/project/SpecTable";
import SystemDiagram from "@/components/project/SystemDiagram";
import CodeBlock from "@/components/project/CodeBlock";
import MediaGallery from "@/components/project/MediaGallery";
import Resources from "@/components/project/Resources";
import { allProjects, projectsBySlug } from "@/content/projects";
import { isPlaceholder } from "@/lib/placeholder";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsBySlug[slug];
  if (!project) return {};
  return {
    title: `${project.title} · Khushaan Virk`,
    description: project.oneLineSummary,
  };
}

function Paragraph({ text }: { text: string }) {
  if (isPlaceholder(text)) {
    return (
      <p className="text-[#737373] italic leading-relaxed print:text-black/50">
        {text}
      </p>
    );
  }
  return (
    <p className="text-[#D4D4D4] leading-relaxed print:text-black">{text}</p>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectsBySlug[slug];
  if (!project) notFound();

  return (
    <article className="bg-[#0A0A0A] min-h-screen print:bg-white">
      <ProjectHeader project={project} />

      <main className="max-w-3xl mx-auto px-6 py-10 md:py-14">
        <ProjectHero hero={project.hero} />

        <section className="space-y-4 mb-10">
          {project.summary.map((p, i) => (
            <Paragraph key={i} text={p} />
          ))}
        </section>

        {project.specs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-[#737373] text-xs font-mono uppercase tracking-widest mb-4 print:text-black/60">
              Specs
            </h2>
            <SpecTable rows={project.specs} />
          </section>
        )}

        {project.systemDiagram && (
          <section className="mb-12">
            <h2 className="text-[#737373] text-xs font-mono uppercase tracking-widest mb-4 print:text-black/60">
              System overview
            </h2>
            <SystemDiagram
              src={project.systemDiagram.src}
              alt={project.systemDiagram.alt}
              caption={project.systemDiagram.caption}
            />
          </section>
        )}

        {project.sections.map((section) => (
          <section key={section.heading} className="mb-12 print:break-before-page">
            <h2 className="text-[#F5F5F5] text-xl font-semibold mb-4 print:text-black">
              {section.heading}
            </h2>
            <div className="space-y-4">
              {section.body.map((p, i) => (
                <Paragraph key={i} text={p} />
              ))}
            </div>
            {section.code && <CodeBlock sample={section.code} />}
            {section.media && section.media.length > 0 && (
              <MediaGallery media={section.media} />
            )}
          </section>
        ))}

        {project.challenges && project.challenges.length > 0 && (
          <section className="mb-12">
            <h2 className="text-[#F5F5F5] text-xl font-semibold mb-4 print:text-black">
              Challenges & decisions
            </h2>
            <ul className="space-y-2 list-disc pl-5 marker:text-[#404040]">
              {project.challenges.map((c, i) => (
                <li key={i} className={isPlaceholder(c) ? "text-[#737373] italic print:text-black/50" : "text-[#D4D4D4] leading-relaxed print:text-black"}>
                  {c}
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.resources.length > 0 && (
          <section>
            <h2 className="text-[#737373] text-xs font-mono uppercase tracking-widest mb-2 print:text-black/60">
              Resources
            </h2>
            <Resources resources={project.resources} />
          </section>
        )}
      </main>
    </article>
  );
}
