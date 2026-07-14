import Image from "next/image";
import { isPlaceholder } from "@/lib/placeholder";
import type { ProjectContent } from "@/content/projects/types";

interface Props {
  hero: ProjectContent["hero"];
}

export default function ProjectHero({ hero }: Props) {
  const placeholder = isPlaceholder(hero.src);

  return (
    <div className="relative w-full bg-[#141414] border border-[#1F1F1F] rounded-lg overflow-hidden mb-10 print:border-black/30">
      {placeholder ? (
        <div className="aspect-video flex flex-col items-center justify-center text-center px-6 text-[#737373]">
          <span className="font-mono text-xs uppercase tracking-widest text-[#A3A3A3] mb-2">
            Hero media pending
          </span>
          <span className="text-xs font-mono italic max-w-md">{hero.alt}</span>
        </div>
      ) : hero.type === "video" ? (
        <video
          src={hero.src}
          poster={hero.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full max-h-[500px] object-contain bg-black print:hidden"
        />
      ) : (
        <div className="relative w-full aspect-video">
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            unoptimized={hero.src.endsWith(".svg")}
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        </div>
      )}
    </div>
  );
}
