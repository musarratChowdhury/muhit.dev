import Link from "next/link";
import { ArrowUpRight, Quote, Star, User } from "lucide-react";
import type { Review, ReviewSource, ReviewSummary } from "@/types/content";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { buttonVariants } from "@/components/ui/button";
import { UpworkIcon } from "@/components/icons/brand-icons";

function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <div
      role="img"
      aria-label={`Rated ${rating} out of 5`}
      className="flex items-center gap-1"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          strokeWidth={1.5}
          className={
            index < rating
              ? "size-3.5 fill-accent text-accent"
              : "size-3.5 text-muted/40"
          }
        />
      ))}
    </div>
  );
}

function reviewMeta(review: Review) {
  return [review.country, review.projectType].filter(Boolean).join(" · ");
}

/** Marketplace mark for the platform a review came from, if we have one. */
function SourceLogo({
  source,
  className,
}: {
  source: ReviewSource;
  className?: string;
}) {
  if (source === "Upwork") return <UpworkIcon className={className} />;
  return null;
}

function SourceLabel({ review }: { review: Review }) {
  if (!review.source) return null;

  const label = (
    <>
      <SourceLogo source={review.source} className="size-3.5 shrink-0" />
      Verified on {review.source}
      {review.sourceUrl ? (
        <ArrowUpRight className="size-3.5" strokeWidth={1.8} />
      ) : null}
    </>
  );

  if (!review.sourceUrl) {
    return (
      <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        {label}
      </span>
    );
  }

  return (
    <a
      href={review.sourceUrl}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent transition-colors hover:text-foreground"
    >
      {label}
    </a>
  );
}

function RatingSummary({
  summary,
  count,
}: {
  summary: ReviewSummary;
  count: number;
}) {
  return (
    <div className="w-full rounded-2xl border border-border bg-surface/70 p-5 sm:w-[21rem]">
      <div className="flex items-center gap-4">
        <span className="font-mono text-4xl font-semibold tracking-tight text-foreground">
          {summary.score.toFixed(1)}
        </span>
        <div>
          <Stars rating={Math.round(summary.score)} />
          <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            {count} reviews on{" "}
            <span className="inline-flex items-center gap-1 align-middle">
              <SourceLogo source={summary.platform} className="size-3 shrink-0" />
              {summary.platform}
            </span>
          </p>
        </div>
      </div>

      {summary.url ? (
        <a
          href={summary.url}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({
            size: "sm",
            className: "mt-4 w-full",
          })}
        >
          View my {summary.platform} profile
          <ArrowUpRight className="size-4" strokeWidth={1.8} />
        </a>
      ) : null}
    </div>
  );
}

export function Testimonials({
  reviews,
  summary,
}: {
  reviews: Review[];
  summary: ReviewSummary;
}) {
  const featured = reviews.find((review) => review.featured) ?? reviews[0];
  const rest = reviews.filter((review) => review !== featured);

  if (!featured) return null;

  return (
    <Section id="reviews">
      <SectionHeading
        eyebrow="Client reviews"
        title={
          <>
            Kind words from clients I&apos;ve{" "}
            <span className="text-accent">shipped</span> for.
          </>
        }
        description="Real reviews, copied word for word. Every card links back to the original."
        action={<RatingSummary summary={summary} count={reviews.length} />}
      />

      <div className="grid gap-5 lg:grid-cols-[1.65fr_1fr]">
        <Reveal className="h-full">
          <SpotlightCard className="flex h-full flex-col rounded-3xl border border-border bg-surface/70 p-6 sm:p-9">
            <Quote
              className="size-8 fill-accent text-accent"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <blockquote className="mt-5 flex-1 text-pretty text-xl leading-relaxed text-foreground sm:text-2xl">
              {featured.quote}
            </blockquote>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-white/[0.03] text-muted">
                  <User className="size-4" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {featured.name}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    {reviewMeta(featured)}
                  </p>
                </div>
              </div>
              <SourceLabel review={featured} />
            </div>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={0.06} className="h-full">
          <div className="flex h-full flex-col rounded-3xl border border-border bg-surface/70 p-6 sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              How clients rate me
            </p>
            <ul className="mt-6 space-y-5">
              {summary.criteria.map((criterion) => (
                <li key={criterion.label}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm text-muted-strong">
                      {criterion.label}
                    </span>
                    <span className="font-mono text-xs text-foreground">
                      {criterion.score.toFixed(1)}
                    </span>
                  </div>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{
                        width: `${Math.min(Math.max(criterion.score, 0), 5) * 20}%`,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-8 border-t border-border pt-5 font-mono text-[10px] leading-relaxed uppercase tracking-[0.14em] text-muted sm:mt-auto">
              Averaged across {reviews.length} verified reviews
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((review, index) => (
          <Reveal
            key={`${review.name}-${index}`}
            delay={index * 0.05}
            className="h-full"
          >
            <SpotlightCard className="flex h-full flex-col rounded-3xl border border-border bg-surface/70 p-6">
              <Stars rating={review.rating} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-strong">
                {review.quote}
              </blockquote>

              <div className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-medium text-foreground">
                  {review.name}
                </p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  {reviewMeta(review)}
                </p>
                <div className="mt-3">
                  <SourceLabel review={review} />
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-12 flex flex-col gap-5 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-medium text-foreground">
              Want to be the next review?
            </p>
            <p className="mt-1 text-sm text-muted">
              Tell me about your project and I&apos;ll reply within a day.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/contact" className={buttonVariants({ size: "md" })}>
              Start a project
              <ArrowUpRight className="size-4" strokeWidth={1.8} />
            </Link>
            <Link
              href="/#work"
              className={buttonVariants({ variant: "outline", size: "md" })}
            >
              See my work
            </Link>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
