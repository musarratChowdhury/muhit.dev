import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { SiteBackground } from "@/components/layout/site-background";
import { getSiteContent } from "@/lib/content/store";

/**
 * Public site chrome. Lives in a route group so `/admin` renders without the
 * marketing navbar, footer or background effects.
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getSiteContent();

  return (
    <>
      <ScrollProgress />
      <SiteBackground />
      <Navbar site={content.site} />
      <main className="flex-1">{children}</main>
      <Footer site={content.site} />
    </>
  );
}
