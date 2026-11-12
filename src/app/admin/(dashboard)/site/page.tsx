import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content/store";
import { defaultTheme } from "@/lib/content/defaults";
import { SiteEditor } from "@/components/admin/editors/site-editor";

export const metadata: Metadata = { title: "Site & theme" };

export default async function AdminSitePage() {
  const { site, theme } = await getSiteContent();

  // Passed from the server so the client bundle never has to carry the whole
  // defaults module just for seven colour strings.
  return <SiteEditor initialSite={site} initialTheme={theme} defaults={defaultTheme} />;
}
