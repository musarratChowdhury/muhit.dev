import * as React from "react";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/session";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Toaster } from "@/components/admin/ui/sonner";

export const instant = false;

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();

  return (
    <div className="admin-shell min-h-svh bg-background text-foreground">
      <div className="lg:flex">
        <AdminSidebar email={admin.email} />
        <div className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
            {children}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
