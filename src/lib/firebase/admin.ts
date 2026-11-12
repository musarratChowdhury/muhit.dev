import "server-only";

import { readFileSync } from "node:fs";
import {
  cert,
  getApps,
  initializeApp,
  type App,
  type ServiceAccount,
} from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

const ADMIN_APP_NAME = "muhit-admin";

type RawServiceAccount = {
  project_id?: string;
  client_email?: string;
  private_key?: string;
};

/**
 * Credentials come from an environment variable, never from the repo.
 *
 * - `FIREBASE_SERVICE_ACCOUNT` — the service-account JSON as a single string
 *   (what you set on the hosting provider).
 * - `FIREBASE_SERVICE_ACCOUNT_PATH` — a path to the JSON file (local dev only).
 */
function readServiceAccount(): ServiceAccount | null {
  const inline = process.env.FIREBASE_SERVICE_ACCOUNT?.trim();

  if (inline?.startsWith("{")) {
    try {
      return toServiceAccount(JSON.parse(inline) as RawServiceAccount);
    } catch {
      return null;
    }
  }

  const path = process.env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim();
  if (!path) return null;

  try {
    const raw = readFileSync(path, "utf8");
    return toServiceAccount(JSON.parse(raw) as RawServiceAccount);
  } catch {
    return null;
  }
}

function toServiceAccount(raw: RawServiceAccount): ServiceAccount | null {
  if (!raw.project_id || !raw.client_email || !raw.private_key) return null;

  return {
    projectId: raw.project_id,
    clientEmail: raw.client_email,
    // Env vars often carry the key with literal \n sequences.
    privateKey: raw.private_key.replace(/\\n/g, "\n"),
  };
}

/**
 * The Admin SDK app, or `null` when no credentials are configured.
 *
 * Returning `null` instead of throwing is deliberate: the public site falls
 * back to the TypeScript content, so a build without secrets still succeeds.
 */
export function getAdminApp(): App | null {
  const existing = getApps().find((app) => app.name === ADMIN_APP_NAME);
  if (existing) return existing;

  const credentials = readServiceAccount();
  if (!credentials) return null;

  try {
    return initializeApp({ credential: cert(credentials) }, ADMIN_APP_NAME);
  } catch {
    return null;
  }
}

export function getDb(): Firestore | null {
  const app = getAdminApp();
  return app ? getFirestore(app) : null;
}

export function getAdminAuth(): Auth | null {
  const app = getAdminApp();
  return app ? getAuth(app) : null;
}

export function isFirebaseConfigured(): boolean {
  return getAdminApp() !== null;
}

export const FIREBASE_PROJECT_ID =
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "solo-leveling-57b68";
