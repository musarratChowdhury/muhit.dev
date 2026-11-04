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

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
  tags: string[];
};
