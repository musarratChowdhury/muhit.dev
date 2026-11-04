import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SocialLinks } from "@/components/ui/social-links";
import { CopyEmail } from "@/components/ui/copy-email";
import { buttonVariants } from "@/components/ui/button";

async function getCopyrightYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await getCopyrightYear();

  return (
    <footer className="relative overflow-hidden border-t border-border print:hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_100%,black_20%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-56 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[120px]"
      />

      <Container className="relative py-20 sm:py-28">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-accent">
            Let&apos;s talk
          </p>
          <h2 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Have a problem worth solving?
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            I&apos;m always happy to talk about backend architecture, full-stack
            products, or a role where I can own the whole path from API to interface.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={`mailto:${site.email}`} className={buttonVariants({ size: "lg" })}>
              Start a conversation
              <ArrowUpRight className="size-4" strokeWidth={2} />
            </a>
            <CopyEmail className="h-12 px-5 text-sm" />
          </div>
        </Reveal>

        <div className="mt-20 grid gap-10 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg border border-accent/30 bg-accent-soft font-mono text-[11px] font-bold text-accent">
                {site.initials}
              </span>
              <span className="font-mono text-sm text-foreground">
                muhit<span className="text-accent">.dev</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Software engineer in Dhaka, building reliable products with .NET,
              React, and the cloud.
            </p>
            <div className="mt-5 flex items-center gap-2 font-mono text-xs text-muted">
              <span className="size-1.5 rounded-full bg-accent" />
              {site.availability}
            </div>
          </div>

          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Explore
            </p>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Selected work", href: "/#work" },
                { label: "Experience", href: "/#experience" },
                { label: "About", href: "/#about" },
                { label: "All projects", href: "/projects" },
                { label: "CV", href: "/cv" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-strong transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Elsewhere
            </p>
            <SocialLinks links={site.socials} size="sm" />
            <a
              href={`mailto:${site.email}`}
              className="mt-5 block font-mono text-xs text-muted-strong transition-colors hover:text-accent"
            >
              {site.email}
            </a>
            <p className="mt-2 font-mono text-[11px] text-muted">
              {site.location} · {site.timezone}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="font-mono text-[11px]">
            Built with Next.js, Tailwind CSS &amp; Motion.
          </p>
        </div>
      </Container>
    </footer>
  );
}
