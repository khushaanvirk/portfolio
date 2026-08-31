"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

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
    <section id="contact" className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader title="Contact" />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-[#A3A3A3] text-sm leading-relaxed mb-6 max-w-xl"
        >
          Open to internships and collaborations. Send a message and
          I&apos;ll get back to you.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 max-w-xl"
        >
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
            className="px-6 py-3 bg-[#F5F5F5] hover:bg-white disabled:opacity-50 text-[#0A0A0A] text-sm font-medium rounded-md transition-colors cursor-pointer"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="text-[#A3A3A3] text-sm">
              Message sent! I&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-sm">
              Something went wrong. Please try emailing directly.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
