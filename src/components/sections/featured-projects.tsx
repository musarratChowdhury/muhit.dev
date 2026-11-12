import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";
import { Section, SectionHeading } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/project-card";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const featured = projects.filter((project) => project.featured);

  return (
    <Section id="work">
      <SectionHeading
        eyebrow="Selected work"
        title={
          <>
            Things I&apos;ve built and{" "}
            <span className="text-accent">shipped</span>.
          </>
        }
        description="A few projects that show the range: enterprise workflow tools, consumer mobile features, real-time systems, and full-stack products."
        action={
          <Link
            href="/projects"
            className={buttonVariants({ variant: "outline", size: "md" })}
          >
            All projects
            <ArrowUpRight className="size-4" strokeWidth={1.8} />
          </Link>
        }
      />

      <div className="grid gap-5 md:grid-cols-2">
        {featured.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            featured={index === 0}
            eager={index === 0}
            className={index === 0 ? "md:col-span-2" : ""}
          />
        ))}

        <Link
          href="/projects"
          className="group relative flex h-full min-h-64 flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface/40 p-6 transition-colors hover:border-accent/30 sm:p-8"
        >
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 size-56 rounded-full bg-accent/[0.07] blur-3xl transition-opacity group-hover:opacity-80"
          />
          <div className="relative">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              The full archive
            </p>
            <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
              {projects.length} projects, one place.
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
              Games, AI experiments, desktop tools, and the rest of the things
              I&apos;ve shipped.
            </p>
          </div>
          <span className="relative mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-accent">
            Browse all projects
            <ArrowUpRight
              className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </span>
        </Link>
      </div>
    </Section>
  );
}
