import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMetadataOptions = {
  title: string | { absolute: string };
  description: string;
  path: string;
  type?: "website" | "article";
  ogTitle?: string;
};

/**
 * Builds consistent page metadata: canonical URL, Open Graph, and Twitter
 * cards. `title` is the document title (the root template appends the name);
 * `ogTitle` can be a fuller social title when needed.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  ogTitle,
}: PageMetadataOptions): Metadata {
  const socialTitle =
    ogTitle ??
    (typeof title === "string" ? `${title} — ${site.shortName}` : title.absolute);

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: new URL(path, site.url).toString(),
      siteName: site.shortName,
      locale: "en_US",
      type,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: socialTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}
