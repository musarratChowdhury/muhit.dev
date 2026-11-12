import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "@/components/admin/login-form";
import { SignedInRedirect } from "@/components/admin/signed-in-redirect";

export const metadata: Metadata = {
  title: "Admin sign-in",
  robots: { index: false, follow: false },
};

/**
 * This page is deliberately static.
 *
 * It used to read the session cookie to bounce an already-signed-in admin to
 * `/admin`. With Cache Components that read is request-time work, so the route
 * prerendered to an *empty* shell (`response: "empty"` in the prerender
 * manifest) and the hosting platform served that blank shell as the page.
 * The signed-in case is now handled on the client by <SignedInRedirect />,
 * which keeps this route fully prerenderable.
 */
export default function AdminLoginPage() {
  return (
    <main className="admin-shell flex min-h-svh items-center justify-center px-4 py-16">
      <SignedInRedirect />

      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back to site
        </Link>

        <div className="mt-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            muhit.dev
          </p>
          <h1 className="mt-2 text-xl font-semibold tracking-tight">
            Sign in to manage the site
          </h1>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Content edits, projects and reviews all live here.
          </p>

          <div className="mt-6">
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
