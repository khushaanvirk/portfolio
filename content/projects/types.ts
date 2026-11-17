export interface MediaItem {
  src: string;
  alt: string;
  caption: string;
}

export interface SpecRow {
  label: string;
  value: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

/** What the homepage shows beside the list while a project row is hovered. */
export interface Preview {
  /** "drawing" is one of the white line SVGs in public/projects/drawings. */
  type: "image" | "video" | "drawing";
  src: string;
  /** Still frame for a video. */
  poster?: string;
  /** Tailwind object-position class, for a photo whose subject is off-centre. */
  position?: string;
}

export interface Hero {
  type: "image" | "video";
  src: string;
  /** Still frame for a video. */
  poster?: string;
  alt: string;
  /**
   * Shape of the media. Portrait shapes (9/16, 3/4) sit beside the spec list;
   * landscape shapes span the page above it.
   */
  aspect: "9/16" | "3/4" | "4/3" | "3/2" | "16/9";
}

/** Everything on a project's own page. Keep it short: one or two sentences, six specs. */
export interface ProjectPage {
  dates: string;
  blurb: string;
  hero: Hero;
  specs: SpecRow[];
  media: MediaItem[];
  links: ProjectLink[];
}

export interface Project {
  slug: string;
  title: string;
  year: string;
  /** The one line shown next to the title on the homepage. */
  line: string;
  /**
   * Three to five skills shown under the line. Use the words a job posting
   * would use (PCB design, Embedded C, Python), not part numbers or features.
   */
  skills: string[];
  preview: Preview;
  /** Omit for a project that lives on its own site; set `externalUrl` instead. */
  page?: ProjectPage;
  /** The homepage row links here, in a new tab, instead of to a project page. */
  externalUrl?: string;
}
