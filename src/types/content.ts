export type SocialIcon =
  | "github"
  | "linkedin"
  | "mail"
  | "youtube"
  | "facebook"
  | "instagram"
  | "globe";

export type SocialLink = {
  label: string;
  href: string;
  icon: SocialIcon;
  handle?: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  tech: string[];
  current?: boolean;
};

export type Education = {
  degree: string;
  school: string;
  period: string;
  detail: string;
  status?: string;
};

export type Certification = {
  name: string;
  issuer: string;
  year: string;
};

export type ProjectCategory =
  | "Full-stack"
  | "Mobile"
  | "Real-time"
  | "AI"
  | "Games"
  | "Tools";

export type ProjectLink = {
  label: string;
  href: string;
  type: "live" | "github" | "case-study";
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  description: string[];
  year: string;
  role: string;
  category: ProjectCategory;
  featured: boolean;
  tech: string[];
  links: ProjectLink[];
  cover: string;
  coverAlt: string;
  accent: string;
  metrics: { value: string; label: string }[];
  highlights: string[];
  note?: string;
};

export type Principle = {
  title: string;
  description: string;
};

export type ReviewSource =
  | "Fiverr"
  | "Upwork"
  | "LinkedIn"
  | "Email"
  | "Direct";

export type Review = {
  quote: string;
  name: string;
  role: string;
  country?: string;
  projectType?: string;
  rating?: number;
  source?: ReviewSource;
  sourceUrl?: string;
  featured?: boolean;
};

export type ReviewCriterion = {
  label: string;
  score: number;
};

export type ReviewSummary = {
  score: number;
  platform: ReviewSource;
  url?: string;
  criteria: ReviewCriterion[];
};

/**
 * A LinkedIn-style recommendation from someone the owner has worked with.
 *
 * Deliberately separate from `Review`: a review is a marketplace verdict with a
 * star rating and a source, a recommendation is a paragraph a manager, teammate
 * or client wrote about working together.
 */
export type Recommendation = {
  name: string;
  /** Their role at the time, e.g. "Engineering Manager". */
  title: string;
  company?: string;
  /** How you worked together, e.g. "Managed Musarrat directly". */
  relationship?: string;
  /** Free text so "March 2024", "2024" and "Q1 2024" all fit. */
  date?: string;
  quote: string;
  /** Optional photo URL; initials are used when it is missing. */
  avatar?: string;
  /** Optional link to the recommendation on LinkedIn. */
  profileUrl?: string;
};

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
  tags: string[];
};

/**
 * Colour settings for the public site. Injected as CSS custom properties on
 * `<html>`, overriding the defaults declared in `globals.css`.
 *
 * Only the base colours are stored — the accent's tint (`--accent-soft`) and
 * the readable text colour on top of it (`--accent-foreground`) are derived
 * from `accent` so the admin only ever picks one colour.
 */
export type ThemeSettings = {
  accent: string;
  background: string;
  surface: string;
  surface2: string;
  foreground: string;
  muted: string;
  mutedStrong: string;
};

/** Every editable value on the public site, as one object. */
export type SiteContent = {
  site: {
    name: string;
    shortName: string;
    firstName: string;
    lastName: string;
    /** Bundled path (`/images/portrait.jpg`) or an absolute http(s) URL. */
    portrait: string;
    initials: string;
    domain: string;
    role: string;
    roleLong: string;
    tagline: string;
    summary: string;
    location: string;
    timezone: string;
    email: string;
    availability: string;
    url: string;
    description: string;
    nav: NavItem[];
    socials: SocialLink[];
    stats: Stat[];
    principles: Principle[];
    currently: string[];
    languages: string[];
  };
  theme: ThemeSettings;
  experience: Experience[];
  reviews: Review[];
  reviewSummary: ReviewSummary;
  recommendations: Recommendation[];
  education: Education[];
  certifications: Certification[];
  skillGroups: SkillGroup[];
  techMarquee: string[];
  projects: Project[];
};

/** Sections stored as their own Firestore document, so writes never clobber each other. */
export type ContentSectionKey =
  | "main"
  | "experience"
  | "reviews"
  | "recommendations"
  | "education"
  | "skills"
  | "projects";
