import type { Review, ReviewSummary } from "@/types/content";

/**
 * Client reviews.
 *
 * Only publish words a client actually wrote. Every quote below is copied
 * verbatim from a public marketplace review card:
 *
 * - Upwork (2): 5.0 stars each; Upwork hides the client name on those cards, so
 *   they are attributed to "Upwork client".
 * - Fiverr (5): the seller profile's "Reviews as Seller" list from 2021. Fiverr
 *   no longer serves those order pages, so there is no link to add.
 *
 * - `featured: true` marks the review that gets the large card.
 * - `sourceUrl` turns the "Verified on …" label into a link. Both Upwork reviews
 *   point at the public profile, which is where the originals live.
 * - `country` drives the flag on the card (see `components/icons/flags.tsx`).
 * - `rating` (1–5) is per review; it defaults to 5 in the UI.
 */

/** Public Upwork profile — the canonical page for the Upwork reviews below. */
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
  {
    quote:
      "Excellent work, definitely recommend it and I will definitely work with him again.",
    name: "astojkovski65",
    role: "Fiverr client",
    country: "North Macedonia",
    rating: 5,
    source: "Fiverr",
  },
  {
    quote:
      "This is the second time I used him. He writes good code and is well worth his price.",
    name: "sensegrounding",
    role: "Fiverr client",
    country: "United States",
    rating: 5,
    source: "Fiverr",
  },
  {
    quote:
      "A perfect respect of the demand a fast and friendly exchange A very fast delivery speed",
    name: "momosdm",
    role: "Fiverr client",
    country: "France",
    rating: 5,
    source: "Fiverr",
  },
  {
    quote: "Top notch!",
    name: "majchowdhury",
    role: "Fiverr client",
    country: "United Kingdom",
    rating: 5,
    source: "Fiverr",
  },
  {
    quote: "Great staff!!",
    name: "majchowdhury",
    role: "Fiverr client",
    country: "United Kingdom",
    rating: 5,
    source: "Fiverr",
  },
];
