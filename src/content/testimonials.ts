import type { Review, ReviewSummary } from "@/types/content";

/**
 * Client reviews.
 *
 * ⚠️ PLACEHOLDERS: every quote, name, and meta line below is template text from
 * the design hand-off. Replace each one with a real review you can point back to
 * (Fiverr order, Upwork contract, LinkedIn recommendation, or an email thread)
 * before deploying — only publish words a client actually wrote.
 *
 * - Set `featured: true` on the one review that gets the large card.
 * - Add `sourceUrl` to turn the "Verified on …" label into a link.
 * - Set `rating` (1–5) per review; it defaults to 5 in the UI.
 */

export const reviewSummary: ReviewSummary = {
  score: 5,
  platform: "Fiverr",
  // url: "https://www.fiverr.com/your-handle",
  criteria: [
    { label: "Communication", score: 5 },
    { label: "Service as described", score: 5 },
    { label: "Would recommend", score: 5 },
  ],
};

export const reviews: Review[] = [
  {
    quote:
      "[Paste your strongest client review here, word for word. Two or three sentences work best.]",
    name: "[Client name]",
    role: "[Client role]",
    country: "[Country]",
    projectType: "[Project type]",
    rating: 5,
    source: "Fiverr",
    featured: true,
  },
  {
    quote: "[Client review 2, copied word for word.]",
    name: "[Client name]",
    role: "[Client role]",
    country: "[Country]",
    projectType: "[Project type]",
    rating: 5,
    source: "Fiverr",
  },
  {
    quote: "[Client review 3, copied word for word.]",
    name: "[Client name]",
    role: "[Client role]",
    country: "[Country]",
    projectType: "[Project type]",
    rating: 5,
    source: "Fiverr",
  },
  {
    quote: "[Client review 4, copied word for word.]",
    name: "[Client name]",
    role: "[Client role]",
    country: "[Country]",
    projectType: "[Project type]",
    rating: 5,
    source: "Fiverr",
  },
  {
    quote: "[Client review 5, copied word for word.]",
    name: "[Client name]",
    role: "[Client role]",
    country: "[Country]",
    projectType: "[Project type]",
    rating: 5,
    source: "Fiverr",
  },
  {
    quote: "[Client review 6, copied word for word.]",
    name: "[Client name]",
    role: "[Client role]",
    country: "[Country]",
    projectType: "[Project type]",
    rating: 5,
    source: "Fiverr",
  },
  {
    quote: "[Client review 7, copied word for word.]",
    name: "[Client name]",
    role: "[Client role]",
    country: "[Country]",
    projectType: "[Project type]",
    rating: 5,
    source: "Fiverr",
  },
];
