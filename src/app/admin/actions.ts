"use server";

import { updateTag } from "next/cache";
import { getAdminUser } from "@/lib/auth/session";
import { getDb } from "@/lib/firebase/admin";
import { CONTENT_TAG } from "@/lib/content/store";
import { CONTENT_COLLECTION, contentDocIds } from "@/lib/content/defaults";
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
    await db
      .collection(CONTENT_COLLECTION)
      .doc(docId)
      .set(
        {
          data,
          updatedAt: new Date().toISOString(),
          updatedBy,
        },
        { merge: true },
      );

    // Read-your-own-writes: the next render waits for the fresh document.
    updateTag(CONTENT_TAG);

    return { ok: true, message: "Saved. The site is up to date." };
  } catch (error) {
    console.error(`[admin] failed to save ${docId}`, error);
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
