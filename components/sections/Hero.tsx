"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ShaderBackground from "@/components/ui/shader-background";

const links = [
  { label: "Resume", href: "/resume.pdf", download: "Khushaan_Virk_Resume.pdf" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/khushaan-virk", external: true },
  { label: "Email", href: "#contact" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] md:min-h-[75vh] flex items-end px-6 pt-16 pb-12 overflow-hidden">
      <ShaderBackground className="absolute inset-0 w-full h-full opacity-60 print:hidden" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/30 via-transparent to-[#0A0A0A] pointer-events-none print:hidden"
      />
      <div className="relative max-w-4xl mx-auto w-full flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="shrink-0"
        >
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border border-[#1F1F1F] shadow-2xl">
            <Image
              src="/headshot.jpg"
              alt="Khushaan Virk"
              width={192}
              height={192}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </motion.div>

        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
            className="text-[#F5F5F5] text-4xl md:text-5xl font-semibold tracking-tight"
          >
            Khushaan Virk
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-[#A3A3A3] text-base md:text-lg mt-3 font-mono"
          >
            Electrical Engineering @ UBC
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="text-[#737373] text-sm mt-2"
          >
            Vancouver, BC
          </motion.p>

          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            aria-label="Profile links"
            className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-mono"
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                download={link.download}
                className="text-[#A3A3A3] hover:text-[#F5F5F5] underline decoration-[#1F1F1F] underline-offset-4 hover:decoration-[#737373] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.nav>
        </div>
      </div>
    </section>
  );
}
