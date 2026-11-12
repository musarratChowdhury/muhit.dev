import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/content/store";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { site } = await getSiteContent();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The admin and the session endpoint are private; keep crawlers out.
      disallow: ["/admin", "/admin/", "/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
