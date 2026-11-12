import type { Recommendation } from "@/types/content";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { RecommendationCarousel } from "@/components/recommendations/recommendation-carousel";

export function Recommendations({
  recommendations,
}: {
  recommendations: Recommendation[];
}) {
  if (recommendations.length === 0) return null;

  return (
    <Section id="recommendations">
      <SectionHeading
        eyebrow="Recommendations"
        title={
          <>
            What people I&apos;ve{" "}
            <span className="text-accent">worked with</span> say.
          </>
        }
        description="Written by managers, teammates and clients — the same words they put on my LinkedIn."
        action={
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-2">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              {recommendations.length} recommendations
            </span>
          </div>
        }
      />

      <Reveal delay={0.06}>
        <RecommendationCarousel recommendations={recommendations} />
      </Reveal>
    </Section>
  );
}
