import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content/store";
import { SiteEditor } from "@/components/admin/editors/site-editor";

export const metadata: Metadata = { title: "Site & theme" };

export default async function AdminSitePage() {
  const { site, theme } = await getSiteContent();

  return <SiteEditor initialSite={site} initialTheme={theme} />;
}
