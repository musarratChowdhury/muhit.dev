import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import type { Experience } from "@/types/content";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { TechPill } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title={
          <>
            A track record of{" "}
            <span className="text-accent">shipping</span>.
          </>
        }
        description="Three and a half years across EdTech products at national scale, enterprise client work, and a lot of self-directed building."
        action={
          <Link
            href="/cv"
            className={buttonVariants({ variant: "outline", size: "md" })}
          >
            Full CV
            <FileText className="size-4" strokeWidth={1.8} />
          </Link>
        }
      />

      <div>
        {experience.map((item, index) => (
          <Reveal key={`${item.company}-${item.period}`} delay={index * 0.06}>
            <div className="grid gap-4 pb-12 last:pb-0 md:grid-cols-[12rem_1fr] md:gap-10">
              <div className="md:pt-1 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  {item.period}
                </p>
                <p className="mt-2 text-sm font-medium text-muted-strong">
                  {item.company}
                </p>
                <p className="mt-1 font-mono text-[10px] text-muted">
                  {item.location}
                </p>
                {item.current ? (
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent-soft px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-accent">
                    <span className="size-1 rounded-full bg-accent" />
                    Current
                  </span>
                ) : null}
              </div>

              <div className="relative border-l border-border pl-6 md:pl-8">
                <span
                  className={
                    item.current
                      ? "absolute -left-[5px] top-1.5 size-2.5 rounded-full border-2 border-background bg-accent shadow-[0_0_12px_rgba(0,255,153,0.7)]"
                      : "absolute -left-[5px] top-1.5 size-2.5 rounded-full border-2 border-background bg-[#3a3a50]"
                  }
                />
                <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {item.role}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                  {item.summary}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {item.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted-strong"
                    >
                      <span className="mt-[0.55rem] size-1 shrink-0 rounded-full bg-accent/80" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {item.tech.map((tech) => (
                    <TechPill key={tech}>{tech}</TechPill>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-border bg-white/[0.02] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">
              Want the short version?
            </p>
            <p className="mt-1 text-sm text-muted">
              The full CV has the details, projects, and certifications in one place.
            </p>
          </div>
          <Link
            href="/cv"
            className={buttonVariants({ variant: "ghost", size: "sm", className: "w-fit" })}
          >
            Open CV
            <ArrowUpRight className="size-4" strokeWidth={1.8} />
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
