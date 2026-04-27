"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TiltCard } from "@/components/ui/tilt-card";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  index: number;
  videoUrl?: string;
  videoSrc?: string;
  poster?: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  image,
  index,
  videoUrl,
  videoSrc,
  poster,
}: ProjectCardProps) {
  const cardInner = (
    <TiltCard className="h-full bg-[#141414] border border-[#1F1F1F] rounded-xl overflow-hidden">
      {/* Project media */}
      <div className="relative w-full h-56 overflow-hidden bg-[#0A0A0A]">
        {videoSrc ? (
          <video
            src={videoSrc}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-contain p-2"
          />
        ) : (
          <>
            <Image
              src={image}
              alt={title}
              fill
              unoptimized={image.endsWith(".svg")}
              className="object-contain p-2"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {videoUrl && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="#141414"
                    className="ml-1"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Card content */}
      <div className="p-6">
        <h3 className="text-[#F5F5F5] font-semibold text-base mb-2">{title}</h3>
        <p className="text-[#737373] text-sm leading-relaxed mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs text-[#737373] bg-[#0A0A0A] border border-[#1F1F1F] px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </TiltCard>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
    >
      {videoUrl ? (
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
        >
          {cardInner}
        </a>
      ) : (
        cardInner
      )}
    </motion.div>
  );
}
