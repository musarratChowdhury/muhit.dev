import "server-only";

import { connection } from "next/server";
import { getDb } from "@/lib/firebase/admin";

/**
 * Every admin write appends one document here, so the site has a trail of who
 * changed what and when. Kept in Firestore next to the content it describes.
 */
export const AUDIT_COLLECTION = "contentAudit";

export type AuditAction = "content.save" | "theme.reset";

export type AuditChange = {
  /** Dotted path inside the section payload, e.g. `theme.accent`. */
  field: string;
  from: string;
  to: string;
};

export type AuditEntry = {
  id: string;
  at: string;
  actorEmail: string;
  action: AuditAction;
  section: string;
  summary: string;
  /** Top-level keys of the section payload that differed. */
  fields: string[];
  changes: AuditChange[];
};

/** Keeps a single entry readable when someone pastes a long array. */
const MAX_CHANGES = 20;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isScalar(value: unknown): value is string | number | boolean {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  );
}

/** Renders any stored value as something readable in a log row. */
export function displayValue(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (isScalar(value)) return String(value);
  if (Array.isArray(value)) {
    return `${value.length} item${value.length === 1 ? "" : "s"}`;
  }
  return "object";
}

/**
 * Top-level keys whose value differs from what was stored.
 *
 * Each editor saves its whole section, so without this every save would look
 * like it touched everything.
 */
export function changedFields(before: unknown, after: unknown): string[] {
  if (!isPlainObject(after)) return [];
  if (!isPlainObject(before)) return Object.keys(after);

  return Object.keys(after).filter(
    (key) => JSON.stringify(before[key]) !== JSON.stringify(after[key]),
  );
}

/**
 * Field-level `from → to` pairs for the scalar values inside a section.
 *
 * Nested objects are walked, so a theme edit reads `theme.accent: #00ff99 →
 * #7c5cff` rather than just `theme`. Arrays and other structures are left to
 * `changedFields` — their contents are not worth a line each.
 */
export function scalarChanges(
  before: unknown,
  after: unknown,
  prefix = "",
): AuditChange[] {
  if (!isPlainObject(after)) return [];

  const changes: AuditChange[] = [];

  for (const key of Object.keys(after)) {
    if (changes.length >= MAX_CHANGES) break;

    const next = after[key];
    const previous = isPlainObject(before) ? before[key] : undefined;
    const field = prefix ? `${prefix}.${key}` : key;

    if (isPlainObject(next)) {
      changes.push(...scalarChanges(previous, next, field));
      continue;
    }

    if (next !== previous && isScalar(next)) {
      changes.push({ field, from: displayValue(previous), to: displayValue(next) });
    }
  }

  return changes.slice(0, MAX_CHANGES);
}

/**
 * Appends an audit entry.
 *
 * Deliberately best-effort: a log that cannot be written must never fail the
 * save it describes, so failures are reported and swallowed.
 */
export async function recordAudit(entry: {
  actorEmail: string;
  action: AuditAction;
  section: string;
  summary: string;
  fields?: string[];
  changes?: AuditChange[];
}): Promise<void> {
  const db = getDb();
  if (!db) return;

  const at = new Date();

  try {
    await db.collection(AUDIT_COLLECTION).add({
      at: at.toISOString(),
      // Stored alongside the ISO string so the collection can be ordered
      // without Firestore having to parse timestamps.
      atMs: at.getTime(),
      actorEmail: entry.actorEmail,
      action: entry.action,
      section: entry.section,
      summary: entry.summary,
      fields: entry.fields ?? [],
      changes: entry.changes ?? [],
    });
  } catch (error) {
    console.error("[audit] could not record entry", error);
  }
}

/** Newest first. Returns an empty list rather than throwing. */
export async function listAudit(limit = 50): Promise<AuditEntry[]> {
  // Firestore's client generates ids with node:crypto at call time, which the
  // prerenderer treats as an unstable value. Reading the log is request-time
  // work, so say so before touching the SDK (same reasoning as getAdminUser).
  await connection();

  const db = getDb();
  if (!db) return [];

  try {
    const snapshot = await db
      .collection(AUDIT_COLLECTION)
      .orderBy("atMs", "desc")
      .limit(limit)
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data() as Partial<AuditEntry>;

      return {
        id: doc.id,
        at: data.at ?? "",
        actorEmail: data.actorEmail ?? "unknown",
        action: data.action === "theme.reset" ? "theme.reset" : "content.save",
        section: data.section ?? "",
        summary: data.summary ?? "",
        fields: Array.isArray(data.fields) ? data.fields : [],
        changes: Array.isArray(data.changes) ? data.changes : [],
      };
    });
  } catch (error) {
    console.error("[audit] could not read entries", error);
    return [];
  }
}
