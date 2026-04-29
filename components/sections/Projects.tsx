import SectionHeader from "@/components/ui/SectionHeader";
import ProjectShowcase from "@/components/ui/ProjectShowcase";
import { allProjects } from "@/content/projects";

export default function Projects() {
  return (
    <section id="projects" className="relative pt-12">
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-4">
        <SectionHeader title="Projects" />
      </div>
      {allProjects.map((project) => (
        <ProjectShowcase key={project.slug} project={project} />
      ))}
    </section>
  );
}
