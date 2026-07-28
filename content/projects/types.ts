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
  /** Short highlight badge rendered as an accent pill on the homepage card and detail header, e.g. "Currently building". */
  badge?: string;
  /**
   * Marks the project rendered as the large card at the top of the homepage
   * Projects section. Deliberately independent of `projectOrder` so the
   * highlighted project doesn't have to be the most recent one. Set it on
   * exactly one project; the first project is used as a fallback.
   */
  featured?: boolean;
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
