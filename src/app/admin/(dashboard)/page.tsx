import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowUpRight,
  Briefcase,
  FolderKanban,
  GraduationCap,
  MessageSquareQuote,
  Settings2,
  Sparkles,
  ThumbsUp,
} from "lucide-react";
import { getSiteContent } from "@/lib/content/store";
import { Card } from "@/components/admin/ui/card";

export const metadata: Metadata = { title: "Overview" };

export default async function AdminOverviewPage() {
  const content = await getSiteContent();

  const sections = [
    {
      href: "/admin/site",
      icon: Settings2,
      title: "Site & theme",
      description: "Name, tagline, contacts, socials, stats, navigation and colours.",
      count: `${content.site.socials.length} socials · ${content.site.stats.length} stats`,
    },
    {
      href: "/admin/experience",
      icon: Briefcase,
      title: "Experience",
      description: "Roles, periods, highlights and the tech used at each company.",
      count: `${content.experience.length} roles`,
    },
    {
      href: "/admin/projects",
      icon: FolderKanban,
      title: "Projects",
      description: "Case studies, covers, links and metrics shown on /projects.",
      count: `${content.projects.length} projects · ${
        content.projects.filter((project) => project.featured).length
      } featured`,
    },
    {
      href: "/admin/reviews",
      icon: MessageSquareQuote,
      title: "Reviews",
      description: "Client quotes plus the aggregate rating summary.",
      count: `${content.reviews.length} reviews`,
    },
    {
      href: "/admin/recommendations",
      icon: ThumbsUp,
      title: "Recommendations",
      description: "LinkedIn-style recommendations for the auto-rotating carousel.",
      count: `${content.recommendations.length} recommendations`,
    },
    {
      href: "/admin/education",
      icon: GraduationCap,
      title: "Education",
      description: "Degrees, schools and certifications.",
      count: `${content.education.length} degrees · ${content.certifications.length} certificates`,
    },
    {
      href: "/admin/skills",
      icon: Sparkles,
      title: "Skills",
      description: "Skill groups for the about section and the scrolling marquee.",
      count: `${content.skillGroups.length} groups · ${content.techMarquee.length} marquee items`,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="border-b pb-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Overview
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          What do you want to change?
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Every section saves on its own, so an edit here never overwrites another
          page&apos;s work. Changes go live as soon as you save.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((section) => (
          <Link key={section.href} href={section.href} className="group">
            <Card className="h-full gap-3 p-5 transition-colors group-hover:border-primary/40">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <section.icon className="size-4" />
                  </span>
                  <span className="text-sm font-medium">{section.title}</span>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {section.description}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                {section.count}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
