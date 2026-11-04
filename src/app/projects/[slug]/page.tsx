import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { GithubIcon } from "@/components/icons/brand-icons";
import { getProject, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Badge, TechPill } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    type: "article",
    ogTitle: `${project.title} — ${project.subtitle}`,
  });
}

export default function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  return (
    <Suspense fallback={<ProjectSkeleton />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

function ProjectSkeleton() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="h-3 w-28 animate-pulse rounded-full bg-white/[0.06]" />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
        <div className="space-y-4">
          <div className="h-4 w-32 animate-pulse rounded-full bg-white/[0.06]" />
          <div className="h-12 w-2/3 animate-pulse rounded-2xl bg-white/[0.06]" />
          <div className="h-4 w-1/2 animate-pulse rounded-full bg-white/[0.04]" />
        </div>
        <div className="h-56 animate-pulse rounded-3xl bg-white/[0.03]" />
      </div>
    </Container>
  );
}

async function ProjectContent({
  params,
}: Pick<PageProps<"/projects/[slug]">, "params">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(index + 1) % projects.length];

  return (
    <Container className="py-14 sm:py-20">
      <Reveal>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-3.5" strokeWidth={1.8} />
          All projects
        </Link>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
        <Reveal delay={0.05}>
          <Badge>
            {project.category} · {project.year}
          </Badge>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="mt-3 text-lg text-accent sm:text-xl">{project.subtitle}</p>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {project.summary}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
                className={buttonVariants({
                  variant: link.type === "live" ? "primary" : "outline",
                  size: "sm",
                })}
              >
                {link.type === "github" ? (
                  <GithubIcon className="size-4" />
                ) : link.type === "live" ? (
                  <ExternalLink className="size-4" strokeWidth={1.8} />
                ) : (
                  <ArrowUpRight className="size-4" strokeWidth={1.8} />
                )}
                {link.label}
              </a>
            ))}
            {project.links.length === 0 ? (
              <span className="inline-flex items-center rounded-full border border-border bg-white/[0.02] px-4 py-2.5 font-mono text-xs text-muted">
                Private project
              </span>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-border bg-surface/70 p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              At a glance
            </p>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex items-start justify-between gap-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  Role
                </dt>
                <dd className="text-right text-foreground">{project.role}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  Year
                </dt>
                <dd className="text-right text-foreground">{project.year}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  Type
                </dt>
                <dd className="text-right text-foreground">{project.category}</dd>
              </div>
            </dl>

            <div className="mt-5 border-t border-border pt-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                Stack
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <TechPill key={tech}>{tech}</TechPill>
                ))}
              </div>
            </div>

            {project.note ? (
              <p className="mt-5 border-t border-border pt-5 text-xs leading-relaxed text-muted">
                {project.note}
              </p>
            ) : null}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.12}>
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-border bg-surface sm:mt-14">
          <Image
            src={project.cover}
            alt={project.coverAlt}
            fill
            preload
            sizes="(max-width: 1024px) 100vw, 1100px"
            className="object-cover"
          />
        </div>
      </Reveal>

      <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
        <Reveal delay={0.05}>
          <div className="space-y-5">
            {project.description.map((paragraph) => (
              <p
                key={paragraph}
                className="text-pretty text-base leading-relaxed text-muted-strong"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-border bg-surface/70 p-6 sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              What I worked on
            </p>
            <ul className="mt-5 space-y-3">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted-strong"
                >
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-accent"
                    strokeWidth={1.8}
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-3">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-border bg-surface/70 p-5"
              >
                <p className="text-3xl font-semibold tracking-tight text-foreground">
                  {metric.value}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.08}>
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group mt-14 flex flex-col gap-3 rounded-3xl border border-border bg-surface/70 p-6 transition-colors hover:border-accent/30 sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Next project
            </p>
            <p className="mt-2 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
              {nextProject.title}
            </p>
            <p className="mt-1 text-sm text-muted">{nextProject.subtitle}</p>
          </div>
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-white/[0.02] text-muted-strong transition-all group-hover:border-accent/40 group-hover:bg-accent-soft group-hover:text-accent">
            <ArrowUpRight className="size-5" strokeWidth={1.8} />
          </span>
        </Link>
      </Reveal>
    </Container>
  );
}
