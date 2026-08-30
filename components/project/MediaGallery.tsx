"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";
import InlineCode from "./InlineCode";
import { isPlaceholder } from "@/lib/placeholder";
import type { MediaItem } from "@/content/projects/types";

interface Props {
  media: MediaItem[];
}

export default function MediaGallery({ media }: Props) {
  const [active, setActive] = useState<MediaItem | null>(null);

  if (media.length === 0) return null;

  return (
    <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4 print:grid-cols-1">
      {media.map((item) => {
        const placeholder = isPlaceholder(item.src);
        return (
          <figure key={item.src + item.alt} className="bg-[#141414] border border-[#1F1F1F] rounded-lg overflow-hidden print:border-black/30">
            {placeholder ? (
              <div className="aspect-video flex flex-col items-center justify-center text-center px-4 text-[#737373]">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#A3A3A3] mb-1">
                  Photo pending
                </span>
                <span className="text-[11px] font-mono italic max-w-xs">
                  {item.src}
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setActive(item)}
                aria-label={`Open ${item.alt} in lightbox`}
                className="relative block w-full aspect-video cursor-zoom-in print:cursor-default"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  unoptimized={item.src.endsWith(".svg")}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </button>
            )}
            {item.caption && (
              <figcaption className="px-4 py-2 text-[#737373] text-xs font-mono print:text-black/60">
                <InlineCode text={item.caption} />
              </figcaption>
            )}
          </figure>
        );
      })}
      {active && (
        <Lightbox
          src={active.src}
          alt={active.alt}
          onClose={() => setActive(null)}
        />
      )}
    </div>
  );
}
