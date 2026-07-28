"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/ui/tilt-card";
import StatusBadge from "@/components/ui/StatusBadge";
import { isPlaceholder } from "@/lib/placeholder";
import type { ProjectContent } from "@/content/projects/types";

interface Props {
  project: ProjectContent;
  index: number;
  variant?: "featured" | "compact";
}

function PendingMedia({ featured }: { featured: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#0A0A0A] [background-image:radial-gradient(#1F1F1F_1px,transparent_1px)] [background-size:20px_20px]">
      <span className="text-[#404040] font-mono text-xs uppercase tracking-widest">
        media pending
      </span>
      {featured && (
        <span className="text-[#404040] font-mono text-[10px] uppercase tracking-widest">
          board at fab · renders to follow
        </span>
      )}
    </div>
  );
}

export default function ProjectCard({
  project,
  index,
  variant = "compact",
}: Props) {
  // Compact cells always render a still image; video posters stand in for
  // video heroes so a grid of cards never autoplays multiple videos.
  const previewSrc =
    project.hero.type === "video"
      ? project.hero.poster ?? project.hero.src
      : project.hero.src;
  const previewIsPlaceholder =
    isPlaceholder(project.hero.src) || isPlaceholder(previewSrc);

  const bio =
    project.summary[0] && !isPlaceholder(project.summary[0])
      ? project.summary[0]
      : project.oneLineSummary;

  const metaLine = `${project.dates}${
    project.role ? ` · ${project.role.split(",")[0].trim()}` : ""
  }`;

  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative"
      >
        <Link
          href={`/projects/${project.slug}`}
          className="block group rounded-3xl focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3B82F6]"
        >
          <TiltCard
            tiltLimit={5}
            scale={1.01}
            className="rounded-3xl border border-[#1F1F1F] bg-[#141414] shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr] relative z-20">
              {/* Media */}
              <div className="relative aspect-[4/3] md:aspect-auto md:h-[420px] bg-[#0A0A0A] border-b md:border-b-0 md:border-r border-[#1F1F1F] overflow-hidden">
                {previewIsPlaceholder ? (
                  <PendingMedia featured />
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
                {/* Names why this card is the large one — the featured slot is
                    a deliberate pick, not just whichever project is newest. */}
                <div className="flex items-center gap-3">
                  <span className="text-[#F5F5F5] text-[10px] font-mono uppercase tracking-widest whitespace-nowrap">
                    Featured project
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-[#1F1F1F]" />
                </div>

                {project.badge && <StatusBadge label={project.badge} />}

                <p className="text-[#737373] text-xs font-mono uppercase tracking-widest">
                  {metaLine}
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
                  <span className="inline-flex items-center gap-2 text-sm font-mono text-[#F5F5F5] border border-[#1F1F1F] group-hover:border-[#404040] bg-[#0A0A0A] group-hover:bg-[#1A1A1A] px-4 py-2 rounded transition-colors">
                    View details
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </div>
            </div>
          </TiltCard>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: (index % 3) * 0.08,
      }}
      className="h-full relative hover:z-10"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block h-full group rounded-3xl focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3B82F6]"
      >
        <TiltCard
          tiltLimit={4}
          scale={1.02}
          className="h-full rounded-3xl border border-[#1F1F1F] bg-[#141414] hover:border-[#2A2A2A] transition-colors"
        >
          <div className="flex h-full flex-col relative z-20">
            {/* Media */}
            <div className="relative aspect-[16/10] bg-[#0A0A0A] border-b border-[#1F1F1F] overflow-hidden rounded-t-3xl">
              {previewIsPlaceholder ? (
                <PendingMedia featured={false} />
              ) : (
                <Image
                  src={previewSrc}
                  alt={project.hero.alt}
                  fill
                  unoptimized={previewSrc.endsWith(".svg")}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-2.5 p-5">
              {project.badge && <StatusBadge label={project.badge} />}

              <p className="text-[#737373] text-[10px] font-mono uppercase tracking-widest">
                {metaLine}
              </p>

              <h3 className="text-[#F5F5F5] text-lg font-semibold tracking-tight leading-snug">
                {project.title}
              </h3>

              <p className="text-[#A3A3A3] text-sm leading-relaxed line-clamp-2">
                {bio}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-1">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] uppercase tracking-widest text-[#737373] border border-[#1F1F1F] px-1.5 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className="mt-auto pt-3 inline-flex items-center gap-1.5 text-xs font-mono text-[#737373] group-hover:text-[#F5F5F5] transition-colors">
                View details <span aria-hidden>→</span>
              </span>
            </div>
          </div>
        </TiltCard>
      </Link>
    </motion.div>
  );
}
