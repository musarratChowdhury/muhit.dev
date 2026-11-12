import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { pageMetadata } from "@/lib/metadata";
import { getSiteContent } from "@/lib/content/store";
import { Container } from "@/components/ui/container";
import { CVPrintButton } from "@/components/cv/print-button";

export const metadata: Metadata = pageMetadata({
  title: "CV",
  description:
    "Curriculum vitae for Md. Musarrat Hossain Chowdhury — software engineer specializing in .NET, React, and cloud-native systems.",
  path: "/cv",
});

export default async function CVPage() {
  const content = await getSiteContent();
  const { site } = content;

  const github = site.socials.find((social) => social.icon === "github");
  const linkedin = site.socials.find((social) => social.icon === "linkedin");

  return (
    <div className="print:bg-white">
      <Container className="max-w-4xl py-12 sm:py-16 print:max-w-none print:py-0">
        <div className="no-print flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="size-3.5" strokeWidth={1.8} />
            Back home
          </Link>
          <CVPrintButton />
        </div>

        <article className="mt-8 rounded-3xl border border-border bg-surface/70 p-6 sm:p-10 print:mt-0 print:rounded-none print:border-0 print:bg-white print:p-0 print:text-black">
          <header className="border-b border-border pb-8 print:border-neutral-300">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent print:text-neutral-600">
              Curriculum vitae
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl print:text-black">
              {site.name}
            </h1>
            <p className="mt-2 text-base text-muted-strong print:text-neutral-700">
              {site.role} · Full-stack engineer
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted print:text-neutral-700">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-accent print:text-neutral-700"
              >
                <Mail className="size-3.5" strokeWidth={1.8} />
                {site.email}
              </a>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5" strokeWidth={1.8} />
                {site.location}
              </span>
              {github ? (
                <a
                  href={github.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-accent print:text-neutral-700"
                >
                  <GithubIcon className="size-3.5" />
                  {github.handle?.replace(/^@/, "") ?? github.label}
                </a>
              ) : null}
              {linkedin ? (
                <a
                  href={linkedin.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-accent print:text-neutral-700"
                >
                  <LinkedinIcon className="size-3.5" />
                  {linkedin.handle ?? linkedin.label}
                </a>
              ) : null}
            </div>
          </header>

          <section className="mt-8">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent print:text-neutral-600">
              Profile
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-strong print:text-neutral-800">
              {site.summary}
            </p>
          </section>

          <section className="mt-8">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent print:text-neutral-600">
              Experience
            </h2>
            <div className="mt-4 space-y-6">
              {content.experience.map((item) => (
                <div key={`${item.company}-${item.period}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-sm font-semibold text-foreground print:text-black">
                      {item.role} · {item.company}
                    </h3>
                    <span className="font-mono text-[10px] text-muted print:text-neutral-600">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted print:text-neutral-700">
                    {item.summary}
                  </p>
                  <ul className="mt-2.5 space-y-1.5">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-sm leading-relaxed text-muted-strong print:text-neutral-800"
                      >
                        <span className="mt-[0.55rem] size-1 shrink-0 rounded-full bg-accent print:bg-neutral-500" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent print:text-neutral-600">
              Selected projects
            </h2>
            <div className="mt-4 space-y-4">
              {content.projects.filter((project) => project.featured).slice(0, 3).map((project) => (
                <div key={project.slug}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-sm font-semibold text-foreground print:text-black">
                      {project.title}
                    </h3>
                    <span className="font-mono text-[10px] text-muted print:text-neutral-600">
                      {project.year}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-strong print:text-neutral-800">
                    {project.summary}
                  </p>
                  <p className="mt-1 font-mono text-[10px] text-muted print:text-neutral-600">
                    {project.tech.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent print:text-neutral-600">
              Skills
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 print:grid-cols-2">
              {content.skillGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-xs font-semibold text-foreground print:text-black">
                    {group.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted print:text-neutral-700">
                    {group.items.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent print:text-neutral-600">
              Education
            </h2>
            <div className="mt-4 space-y-4">
              {content.education.map((item) => (
                <div key={item.degree}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-sm font-semibold text-foreground print:text-black">
                      {item.degree}
                    </h3>
                    <span className="font-mono text-[10px] text-muted print:text-neutral-600">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-strong print:text-neutral-800">
                    {item.school} — {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent print:text-neutral-600">
              Certifications
            </h2>
            <div className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2 print:grid-cols-2">
              {content.certifications.map((certification) => (
                <div
                  key={`${certification.name}-${certification.issuer}`}
                  className="flex items-baseline justify-between gap-3 border-b border-border py-2 print:border-neutral-200"
                >
                  <div>
                    <p className="text-sm text-foreground print:text-black">
                      {certification.name}
                    </p>
                    <p className="font-mono text-[10px] text-muted print:text-neutral-600">
                      {certification.issuer}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-muted print:text-neutral-600">
                    {certification.year}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </article>
      </Container>
    </div>
  );
}
