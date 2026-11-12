import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminAuth } from "@/lib/firebase/admin";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  isAdminEmail,
} from "@/lib/auth/session";

/**
 * Exchanges a Firebase ID token for an httpOnly session cookie.
 *
 * The token is verified server-side and the email is checked against the
 * allow-list, so knowing the password for some other account in the shared
 * Firebase project is not enough to get in.
 */
export async function POST(request: Request) {
  const auth = getAdminAuth();
  if (!auth) {
    return NextResponse.json(
      { error: "Firebase is not configured on the server." },
      { status: 500 },
    );
  }

  let idToken: string | undefined;
  try {
    const body = (await request.json()) as { idToken?: string };
    idToken = body.idToken;
  } catch {
    // fall through to the validation below
  }

  if (!idToken) {
    return NextResponse.json({ error: "Missing idToken." }, { status: 400 });
  }

  try {
    const decoded = await auth.verifyIdToken(idToken);

    if (!isAdminEmail(decoded.email)) {
      return NextResponse.json(
        { error: "That account is not allowed to manage this site." },
        { status: 403 },
      );
    }

    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: SESSION_MAX_AGE_SECONDS * 1000,
    });

    const jar = await cookies();
    jar.set(SESSION_COOKIE, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    });

    return NextResponse.json({ ok: true, email: decoded.email });
  } catch {
    return NextResponse.json(
      { error: "Could not verify that sign-in. Try again." },
      { status: 401 },
    );
  }
}

/** Sign out: drop the cookie. */
export async function DELETE() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}
