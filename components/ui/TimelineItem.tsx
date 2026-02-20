"use client";

import { motion } from "framer-motion";

interface TimelineItemProps {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  isLast?: boolean;
}

export default function TimelineItem({
  role,
  company,
  period,
  bullets,
  isLast = false,
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative flex gap-6"
    >
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <div className="w-2.5 h-2.5 rounded-full bg-[#F5F5F5] mt-1.5 shrink-0 ring-4 ring-[#0A0A0A]" />
        {!isLast && <div className="w-px flex-1 bg-[#1F1F1F] mt-2" />}
      </div>

      {/* Content */}
      <div className="pb-12">
        <p className="text-xs font-mono text-[#737373] uppercase tracking-widest mb-1">
          {period}
        </p>
        <h3 className="text-[#F5F5F5] font-semibold text-base">{role}</h3>
        <p className="text-[#737373] text-sm mb-3">{company}</p>
        <ul className="space-y-1.5">
          {bullets.map((b, i) => (
            <li key={i} className="text-[#737373] text-sm flex gap-2">
              <span className="text-[#404040] mt-1.5">—</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
