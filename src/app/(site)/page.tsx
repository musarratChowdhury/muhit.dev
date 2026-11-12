import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { getSiteContent } from "@/lib/content/store";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ExperienceSection } from "@/components/sections/experience";
import { Testimonials } from "@/components/sections/testimonials";
import { Recommendations } from "@/components/sections/recommendations";
import { About } from "@/components/sections/about";

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getSiteContent();

  return pageMetadata({
    title: { absolute: `${site.shortName} — ${site.role}` },
    description: site.description,
    path: "/",
    ogTitle: `${site.shortName} — ${site.role}`,
    siteName: site.shortName,
    baseUrl: site.url,
  });
}

export default async function HomePage() {
  const content = await getSiteContent();

  return (
    <>
      <Hero site={content.site} />
      <Stats stats={content.site.stats} />
      <FeaturedProjects projects={content.projects} />
      <ExperienceSection experience={content.experience} />
      <Testimonials reviews={content.reviews} summary={content.reviewSummary} />
      <Recommendations recommendations={content.recommendations} />
      <About
        site={content.site}
        education={content.education}
        certifications={content.certifications}
        skillGroups={content.skillGroups}
        techMarquee={content.techMarquee}
      />
    </>
  );
}
