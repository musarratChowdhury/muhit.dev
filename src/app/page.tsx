import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ExperienceSection } from "@/components/sections/experience";
import { About } from "@/components/sections/about";

export const metadata: Metadata = pageMetadata({
  title: { absolute: `${site.shortName} — ${site.role}` },
  description: site.description,
  path: "/",
  ogTitle: `${site.shortName} — ${site.role}`,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedProjects />
      <ExperienceSection />
      <About />
    </>
  );
}
