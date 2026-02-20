"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-3xl font-semibold text-[#F5F5F5] tracking-tight">
        {title}
      </h2>
      <div className="mt-3 h-px w-12 bg-[#F5F5F5]" />
    </motion.div>
  );
}
