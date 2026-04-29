export interface MediaItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface CodeSample {
  language: string;
  source: string;
  caption?: string;
}

export interface ProjectSection {
  heading: string;
  body: string[];
  media?: MediaItem[];
  code?: CodeSample;
}

export interface SpecRow {
  label: string;
  value: string;
}

export interface ResourceLink {
  label: string;
  href: string;
}

export interface ProjectContent {
  slug: string;
  title: string;
  oneLineSummary: string;
  dates: string;
  status?: string;
  role?: string;
  tags: string[];
  hero: {
    type: "image" | "video";
    src: string;
    poster?: string;
    alt: string;
  };
  summary: string[];
  specs: SpecRow[];
  systemDiagram?: {
    src: string;
    alt: string;
    caption?: string;
  };
  sections: ProjectSection[];
  challenges?: string[];
  resources: ResourceLink[];
}
