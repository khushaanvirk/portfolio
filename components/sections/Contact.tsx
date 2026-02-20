"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { GlowingEffect } from "@/components/ui/glowing-effect";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const inputClass =
  "w-full bg-[#141414] border border-[#1F1F1F] rounded-md px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#737373] focus:outline-none focus:border-[#404040] transition-colors";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        reset();
        return;
      }
    } catch {
      // fall through to mailto
    }

    const subject = encodeURIComponent(`Message from ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    );
    window.open(`mailto:khushaanvirk@gmail.com?subject=${subject}&body=${body}`);
    setStatus("success");
    reset();
  };

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="Contact" />

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left: links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[#737373] text-sm leading-relaxed mb-8">
              Open to work, collaborations, and interesting projects. Drop me a
              message and I&apos;ll get back to you.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href="mailto:khushaanvirk@gmail.com"
                className="flex items-center gap-3 text-sm text-[#737373] hover:text-[#F5F5F5] transition-colors duration-200 group"
              >
                <span className="w-8 h-8 flex items-center justify-center bg-[#141414] border border-[#1F1F1F] rounded group-hover:border-[#404040] transition-colors">
                  @
                </span>
                khushaanvirk@gmail.com
              </a>

              <a
                href="https://www.linkedin.com/in/khushaan-virk/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-[#737373] hover:text-[#F5F5F5] transition-colors duration-200 group"
              >
                <span className="w-8 h-8 flex items-center justify-center bg-[#141414] border border-[#1F1F1F] rounded group-hover:border-[#404040] transition-colors text-xs font-bold">
                  in
                </span>
                LinkedIn
              </a>

              <a
                href="/resume.pdf"
                download="Khushaan_Virk_Resume.pdf"
                className="flex items-center gap-3 text-sm text-[#737373] hover:text-[#F5F5F5] transition-colors duration-200 group"
              >
                <span className="w-8 h-8 flex items-center justify-center bg-[#141414] border border-[#1F1F1F] rounded group-hover:border-[#404040] transition-colors text-xs">
                  ↓
                </span>
                Download Resume
              </a>
            </div>
          </motion.div>

          {/* Right: form with glow */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative bg-[#141414] border border-[#1F1F1F] rounded-xl p-6"
          >
            <GlowingEffect
              spread={40}
              glow={false}
              disabled={false}
              proximity={80}
              inactiveZone={0.01}
              borderWidth={2}
            />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  {...register("name", { required: "Name is required" })}
                  placeholder="Your name"
                  className={inputClass}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                  placeholder="your@email.com"
                  type="email"
                  className={inputClass}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <textarea
                  {...register("message", { required: "Message is required" })}
                  placeholder="Your message..."
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 bg-[#F5F5F5] hover:bg-white disabled:opacity-50 text-[#0A0A0A] text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <p className="text-[#F5F5F5] text-sm text-center">
                  Message sent! I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-sm text-center">
                  Something went wrong. Please try emailing directly.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
