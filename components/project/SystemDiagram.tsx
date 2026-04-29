import Image from "next/image";
import { isPlaceholder } from "@/lib/placeholder";

interface Props {
  src: string;
  alt: string;
  caption?: string;
}

export default function SystemDiagram({ src, alt, caption }: Props) {
  const placeholder = isPlaceholder(src);

  return (
    <figure className="my-8">
      <div className="relative w-full bg-[#141414] border border-[#1F1F1F] rounded-lg overflow-hidden print:border-black/30">
        {placeholder ? (
          <div className="aspect-video flex flex-col items-center justify-center text-center px-6 text-[#737373]">
            <span className="font-mono text-xs uppercase tracking-widest text-[#A3A3A3] mb-2">
              Block diagram pending
            </span>
            <span className="text-xs font-mono italic max-w-md">{src}</span>
          </div>
        ) : (
          <div className="relative aspect-video">
            <Image
              src={src}
              alt={alt}
              fill
              unoptimized={src.endsWith(".svg")}
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-[#737373] text-xs font-mono print:text-black/60">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
