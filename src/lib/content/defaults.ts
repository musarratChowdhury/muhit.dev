import type { SiteContent, ThemeSettings } from "@/types/content";
import { site } from "@/content/site";
import { experience } from "@/content/experience";
import { reviewSummary, reviews } from "@/content/testimonials";
import { recommendations } from "@/content/recommendations";
import { certifications, education } from "@/content/education";
import { skillGroups, techMarquee } from "@/content/skills";
import { projects } from "@/content/projects";

/**
 * The site's original content, kept in TypeScript on purpose.
 *
 * It is both the seed for a fresh Firestore database and the fallback used
 * whenever Firestore is unreachable (missing credentials during a build, a
 * network blip, a cold project). Editing content in `/admin` writes to
 * Firestore and never touches these files.
 */
export const defaultTheme: ThemeSettings = {
  accent: "#00ff99",
  background: "#0f0e1a",
  surface: "#141420",
  surface2: "#1a1a2a",
  foreground: "#f3f3f7",
  muted: "#9a9aab",
  mutedStrong: "#c7c7d4",
};

export const defaultContent: SiteContent = {
  site: {
    ...site,
    nav: [...site.nav],
    socials: [...site.socials],
    stats: [...site.stats],
    principles: [...site.principles],
    currently: [...site.currently],
    languages: [...site.languages],
  },
  theme: defaultTheme,
  experience: [...experience],
  reviews: [...reviews],
  reviewSummary: {
    ...reviewSummary,
    criteria: [...reviewSummary.criteria],
  },
  recommendations: [...recommendations],
  education: [...education],
  certifications: [...certifications],
  skillGroups: [...skillGroups],
  techMarquee: [...techMarquee],
  projects: [...projects],
};

/** The document each admin section writes to, keyed by section. */
export const contentDocIds = {
  main: "main",
  experience: "experience",
  reviews: "reviews",
  recommendations: "recommendations",
  education: "education",
  skills: "skills",
  projects: "projects",
} as const;

export const CONTENT_COLLECTION = "siteContent";
