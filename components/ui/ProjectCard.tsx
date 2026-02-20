"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  index: number;
}

export default function ProjectCard({
  title,
  description,
  tags,
  image,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative bg-[#141414] border border-[#1F1F1F] rounded-xl transition-all duration-300"
    >
      <GlowingEffect
        spread={40}
        glow={false}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={2}
      />

      {/* Project image */}
      <div className="relative w-full h-48 overflow-hidden bg-[#0A0A0A] rounded-t-xl">
        <Image
          src={image}
          alt={title}
          fill
          unoptimized={image.endsWith(".svg")}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/60 to-transparent" />
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
    </motion.div>
  );
}
