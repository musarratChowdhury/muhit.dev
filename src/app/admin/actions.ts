"use server";

import { updateTag } from "next/cache";
import { getAdminUser } from "@/lib/auth/session";
import { getDb } from "@/lib/firebase/admin";
import { CONTENT_TAG } from "@/lib/content/store";
import {
  CONTENT_COLLECTION,
  contentDocIds,
  defaultTheme,
} from "@/lib/content/defaults";
import {
  changedFields,
  recordAudit,
  scalarChanges,
} from "@/lib/content/audit";
import type { ThemeSettings } from "@/types/content";
import {
  parseEducation,
  parseExperience,
  parseMain,
  parseProjects,
  parseRecommendations,
  parseReviews,
  parseSkills,
  type ParseResult,
} from "@/lib/content/schema";

export type SaveState = {
  ok: boolean;
  message: string;
};

/**
 * Authorises a write.
 *
 * Deliberately not `requireAdmin()`: that helper calls `redirect()`, which is
 * right for a page but wrong inside a Server Action called from a client
 * component — the thrown redirect surfaces as a failed promise and the caller
 * cannot tell it apart from a real error. Returning a state lets the editor show
 * an honest message.
 */
async function requireAdminForAction(): Promise<
  { ok: true; email: string } | { ok: false; state: SaveState }
> {
  const admin = await getAdminUser();
  if (!admin) {
    return {
      ok: false,
      state: {
        ok: false,
        message: "Your session expired. Reload the page and sign in again.",
      },
    };
  }
  return { ok: true, email: admin.email };
}

/** Human names for the log, keyed by the document each section writes. */
const SECTION_LABELS: Record<string, string> = {
  main: "Site & theme",
  experience: "Experience",
  reviews: "Reviews",
  recommendations: "Recommendations",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
};

const THEME_KEYS = [
  "accent",
  "background",
  "surface",
  "surface2",
  "foreground",
  "muted",
  "mutedStrong",
] as const;

async function writeSection(
  docId: string,
  data: unknown,
  updatedBy: string,
): Promise<SaveState> {
  const db = getDb();
  if (!db) {
    return {
      ok: false,
      message: "Firebase Admin is not configured, so nothing was saved.",
    };
  }

  try {
    const ref = db.collection(CONTENT_COLLECTION).doc(docId);

    // Read first so the audit entry can say what actually changed.
    const before = (await ref.get()).data()?.data;

    await ref.set(
      {
        data,
        updatedAt: new Date().toISOString(),
        updatedBy,
      },
      { merge: true },
    );

    // Read-your-own-writes: the next render waits for the fresh document.
    updateTag(CONTENT_TAG);

    const fields = changedFields(before, data);
    if (fields.length > 0) {
      const label = SECTION_LABELS[docId] ?? docId;
      await recordAudit({
        actorEmail: updatedBy,
        action: "content.save",
        section: docId,
        summary: `Saved ${label}.`,
        fields,
        changes: scalarChanges(before, data),
      });
    }

    return { ok: true, message: "Saved. The site is up to date." };
  } catch (error) {
    console.error(`[admin] failed to save ${docId}`, error);
    return { ok: false, message: "Could not reach Firestore. Try again." };
  }
}

/**
 * Puts every colour back to the shipped defaults.
 *
 * Only the theme is touched — the rest of the `main` document is written back
 * exactly as it was read, so a reset can never disturb the site copy.
 */
export async function resetTheme(): Promise<SaveState> {
  const admin = await requireAdminForAction();
  if (!admin.ok) return admin.state;

  const db = getDb();
  if (!db) {
    return {
      ok: false,
      message: "Firebase Admin is not configured, so nothing was saved.",
    };
  }

  try {
    const ref = db.collection(CONTENT_COLLECTION).doc(contentDocIds.main);
    const snapshot = await ref.get();
    const current = (snapshot.data()?.data ?? {}) as {
      theme?: Partial<ThemeSettings>;
      [key: string]: unknown;
    };

    const before: Partial<ThemeSettings> = current.theme ?? defaultTheme;
    const changed = THEME_KEYS.filter((key) => before[key] !== defaultTheme[key]);

    await ref.set(
      {
        data: { ...current, theme: defaultTheme },
        updatedAt: new Date().toISOString(),
        updatedBy: admin.email,
      },
      { merge: true },
    );

    updateTag(CONTENT_TAG);

    await recordAudit({
      actorEmail: admin.email,
      action: "theme.reset",
      section: "theme",
      summary:
        changed.length > 0
          ? `Reset ${changed.length} colour${changed.length === 1 ? "" : "s"} to the shipped defaults.`
          : "Reset the theme to the shipped defaults (it already matched).",
      fields: ["theme"],
      changes: changed.map((key) => ({
        field: `theme.${key}`,
        from: String(before[key] ?? "—"),
        to: defaultTheme[key],
      })),
    });

    return { ok: true, message: "Theme reset to the shipped defaults." };
  } catch (error) {
    console.error("[admin] failed to reset theme", error);
    return { ok: false, message: "Could not reach Firestore. Try again." };
  }
}

function reject<T>(result: ParseResult<T>): SaveState {
  return {
    ok: false,
    message: result.ok ? "Invalid payload." : result.error,
  };
}

export async function saveMain(payload: unknown): Promise<SaveState> {
  const admin = await requireAdminForAction();
  if (!admin.ok) return admin.state;

  const parsed = parseMain(payload);
  if (!parsed.ok) return reject(parsed);

  return writeSection(contentDocIds.main, parsed.value, admin.email);
}

export async function saveExperience(payload: unknown): Promise<SaveState> {
  const admin = await requireAdminForAction();
  if (!admin.ok) return admin.state;

  const parsed = parseExperience(payload);
  if (!parsed.ok) return reject(parsed);

  return writeSection(contentDocIds.experience, parsed.value, admin.email);
}

export async function saveReviews(payload: unknown): Promise<SaveState> {
  const admin = await requireAdminForAction();
  if (!admin.ok) return admin.state;

  const parsed = parseReviews(payload);
  if (!parsed.ok) return reject(parsed);

  return writeSection(contentDocIds.reviews, parsed.value, admin.email);
}

export async function saveRecommendations(payload: unknown): Promise<SaveState> {
  const admin = await requireAdminForAction();
  if (!admin.ok) return admin.state;

  const parsed = parseRecommendations(payload);
  if (!parsed.ok) return reject(parsed);

  return writeSection(contentDocIds.recommendations, parsed.value, admin.email);
}

export async function saveEducation(payload: unknown): Promise<SaveState> {
  const admin = await requireAdminForAction();
  if (!admin.ok) return admin.state;

  const parsed = parseEducation(payload);
  if (!parsed.ok) return reject(parsed);

  return writeSection(contentDocIds.education, parsed.value, admin.email);
}

export async function saveSkills(payload: unknown): Promise<SaveState> {
  const admin = await requireAdminForAction();
  if (!admin.ok) return admin.state;

  const parsed = parseSkills(payload);
  if (!parsed.ok) return reject(parsed);

  return writeSection(contentDocIds.skills, parsed.value, admin.email);
}

export async function saveProjects(payload: unknown): Promise<SaveState> {
  const admin = await requireAdminForAction();
  if (!admin.ok) return admin.state;

  const parsed = parseProjects(payload);
  if (!parsed.ok) return reject(parsed);

  return writeSection(contentDocIds.projects, parsed.value, admin.email);
}
