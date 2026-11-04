import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.shortName} — ${site.role}`,
    short_name: site.firstName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0f0e1a",
    theme_color: "#0f0e1a",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
