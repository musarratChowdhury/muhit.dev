"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  GoogleAuthProvider,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  type User,
} from "firebase/auth";
import { Loader2 } from "lucide-react";
import { getClientAuth, isClientFirebaseConfigured } from "@/lib/firebase/client";
import { Button } from "@/components/admin/ui/button";
import { GoogleIcon } from "@/components/icons/brand-icons";

/**
 * Popup sign-in covers every normal browser. These codes mean the popup could
 * not run at all (Safari's cookie partitioning, an in-app browser, a hard
 * blocker), and the only way forward is a full-page redirect.
 */
const POPUP_UNAVAILABLE = new Set([
  "auth/popup-blocked",
  "auth/operation-not-supported-in-this-environment",
  "auth/web-storage-unsupported",
]);

/** The user closed the window themselves — not worth an error banner. */
const CANCELLED = new Set(["auth/popup-closed-by-user", "auth/cancelled-popup-request"]);

function errorCode(caught: unknown): string {
  return caught && typeof caught === "object" && "code" in caught
    ? String((caught as { code: unknown }).code)
    : "";
}

/** Maps Firebase's terse error codes onto something a human can act on. */
function messageFor(code: string): string {
  switch (code) {
    case "auth/unauthorized-domain":
      return "This domain isn't authorised for sign-in in the Firebase project.";
    case "auth/operation-not-allowed":
      return "Google sign-in isn't enabled in the Firebase project yet.";
    case "auth/account-exists-with-different-credential":
      return "That email already has a different sign-in method. Remove the password account for it in Firebase Auth, then try again.";
    case "auth/too-many-requests":
      return "Too many attempts. Wait a minute and try again.";
    case "auth/network-request-failed":
      return "Can't reach Firebase. Check your connection.";
    case "auth/internal-error":
      return "Firebase returned an internal error. Try again.";
    case "auth/user-disabled":
      return "That Google account is disabled for this project.";
    default:
      return "Sign-in failed. Try again.";
  }
}

function googleProvider(): GoogleAuthProvider {
  const provider = new GoogleAuthProvider();
  // Without this the browser's ambient Google session is used silently, so a
  // second account signed in on the same machine produces a confusing 403.
  provider.setCustomParameters({ prompt: "select_account" });
  return provider;
}

export function LoginForm() {
  const router = useRouter();
  const [phase, setPhase] = React.useState<
    "idle" | "starting" | "redirecting" | "finishing"
  >("idle");
  const [error, setError] = React.useState<string | null>(null);

  const configured = isClientFirebaseConfigured();

  /**
   * Trades the Firebase user for the httpOnly session cookie.
   *
   * Returns an error message, or `null` on success. A rejected account is
   * signed out of Firebase on the client too: the cookie is the only thing that
   * grants access, so leaving the Firebase session alive just means the next
   * attempt silently reuses an account that is already known to be refused.
   */
  const completeSignIn = React.useCallback(
    async (user: User): Promise<string | null> => {
      const idToken = await user.getIdToken();

      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (response.ok) return null;

      const body = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;
      // `getClientAuth()` is the same singleton the credential came from.
      await signOut(getClientAuth()).catch(() => {});

      // Naming the account matters: the usual failure is being signed into the
      // wrong Google account, which the server's generic message hides.
      if (response.status === 403) {
        return `${user.email ?? "That account"} isn't allowed to manage this site.`;
      }
      return body?.error ?? `Sign-in failed (${response.status}).`;
    },
    [],
  );

  /** Finish a sign-in that came back from the redirect fallback. */
  React.useEffect(() => {
    if (!configured) return;

    let cancelled = false;

    (async () => {
      try {
        const result = await getRedirectResult(getClientAuth());
        if (!result?.user || cancelled) return;

        setPhase("finishing");
        const failure = await completeSignIn(result.user);
        if (cancelled) return;

        if (failure) {
          setError(failure);
          setPhase("idle");
          return;
        }

        router.replace("/admin");
        router.refresh();
      } catch (caught) {
        if (cancelled) return;
        setError(messageFor(errorCode(caught)));
        setPhase("idle");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [configured, completeSignIn, router]);

  async function handleGoogle() {
    setError(null);
    setPhase("starting");

    const auth = getClientAuth();

    try {
      const credential = await signInWithPopup(auth, googleProvider());
      setPhase("finishing");

      const failure = await completeSignIn(credential.user);
      if (failure) {
        setError(failure);
        setPhase("idle");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch (caught) {
      const code = errorCode(caught);

      if (CANCELLED.has(code)) {
        setPhase("idle");
        return;
      }

      if (POPUP_UNAVAILABLE.has(code)) {
        // The page navigates away; on the way back the effect above picks the
        // credential up from getRedirectResult() and finishes the exchange.
        setPhase("redirecting");
        signInWithRedirect(auth, googleProvider()).catch((redirectCaught) => {
          setError(messageFor(errorCode(redirectCaught)));
          setPhase("idle");
        });
        return;
      }

      setError(messageFor(code));
      setPhase("idle");
    }
  }

  if (!configured) {
    return (
      <p className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground">
        Admin sign-in isn&apos;t configured on this deployment yet. The{" "}
        <code className="font-mono text-xs">NEXT_PUBLIC_FIREBASE_*</code>{" "}
        environment variables are missing.
      </p>
    );
  }

  const pending = phase !== "idle";

  return (
    <div className="space-y-5">
      <Button
        type="button"
        variant="outline"
        onClick={handleGoogle}
        disabled={pending}
        className="w-full gap-2"
      >
        {pending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <GoogleIcon className="size-4" />
        )}
        {phase === "finishing"
          ? "Finishing sign-in…"
          : phase === "redirecting"
            ? "Redirecting to Google…"
            : phase === "starting"
              ? "Opening Google…"
              : "Continue with Google"}
      </Button>

      {error ? (
        <p
          role="alert"
          className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-foreground"
        >
          {error}
        </p>
      ) : null}

      <p className="text-center text-xs leading-relaxed text-muted-foreground">
        Only allow-listed accounts can edit the site.
      </p>
    </div>
  );
}
