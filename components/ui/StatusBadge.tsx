import { cn } from "@/lib/utils";

interface Props {
  label: string;
  className?: string;
}

// Accent pill for in-progress work. Server-safe: no hooks, no handlers.
export default function StatusBadge({ label, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[#3B82F6] border border-[#3B82F6]/40 bg-[#3B82F6]/10 px-2 py-0.5 rounded-full",
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#3B82F6] opacity-60 animate-ping" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#3B82F6]" />
      </span>
      {label}
    </span>
  );
}
