import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Mail, MapPin } from "lucide-react";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { SocialLinks } from "@/components/ui/social-links";
import { CopyEmail } from "@/components/ui/copy-email";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Musarrat Chowdhury about software engineering roles, backend architecture, or full-stack product work.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="py-14 sm:py-20">
      <Reveal>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-3.5" strokeWidth={1.8} />
          Back home
        </Link>
      </Reveal>

      <div className="mt-10 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Reveal delay={0.05}>
            <Badge>Let&apos;s talk</Badge>
            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Let&apos;s build something{" "}
              <span className="text-accent">that holds up</span>.
            </h1>
            <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Whether it&apos;s a role, a product idea, or a backend problem that
              needs untangling — I&apos;d like to hear about it.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-9 space-y-3">
              <a
                href={`mailto:${site.email}`}
                className="group flex items-center gap-3 rounded-2xl border border-border bg-surface/70 p-4 transition-colors hover:border-accent/30"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Mail className="size-4" strokeWidth={1.8} />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    Email
                  </span>
                  <span className="mt-0.5 block truncate text-sm text-foreground transition-colors group-hover:text-accent">
                    {site.email}
                  </span>
                </span>
              </a>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface/70 p-4">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-white/[0.03] text-accent">
                    <MapPin className="size-4" strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                      Location
                    </span>
                    <span className="mt-0.5 block text-sm text-foreground">
                      {site.location}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface/70 p-4">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-white/[0.03] text-accent">
                    <Clock className="size-4" strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                      Timezone
                    </span>
                    <span className="mt-0.5 block text-sm text-foreground">
                      {site.timezone}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <CopyEmail label="Copy email address" />
              <SocialLinks links={site.socials} size="sm" />
            </div>

            <div className="mt-10 rounded-2xl border border-border bg-white/[0.02] p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                Good to know
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-strong">
                I usually reply within a day. For role conversations, the{" "}
                <Link href="/cv" className="text-accent underline underline-offset-4">
                  CV
                </Link>{" "}
                has the full context; for project work, a short note about the
                problem is more useful than a long brief.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="rounded-3xl border border-border bg-surface/70 p-6 sm:p-8">
            <div className="mb-7 flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  Send a note
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Tell me about it
                </h2>
              </div>
              <span className="hidden size-10 items-center justify-center rounded-full border border-accent/20 bg-accent-soft text-accent sm:flex">
                <Mail className="size-4" strokeWidth={1.8} />
              </span>
            </div>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
