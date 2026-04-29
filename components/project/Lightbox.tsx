"use client";

import Image from "next/image";
import { useEffect } from "react";

interface Props {
  src: string;
  alt: string;
  onClose: () => void;
}

export default function Lightbox({ src, alt, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-label={alt}
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image"
        className="absolute top-4 right-4 text-[#F5F5F5] text-2xl w-10 h-10 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
      >
        ×
      </button>
      <div className="relative w-full h-full max-w-6xl max-h-full">
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized={src.endsWith(".svg")}
          className="object-contain"
          sizes="100vw"
        />
      </div>
    </div>
  );
}
