"use client";

import { motion } from "framer-motion";

interface SkillGroupProps {
  label: string;
  skills: string[];
  index: number;
}

export default function SkillGroup({ label, skills, index }: SkillGroupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <h3 className="text-[#F5F5F5] font-semibold text-base mb-3">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="text-xs font-mono text-[#737373] bg-[#141414] border border-[#1F1F1F] px-3 py-1.5 rounded hover:border-[#404040] hover:text-[#F5F5F5] transition-all duration-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
