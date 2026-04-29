import type { CodeSample } from "@/content/projects/types";

interface Props {
  sample: CodeSample;
}

export default function CodeBlock({ sample }: Props) {
  return (
    <figure className="my-6">
      <pre className="bg-[#141414] border border-[#1F1F1F] rounded-lg p-4 overflow-x-auto text-xs leading-relaxed print:bg-white print:border-black/30 print:text-[10px]">
        <code
          className={`font-mono text-[#F5F5F5] language-${sample.language} print:text-black`}
        >
          {sample.source}
        </code>
      </pre>
      {sample.caption && (
        <figcaption className="mt-2 text-[#737373] text-xs font-mono print:text-black/60">
          {sample.caption}
        </figcaption>
      )}
    </figure>
  );
}
