import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";

import { getSiteContent } from "@/lib/content/store";
import { themeToCssText } from "@/lib/theme";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getSiteContent();

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.shortName} — ${site.role}`,
      template: `%s — ${site.shortName}`,
    },
    description: site.description,
    keywords: [
      "Musarrat Chowdhury",
      "software engineer",
      ".NET developer",
      "ASP.NET Core",
      "React developer",
      "full-stack engineer",
      "Dhaka",
      "Bangladesh",
    ],
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: site.url,
      siteName: site.shortName,
      title: `${site.shortName} — ${site.role}`,
      description: site.description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.shortName} — ${site.role}`,
      description: site.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function generateViewport(): Promise<Viewport> {
  const { theme } = await getSiteContent();
  return { themeColor: theme.background, colorScheme: "dark" };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { theme } = await getSiteContent();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sora.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {/* Theme overrides as a rule (not inline styles) so the admin shell's
            `:root:has(.admin-shell)` block can still win on admin pages. */}
        <style dangerouslySetInnerHTML={{ __html: themeToCssText(theme) }} />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
