import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project, ProjectLink } from "@/types/content";
import { cn } from "@/lib/utils";
import { TechPill } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { GithubIcon } from "@/components/icons/brand-icons";

function LinkIcon({ type }: { type: ProjectLink["type"] }) {
  if (type === "github") return <GithubIcon className="size-3.5" />;
  if (type === "live") return <ExternalLink className="size-3.5" strokeWidth={1.8} />;
  return <ArrowUpRight className="size-3.5" strokeWidth={1.8} />;
}

export function ProjectCard({
  project,
  featured = false,
  eager = false,
  className,
}: {
  project: Project;
  featured?: boolean;
  eager?: boolean;
  className?: string;
}) {
  return (
    <SpotlightCard
      className={cn(
        "group relative h-full rounded-3xl border border-border bg-surface/70 transition-colors duration-300 hover:border-accent/30",
        featured && "md:col-span-2",
        className,
      )}
    >
      <article
        className={cn(
          "flex h-full flex-col",
          featured && "md:grid md:grid-cols-[1.08fr_0.92fr]",
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden",
            featured
              ? "aspect-[16/11] md:aspect-auto md:min-h-[24rem]"
              : "aspect-[16/10]",
          )}
        >
          <Image
            src={project.cover}
            alt={project.coverAlt}
            fill
            loading={eager ? "eager" : "lazy"}
            sizes={featured ? "(max-width: 768px) 100vw, 55vw" : "(max-width: 768px) 100vw, 45vw"}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/5 to-transparent" />
          <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
            <span className="rounded-full border border-white/10 bg-background/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground backdrop-blur-md">
              {project.category}
            </span>
            <span className="rounded-full border border-white/10 bg-background/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-strong backdrop-blur-md">
              {project.year}
            </span>
          </div>
        </div>

        <div className={cn("flex flex-1 flex-col p-6", featured && "md:p-8")}>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            {project.subtitle}
          </p>
          <div className="mt-2 flex items-start justify-between gap-4">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">
              <Link
                href={`/projects/${project.slug}`}
                className="after:absolute after:inset-0 after:z-0 after:rounded-3xl after:content-['']"
              >
                {project.title}
              </Link>
            </h3>
            <ArrowUpRight
              className="mt-1 size-5 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              strokeWidth={1.7}
            />
          </div>

          <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">
            {project.summary}
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.slice(0, featured ? 5 : 4).map((tech) => (
              <TechPill key={tech}>{tech}</TechPill>
            ))}
            {project.tech.length > (featured ? 5 : 4) ? (
              <TechPill>+{project.tech.length - (featured ? 5 : 4)}</TechPill>
            ) : null}
          </div>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Case study
            </span>
            <div className="relative z-10 flex flex-wrap items-center gap-2">
              {project.links.length > 0 ? (
                project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] text-muted-strong transition-colors hover:border-accent/40 hover:bg-accent-soft hover:text-accent"
                  >
                    <LinkIcon type={link.type} />
                    {link.label}
                  </a>
                ))
              ) : (
                <span className="font-mono text-[10px] text-muted">Private project</span>
              )}
            </div>
          </div>
        </div>
      </article>
    </SpotlightCard>
  );
}
