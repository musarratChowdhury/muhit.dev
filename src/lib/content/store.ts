import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { getDb } from "@/lib/firebase/admin";
import type {
  Certification,
  Education,
  Experience,
  Project,
  Recommendation,
  Review,
  ReviewSummary,
  SiteContent,
  SkillGroup,
  ThemeSettings,
} from "@/types/content";
import { CONTENT_COLLECTION, contentDocIds, defaultContent } from "./defaults";

/** Every read and write of site content shares this tag. */
export const CONTENT_TAG = "site-content";

type MainSection = {
  site?: Partial<SiteContent["site"]>;
  theme?: Partial<ThemeSettings>;
};

type ReviewsSection = {
  reviews?: Review[];
  summary?: ReviewSummary;
};

type EducationSection = {
  education?: Education[];
  certifications?: Certification[];
};

type SkillsSection = {
  groups?: SkillGroup[];
  marquee?: string[];
};

/** Documents are written as `{ data, updatedAt, updatedBy }`; tolerate raw payloads too. */
function unwrap<T>(value: unknown): T | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  if ("data" in record) return (record.data as T) ?? null;
  return value as T;
}

async function readSection<T>(docId: string): Promise<T | null> {
  const db = getDb();
  if (!db) return null;

  try {
    const snapshot = await db.collection(CONTENT_COLLECTION).doc(docId).get();
    if (!snapshot.exists) return null;
    return unwrap<T>(snapshot.data());
  } catch {
    // Firestore unreachable (offline build, revoked key): use the code defaults.
    return null;
  }
}

/**
 * The single source of truth for every rendered value on the public site.
 *
 * Cached under `site-content`; admin saves call `updateTag(CONTENT_TAG)` so the
 * next request renders the new values instead of waiting for the cache life.
 * Any section missing from Firestore falls back to the TypeScript content.
 */
export async function getSiteContent(): Promise<SiteContent> {
  "use cache";
  cacheTag(CONTENT_TAG);
  cacheLife("days");

  const [main, experience, reviews, recommendations, education, skills, projects] =
    await Promise.all([
      readSection<MainSection>(contentDocIds.main),
      readSection<Experience[]>(contentDocIds.experience),
      readSection<ReviewsSection>(contentDocIds.reviews),
      readSection<Recommendation[]>(contentDocIds.recommendations),
      readSection<EducationSection>(contentDocIds.education),
      readSection<SkillsSection>(contentDocIds.skills),
      readSection<Project[]>(contentDocIds.projects),
    ]);

  return {
    site: { ...defaultContent.site, ...(main?.site ?? {}) },
    theme: { ...defaultContent.theme, ...(main?.theme ?? {}) },
    experience: experience ?? defaultContent.experience,
    reviews: reviews?.reviews ?? defaultContent.reviews,
    reviewSummary: reviews?.summary ?? defaultContent.reviewSummary,
    recommendations: recommendations ?? defaultContent.recommendations,
    education: education?.education ?? defaultContent.education,
    certifications: education?.certifications ?? defaultContent.certifications,
    skillGroups: skills?.groups ?? defaultContent.skillGroups,
    techMarquee: skills?.marquee ?? defaultContent.techMarquee,
    projects: projects ?? defaultContent.projects,
  };
}

export function findProject(content: SiteContent, slug: string): Project | undefined {
  return content.projects.find((project) => project.slug === slug);
}

export function featuredProjectsOf(content: SiteContent): Project[] {
  return content.projects.filter((project) => project.featured);
}
