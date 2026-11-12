import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAdminUser } from "@/lib/auth/session";
import { LoginForm } from "@/components/admin/login-form";

export const instant = false;

export const metadata: Metadata = {
  title: "Admin sign-in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const admin = await getAdminUser();
  if (admin) redirect("/admin");

  return (
    <main className="admin-shell flex min-h-svh items-center justify-center px-4 py-16">
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
