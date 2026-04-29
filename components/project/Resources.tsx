import { isPlaceholder } from "@/lib/placeholder";
import type { ResourceLink } from "@/content/projects/types";

interface Props {
  resources: ResourceLink[];
}

export default function Resources({ resources }: Props) {
  if (resources.length === 0) return null;

  return (
    <ul className="border-t border-[#1F1F1F] pt-6 mt-6 space-y-2 print:border-black/30">
      {resources.map((resource) => {
        const linkPlaceholder = isPlaceholder(resource.href);
        const labelPlaceholder = isPlaceholder(resource.label);
        return (
          <li key={resource.label + resource.href} className="text-sm">
            {linkPlaceholder ? (
              <span className="text-[#737373] italic font-mono text-xs print:text-black/40">
                {resource.label} <span className="text-[#404040]">(link pending)</span>
              </span>
            ) : (
              <a
                href={resource.href}
                target={resource.href.startsWith("http") ? "_blank" : undefined}
                rel={resource.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={
                  labelPlaceholder
                    ? "text-[#737373] italic underline decoration-[#1F1F1F] hover:text-[#F5F5F5] hover:decoration-[#737373] transition-colors print:text-black"
                    : "text-[#F5F5F5] underline decoration-[#1F1F1F] hover:decoration-[#737373] transition-colors print:text-black"
                }
              >
                {resource.label}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
