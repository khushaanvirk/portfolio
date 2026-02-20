"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const stats = [
  { label: "Degree", value: "BASc Electrical Engineering" },
  { label: "University", value: "UBC" },
  { label: "Location", value: "Vancouver, BC" },
];

export default function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="About" />

        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Headshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="shrink-0"
          >
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-[#1F1F1F] ring-4 ring-[#141414]">
              <Image
                src="/headshot.jpg"
                alt="Khushaan Virk"
                width={192}
                height={192}
                className="object-cover w-full h-full"
              />
            </div>
          </motion.div>

          {/* Text content */}
          <div className="flex-1 max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[#737373] leading-relaxed text-base"
            >
              I&apos;m a second-year Electrical Engineering student at UBC with
              hands-on experience in embedded systems, PCB design, and
              hardware-software integration. Outside of academics I&apos;m an
              AI Automation Engineer and co-founder at Visurae, and an
              Automation Engineer at Advizr, where I build AI-powered workflow
              systems. I&apos;m driven by the challenge of turning low-level
              hardware into real-world solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="relative bg-[#141414] border border-[#1F1F1F] rounded-lg p-3"
                >
                  <GlowingEffect
                    spread={25}
                    glow={false}
                    disabled={false}
                    proximity={60}
                    inactiveZone={0.01}
                    borderWidth={1.5}
                  />
                  <p className="text-[#737373] text-xs font-mono uppercase tracking-widest mb-1">
                    {stat.label}
                  </p>
                  <p className="text-[#F5F5F5] text-sm font-medium">
                    {stat.value}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
