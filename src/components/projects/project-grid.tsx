"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/types/content";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/projects/project-card";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>("All");

  const categories = useMemo(
    () => ["All", ...new Set(projects.map((project) => project.category))],
    [projects],
  );

  const counts = useMemo(() => {
    return categories.reduce<Record<string, number>>((acc, category) => {
      acc[category] =
        category === "All"
          ? projects.length
          : projects.filter((project) => project.category === category).length;
      return acc;
    }, {});
  }, [categories, projects]);

  const filtered = useMemo(() => {
    return active === "All"
      ? projects
      : projects.filter((project) => project.category === active);
  }, [active, projects]);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {categories.map((category) => {
          const isActive = active === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={isActive}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors",
                isActive
                  ? "border-accent/40 bg-accent-soft text-accent"
                  : "border-border bg-white/[0.02] text-muted-strong hover:border-accent/30 hover:text-foreground",
              )}
            >
              {category}
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[9px]",
                  isActive ? "bg-accent/15 text-accent" : "bg-white/[0.04] text-muted",
                )}
              >
                {counts[category]}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {filtered.map((project, index) => (
          <ProjectCard key={project.slug} project={project} eager={index === 0} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 rounded-2xl border border-border bg-surface/70 p-8 text-center text-sm text-muted">
          Nothing in this category yet.
        </p>
      ) : null}
    </div>
  );
}
