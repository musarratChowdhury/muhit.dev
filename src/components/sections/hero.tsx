import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, FileText, MapPin } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { SocialLinks } from "@/components/ui/social-links";
import { buttonVariants } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-16 lg:pt-20">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10">
          <div>
            <Reveal>
              <Badge>{site.availability}</Badge>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="mt-8 font-mono text-sm text-muted">Hello, I&apos;m</p>
              <h1 className="mt-2 text-[clamp(3.5rem,9vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.055em]">
                <span className="block text-gradient">{site.firstName}</span>
                <span className="block text-gradient-accent">{site.lastName}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted-strong sm:text-xl">
                {site.tagline}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/#work" className={buttonVariants({ size: "lg" })}>
                  View selected work
                  <ArrowDownRight className="size-4" strokeWidth={2} />
                </Link>
                <Link
                  href="/cv"
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  View CV
                  <FileText className="size-4" strokeWidth={1.8} />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <SocialLinks links={site.socials} />
                <span className="hidden h-4 w-px bg-border sm:block" />
                <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
                  <MapPin className="size-3.5 text-accent" strokeWidth={1.8} />
                  {site.location} · {site.timezone}
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.18} className="relative">
            <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[24rem]">
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-[2.5rem] bg-accent/[0.08] blur-3xl"
              />

              <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface card-glow">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/images/portrait.jpg"
                    alt={`Portrait of ${site.name}`}
                    fill
                    preload
                    sizes="(max-width: 1024px) 80vw, 380px"
                    className="object-cover object-top grayscale contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(0,255,153,0.12),transparent_55%)] mix-blend-screen" />
                </div>

                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-border bg-background/70 p-4 backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                        Currently
                      </p>
                      <p className="mt-1 text-sm leading-snug text-foreground">
                        Software Engineer @ Wafi Solutions
                      </p>
                    </div>
                    <span className="relative flex size-2 shrink-0">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                      <span className="relative inline-flex size-2 rounded-full bg-accent" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute -left-5 top-10 animate-float rounded-full border border-border bg-surface/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent shadow-xl backdrop-blur-md sm:-left-8">
                .NET · React
              </div>
              <div className="absolute -right-4 top-1/3 animate-float rounded-full border border-border bg-surface/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground shadow-xl backdrop-blur-md [animation-delay:1.2s] sm:-right-7">
                3.5+ years
              </div>
              <div className="absolute -left-4 bottom-28 animate-float rounded-full border border-border bg-surface/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground shadow-xl backdrop-blur-md [animation-delay:2.1s] sm:-left-7">
                1M+ users
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
