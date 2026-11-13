import type { Review, ReviewSummary } from "@/types/content";

/**
 * Client reviews.
 *
 * Only publish words a client actually wrote. Both entries below are copied from
 * the public Upwork review cards (5.0 stars each); Upwork does not show client
 * names on those cards, so they are attributed to "Upwork client".
 *
 * - `featured: true` marks the review that gets the large card.
 * - `sourceUrl` turns the "Verified on …" label into a link. Both reviews point
 *   at the public Upwork profile, which is where the originals live.
 * - `rating` (1–5) is per review; it defaults to 5 in the UI.
 */

/** Public Upwork profile — the canonical page for every review below. */
const UPWORK_PROFILE_URL = "https://www.upwork.com/freelancers/~015b22771cc7402d4f";

export const reviewSummary: ReviewSummary = {
  score: 5,
  platform: "Upwork",
  url: UPWORK_PROFILE_URL,
  criteria: [
    { label: "Communication", score: 5 },
    { label: "Quality of work", score: 5 },
    { label: "Would recommend", score: 5 },
  ],
};

export const reviews: Review[] = [
  {
    quote:
      "Muhit is an excellent developer! He created a custom book cover maker plugin for my site that is not only user-friendly but also packed with useful features.",
    name: "Upwork client",
    role: "Fabric.js plugin project",
    projectType: "Fabric.js book cover maker · Oct–Dec 2024",
    rating: 5,
    source: "Upwork",
    sourceUrl: UPWORK_PROFILE_URL,
    featured: true,
  },
  {
    quote:
      "Muhit has done an exceptional Job in doing my work in such a short time. He is extremely cooperative and Good in communication. i would love to work with him again for future tasks and highly recommend him",
    name: "Upwork client",
    role: "JavaScript game project",
    projectType: "HTML game · Jul 2024",
    rating: 5,
    source: "Upwork",
    sourceUrl: UPWORK_PROFILE_URL,
  },
];
