import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/ui/ProjectCard";
import { featuredProject, gridProjects } from "@/content/projects";

export default function Projects() {
  return (
    <section id="projects" className="relative -mt-px bg-[#0A0A0A] pt-12">
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-16 flex flex-col gap-6">
        <SectionHeader title="Projects" />
        <ProjectCard project={featuredProject} index={0} variant="featured" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gridProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
