import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { getSiteContent } from "@/lib/content/store";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { ProjectGrid } from "@/components/projects/project-grid";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Selected software projects by Musarrat Chowdhury — enterprise APIs, mobile features at national scale, real-time systems, and AI tooling.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const { projects } = await getSiteContent();

  const years = projects.map((project) => Number(project.year)).filter(Number.isFinite);
  const range =
    years.length > 0 ? `${Math.min(...years)}—${Math.max(...years)}` : "";

  return (
    <Container className="py-14 sm:py-20">
      <Reveal>
        <Badge>
          {projects.length} projects{range ? ` · ${range}` : ""}
        </Badge>
        <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          A broader look at what I&apos;ve{" "}
          <span className="text-accent">built</span>.
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
          Enterprise workflow tools, a feature used by a million students,
          real-time systems, AI experiments, and a few things built purely
          because they were fun.
        </p>
      </Reveal>

      <div className="mt-10">
        <ProjectGrid projects={projects} />
      </div>
    </Container>
  );
}
