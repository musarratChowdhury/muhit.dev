"use client";

import * as React from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Pause,
  Play,
  Quote,
} from "lucide-react";
import { useReducedMotion } from "motion/react";
import type { Recommendation } from "@/types/content";
import { isRemoteImage } from "@/lib/site-assets";
import { buttonVariants } from "@/components/ui/button";
import { LinkedinIcon } from "@/components/icons/brand-icons";
import { cn } from "@/lib/utils";

/** How long each recommendation stays on screen before the next one rotates in. */
const ROTATE_MS = 7_000;

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return `${first}${last}`.toUpperCase();
}

function roleLine(recommendation: Recommendation): string {
  return [recommendation.title, recommendation.company].filter(Boolean).join(" · ");
}

function Avatar({ recommendation }: { recommendation: Recommendation }) {
  if (recommendation.avatar) {
    return (
      <span className="relative size-12 shrink-0 overflow-hidden rounded-full border border-border bg-white/[0.03]">
        <Image
          src={recommendation.avatar}
          alt=""
          fill
          unoptimized={isRemoteImage(recommendation.avatar)}
          sizes="48px"
          className="object-cover"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-white/[0.03] font-mono text-xs tracking-[0.08em] text-muted-strong"
    >
      {initialsOf(recommendation.name)}
    </span>
  );
}

function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  const role = roleLine(recommendation);

  return (
    <article className="flex flex-col gap-6 p-6 sm:p-9 lg:flex-row lg:gap-10 lg:p-10">
      <div className="flex items-start gap-3 lg:w-60 lg:shrink-0 lg:flex-col lg:gap-4 lg:border-r lg:border-border lg:pr-8">
        <Avatar recommendation={recommendation} />
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">
            {recommendation.profileUrl ? (
              <a
                href={recommendation.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 transition-colors hover:text-accent"
              >
                {recommendation.name}
                <ArrowUpRight className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : (
              recommendation.name
            )}
          </p>
          {role ? (
            <p className="mt-1 text-xs leading-relaxed text-muted">{role}</p>
          ) : null}
          {recommendation.relationship ? (
            <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-accent">
              {recommendation.relationship}
            </p>
          ) : null}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <Quote
          aria-hidden="true"
          className="size-7 fill-accent/20 text-accent/50"
          strokeWidth={1.2}
        />
        <blockquote className="mt-4 text-pretty text-base leading-relaxed text-muted-strong sm:text-lg">
          {recommendation.quote}
        </blockquote>

        <p className="mt-6 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          <LinkedinIcon className="size-3 shrink-0" />
          {["LinkedIn", recommendation.date].filter(Boolean).join(" · ")}
        </p>
      </div>
    </article>
  );
}

/**
 * An auto-rotating carousel of recommendations.
 *
 * Rotation pauses on hover, on keyboard focus and when the browser asks for
 * reduced motion; there is also an explicit pause button, because "hover to
 * pause" is not a control a keyboard or screen-reader user can reach.
 *
 * Every slide is rendered, stacked in one grid cell, so the container keeps the
 * height of the tallest card and nothing jumps when the active one changes.
 */
export function RecommendationCarousel({
  recommendations,
}: {
  recommendations: Recommendation[];
}) {
  const shouldReduceMotion = useReducedMotion();
  const count = recommendations.length;

  const [index, setIndex] = React.useState(0);
  const [previous, setPrevious] = React.useState(0);
  const [hovering, setHovering] = React.useState(false);
  const [focusWithin, setFocusWithin] = React.useState(false);
  const [userPaused, setUserPaused] = React.useState(false);

  const indexRef = React.useRef(0);
  const paused = hovering || focusWithin || userPaused;

  const goTo = React.useCallback(
    (next: number) => {
      if (count === 0) return;
      const normalized = ((next % count) + count) % count;
      if (normalized === indexRef.current) return;

      setPrevious(indexRef.current);
      indexRef.current = normalized;
      setIndex(normalized);
    },
    [count],
  );

  React.useEffect(() => {
    if (paused || shouldReduceMotion || count < 2) return;

    const timer = window.setInterval(() => {
      goTo(indexRef.current + 1);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [paused, shouldReduceMotion, count, goTo]);

  if (count === 0) return null;

  const controlClass = buttonVariants({
    variant: "outline",
    size: "sm",
    className: "size-9 px-0",
  });

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Recommendations"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={() => setFocusWithin(false)}
    >
      <div className="grid overflow-hidden rounded-3xl border border-border bg-surface/70">
        {recommendations.map((recommendation, slide) => {
          const active = slide === index;
          const outgoing = !active && slide === previous;

          return (
            <div
              key={`${recommendation.name}-${slide}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${slide + 1} of ${count}`}
              aria-hidden={!active}
              inert={!active}
              className={cn(
                "[grid-area:1/1] transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                active && "z-10 translate-x-0 opacity-100",
                outgoing && "pointer-events-none -translate-x-10 opacity-0",
                !active && !outgoing && "pointer-events-none translate-x-10 opacity-0",
              )}
            >
              <RecommendationCard recommendation={recommendation} />
            </div>
          );
        })}
      </div>

      {count > 1 ? (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-1.5" role="group" aria-label="Choose a recommendation">
            {recommendations.map((recommendation, slide) => (
              <button
                key={`${recommendation.name}-dot-${slide}`}
                type="button"
                onClick={() => goTo(slide)}
                aria-label={`Go to recommendation ${slide + 1} of ${count}`}
                aria-current={slide === index ? "true" : undefined}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  slide === index
                    ? "w-8 bg-accent"
                    : "w-4 bg-white/15 hover:bg-white/30",
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              {String(index + 1).padStart(2, "0")}
              <span className="text-muted/50"> / {String(count).padStart(2, "0")}</span>
            </span>

            {shouldReduceMotion ? null : (
              <button
                type="button"
                onClick={() => setUserPaused((value) => !value)}
                aria-pressed={userPaused}
                aria-label={
                  userPaused
                    ? "Resume automatic rotation"
                    : "Pause automatic rotation"
                }
                className={controlClass}
              >
                {userPaused ? (
                  <Play className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
                ) : (
                  <Pause className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
                )}
              </button>
            )}

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Previous recommendation"
                className={controlClass}
              >
                <ArrowLeft className="size-4" strokeWidth={1.8} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Next recommendation"
                className={controlClass}
              >
                <ArrowRight className="size-4" strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
