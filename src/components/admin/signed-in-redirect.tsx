"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

/**
 * Bounces an already-signed-in admin to the dashboard.
 *
 * This lives on the client so the login page itself stays a fully static route.
 * Reading the session on the server turned the whole page into an empty
 * prerendered shell, which the host served as a blank page.
 *
 * It asks the session endpoint rather than watching Firebase's client auth on
 * purpose: signing out only clears the httpOnly session cookie, so Firebase's
 * client session can outlive it. Trusting that would bounce the user back into
 * `/admin`, which redirects to `/admin/login`, and so on.
 */
export function SignedInRedirect() {
  const router = useRouter();

  React.useEffect(() => {
    let cancelled = false;

    fetch("/api/auth/session", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((body: { ok?: boolean } | null) => {
        if (!cancelled && body?.ok) {
          router.replace("/admin");
          router.refresh();
        }
      })
      .catch(() => {
        // Offline or the endpoint is down: the form below still works.
      });

    return () => {
      cancelled = true;
    };
  }, [router]);

  return null;
}
