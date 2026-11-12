import * as React from "react";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/session";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Toaster } from "@/components/admin/ui/sonner";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * The session read is request-time work, so it can't be part of the prerendered
 * shell. Rather than letting the whole route prerender to an *empty* shell
 * (`response: "empty"` — which the hosting platform will happily serve as a
 * blank page), the shell renders the skeleton below and the real chrome streams
 * in behind <Suspense>.
 */
export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-shell min-h-svh bg-background text-foreground">
      <React.Suspense fallback={<AdminShellSkeleton />}>
        <AdminGate>{children}</AdminGate>
      </React.Suspense>
      <Toaster />
    </div>
  );
}

/**
 * `children` is passed *into* this component on purpose: it only renders once
 * `requireAdmin()` has resolved, so an unauthorised request is redirected
 * before any page content is rendered.
 */
async function AdminGate({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  return (
    <div className="lg:flex">
      <AdminSidebar email={admin.email} />
      <div className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          {children}
        </div>
      </div>
    </div>
  );
}

function AdminShellSkeleton() {
  return (
    <div className="lg:flex" aria-busy="true" aria-live="polite">
      <div className="w-full shrink-0 border-b bg-card lg:h-svh lg:w-64 lg:border-r lg:border-b-0" />
      <div className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Checking your session…
          </p>
        </div>
      </div>
    </div>
  );
}
