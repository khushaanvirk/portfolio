"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/ui/tilt-card";
import { isPlaceholder } from "@/lib/placeholder";
import type { ProjectContent } from "@/content/projects/types";

interface Props {
  project: ProjectContent;
}

export default function ProjectShowcase({ project }: Props) {
  const heroPlaceholder = isPlaceholder(project.hero.src);
  const previewSrc =
    project.hero.type === "video"
      ? project.hero.poster ?? project.hero.src
      : project.hero.src;
  const previewIsPlaceholder = heroPlaceholder || isPlaceholder(previewSrc);

  const bio =
    project.summary[0] && !isPlaceholder(project.summary[0])
      ? project.summary[0]
      : project.oneLineSummary;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-6xl"
      >
        <TiltCard
          tiltLimit={6}
          scale={1.01}
          className="rounded-3xl border border-[#1F1F1F] bg-[#141414] shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr] relative z-20">
            {/* Media */}
            <div className="relative aspect-[4/3] md:aspect-auto md:h-[560px] bg-[#0A0A0A] border-b md:border-b-0 md:border-r border-[#1F1F1F] overflow-hidden">
              {previewIsPlaceholder ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[#404040] font-mono text-xs uppercase tracking-widest">
                    media pending
                  </span>
                </div>
              ) : project.hero.type === "video" ? (
                <video
                  src={project.hero.src}
                  poster={project.hero.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={previewSrc}
                  alt={project.hero.alt}
                  fill
                  unoptimized={previewSrc.endsWith(".svg")}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  loading="eager"
                />
              )}
            </div>

            {/* Content */}
            <div className="p-7 md:p-10 flex flex-col gap-5">
              <p className="text-[#737373] text-xs font-mono uppercase tracking-widest">
                {project.dates}
                {project.role ? ` · ${project.role.split(",")[0].trim()}` : ""}
              </p>

              <h3 className="text-[#F5F5F5] text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
                {project.title}
              </h3>

              <p className="text-[#A3A3A3] text-sm md:text-base leading-relaxed">
                {bio}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, 6).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] uppercase tracking-widest text-[#737373] border border-[#1F1F1F] px-1.5 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-3">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-mono text-[#F5F5F5] border border-[#1F1F1F] hover:border-[#404040] bg-[#0A0A0A] hover:bg-[#1A1A1A] px-4 py-2 rounded transition-colors"
                >
                  View details
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </div>
  );
}
