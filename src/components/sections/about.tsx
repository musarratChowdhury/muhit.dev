import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Sparkles } from "lucide-react";
import { site } from "@/content/site";
import { education, certifications } from "@/content/education";
import { skillGroups, techMarquee } from "@/content/skills";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { TechPill } from "@/components/ui/badge";
import { Marquee } from "@/components/ui/marquee";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About"
        title={
          <>
            Backend bias,{" "}
            <span className="text-accent">full-stack</span> range.
          </>
        }
        description="I like the part of the job where a messy requirement becomes a clean data model, a predictable API, and an interface that feels obvious."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <SpotlightCard className="rounded-3xl border border-border bg-surface/70 p-6 sm:p-8 lg:col-span-2">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            <span className="size-1.5 rounded-full bg-accent" />
            About me
          </div>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-strong sm:text-lg">
            {site.summary}
          </p>
          <div className="mt-7 grid gap-5 border-t border-border pt-6 sm:grid-cols-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                Based in
              </p>
              <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-foreground">
                <MapPin className="size-3.5 text-accent" strokeWidth={1.8} />
                {site.location}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                Languages
              </p>
              <p className="mt-1.5 text-sm text-foreground">
                English · Bangla
              </p>
              <p className="mt-0.5 font-mono text-[10px] text-muted">IELTS 7.0</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                Email
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-accent"
              >
                <Mail className="size-3.5 text-accent" strokeWidth={1.8} />
                Say hello
              </a>
            </div>
          </div>
        </SpotlightCard>

        <SpotlightCard className="rounded-3xl border border-border bg-surface/70 p-6 sm:p-8">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            <Sparkles className="size-3.5" strokeWidth={1.8} />
            Currently
          </div>
          <ul className="mt-5 space-y-4">
            {site.currently.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed text-muted-strong"
              >
                <span className="mt-[0.55rem] size-1 shrink-0 rounded-full bg-accent/80" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-7 border-t border-border pt-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Availability
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              {site.availability}
            </p>
          </div>
        </SpotlightCard>

        <div className="rounded-3xl border border-border bg-surface/70 p-6 sm:p-8 lg:col-span-2">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              How I work
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent"
            >
              Let&apos;s talk
              <ArrowUpRight className="size-3.5" strokeWidth={1.8} />
            </Link>
          </div>
          <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {site.principles.map((principle, index) => (
              <div key={principle.title}>
                <p className="font-mono text-[10px] text-muted">
                  0{index + 1}
                </p>
                <h3 className="mt-1.5 text-base font-medium text-foreground">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-surface/70 p-6 sm:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            Education
          </p>
          <div className="mt-5 space-y-5">
            {education.map((item) => (
              <div key={item.degree}>
                <p className="text-sm font-medium leading-snug text-foreground">
                  {item.degree}
                </p>
                <p className="mt-1 text-sm text-muted-strong">{item.school}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2 font-mono text-[10px] text-muted">
                  <span>{item.period}</span>
                  {item.status ? (
                    <span className="rounded-full border border-accent/25 bg-accent-soft px-2 py-0.5 text-accent">
                      {item.status}
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 font-mono text-[10px] text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Reveal delay={0.08}>
        <div className="mt-5 overflow-hidden rounded-3xl border border-border bg-surface/70 p-6 sm:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                Toolbox
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">
                The stack I reach for
              </h3>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Deep in the .NET ecosystem, comfortable across the frontend, and
              increasingly interested in AI systems and developer tooling.
            </p>
          </div>

          <Marquee items={techMarquee} className="mt-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]" />

          <div className="mt-6 grid gap-x-8 gap-y-6 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  {group.title}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <TechPill key={item}>{item}</TechPill>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-surface/70 p-6 sm:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            Certifications
          </p>
          <ul className="mt-4 divide-y divide-border">
            {certifications.map((certification) => (
              <li
                key={`${certification.name}-${certification.issuer}`}
                className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="text-sm text-foreground">{certification.name}</p>
                  <p className="mt-0.5 font-mono text-[10px] text-muted">
                    {certification.issuer}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[10px] text-muted">
                  {certification.year}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-between rounded-3xl border border-border bg-surface/70 p-6 sm:p-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              Beyond the code
            </p>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-strong">
              I got here through browser games and freelance JavaScript work, and
              I still like building small things for the joy of it. Chess, canvas
              experiments, AI tooling, and the occasional desktop utility.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Chess", "Game dev", "AI tooling", "Side projects"].map((item) => (
              <TechPill key={item}>{item}</TechPill>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
