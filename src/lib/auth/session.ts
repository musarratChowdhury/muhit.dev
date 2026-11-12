import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { getAdminAuth } from "@/lib/firebase/admin";

export const SESSION_COOKIE = "muhit_admin_session";

/** Session cookie lifetime. Firebase caps this at 14 days. */
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 5;

export type AdminUser = {
  uid: string;
  email: string;
  name?: string;
};

/**
 * The allow-list of admin emails, from `ADMIN_EMAILS` (comma separated).
 * Falls back to the owner account so a fresh checkout still works.
 */
export function adminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS ?? "muhitlopez143@gmail.com";
  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  return adminEmails().includes(email.toLowerCase());
}

/**
 * Resolves the signed-in admin from the session cookie.
 *
 * `verifySessionCookie` also checks the cookie's signature and expiry; the
 * email allow-list check is what actually authorises the user, because the
 * Firebase project is shared with other apps.
 *
 * The `connection()` call is required, not defensive: verifying a session cookie
 * reads the clock (token expiry, signing-key cache freshness), which Next treats
 * as synchronous IO. With `cacheComponents` + `partialPrefetching` a render is
 * staged, and sync IO is an error in every stage except the dynamic one, so
 * without it the admin layout fails with "Next.js encountered the unstable value
 * `Date.now()` while prerendering". Awaiting `connection()` makes the read
 * request-time work, which it always was.
 */
export async function getAdminUser(): Promise<AdminUser | null> {
  await connection();

  const auth = getAdminAuth();
  if (!auth) return null;

  const cookie = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!cookie) return null;

  try {
    const decoded = await auth.verifySessionCookie(cookie, false);
    if (!isAdminEmail(decoded.email)) return null;

    return {
      uid: decoded.uid,
      email: decoded.email ?? "",
      name: decoded.name,
    };
  } catch {
    return null;
  }
}

/** Use at the top of every protected page, layout and server action. */
export async function requireAdmin(): Promise<AdminUser> {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return user;
}
