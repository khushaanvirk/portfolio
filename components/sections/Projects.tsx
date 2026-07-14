import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/ui/ProjectCard";
import { allProjects } from "@/content/projects";

export default function Projects() {
  const [featured, ...rest] = allProjects;

  return (
    <section id="projects" className="relative pt-12">
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-16 flex flex-col gap-6">
        <SectionHeader title="Projects" />
        <ProjectCard project={featured} index={0} variant="featured" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
