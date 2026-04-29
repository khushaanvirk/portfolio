import { isPlaceholder } from "@/lib/placeholder";
import type { SpecRow } from "@/content/projects/types";

interface Props {
  rows: SpecRow[];
}

export default function SpecTable({ rows }: Props) {
  if (rows.length === 0) return null;

  return (
    <dl className="grid grid-cols-1 md:grid-cols-[max-content_1fr] gap-x-8 gap-y-3 border-t border-b border-[#1F1F1F] py-6 print:border-black/30">
      {rows.map((row) => {
        const placeholder = isPlaceholder(row.value);
        return (
          <div
            key={row.label}
            className="contents"
          >
            <dt className="text-[#737373] text-xs font-mono uppercase tracking-widest pt-0.5 print:text-black/60">
              {row.label}
            </dt>
            <dd
              className={
                placeholder
                  ? "text-[#737373] italic print:text-black/40"
                  : "text-[#F5F5F5] text-sm leading-relaxed print:text-black"
              }
            >
              {row.value}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
