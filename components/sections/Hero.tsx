"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const btnBase = "px-6 py-3 text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer w-full border border-[#333333] hover:border-[#737373] text-[#F5F5F5]";

export default function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-16 relative">
      <div className="max-w-5xl mx-auto w-full">
        <Card className="w-full h-[500px] md:h-[560px] bg-[#0D0D0D] relative overflow-hidden border-[#1F1F1F]">
          <Spotlight size={300} />

          <div className="flex h-full">
            {/* Left: text content */}
            <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#F5F5F5] tracking-tight leading-none"
              >
                Khushaan
                <br />
                Virk
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="mt-5 text-base text-[#737373] max-w-xs"
              >
                Electrical Engineering Student at UBC
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3"
              >
                <div className="relative rounded-md">
                  <GlowingEffect spread={30} glow={false} disabled={false} proximity={60} inactiveZone={0.01} borderWidth={1.5} />
                  <button onClick={() => scrollTo("#projects")} className={btnBase}>
                    View Projects
                  </button>
                </div>
                <div className="relative rounded-md">
                  <GlowingEffect spread={30} glow={false} disabled={false} proximity={60} inactiveZone={0.01} borderWidth={1.5} />
                  <button onClick={() => scrollTo("#contact")} className={btnBase}>
                    Get in Touch
                  </button>
                </div>
                <div className="relative rounded-md">
                  <GlowingEffect spread={30} glow={false} disabled={false} proximity={60} inactiveZone={0.01} borderWidth={1.5} />
                  <a href="/resume.pdf" download="Khushaan_Virk_Resume.pdf" className={btnBase + " block text-center"}>
                    Resume ↓
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right: Spline 3D scene */}
            <div className="flex-1 relative hidden md:block">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[#737373] text-xs font-mono tracking-widest">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#737373] to-transparent" />
      </motion.div>
    </section>
  );
}
