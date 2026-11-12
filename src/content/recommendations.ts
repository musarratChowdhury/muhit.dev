import type { Recommendation } from "@/types/content";

/**
 * LinkedIn-style recommendations, from people the owner has actually worked
 * with. They live in their own Firestore document, so editing them never
 * touches the client reviews.
 *
 * This file is the seed **and** the fallback: it renders exactly like this when
 * Firestore is unreachable. Everything here is editable at
 * `/admin/recommendations`.
 *
 * - `relationship` is the line LinkedIn prints under the date, e.g.
 *   "Managed Musarrat directly" or "worked with Musarrat on the same team".
 * - `avatar` is optional; without it the card shows initials.
 * - `profileUrl` is optional; it links the name to the full recommendation on
 *   LinkedIn.
 *
 * ⚠️ Syed Mohaiminul's quote is cut where LinkedIn's "…more" hid the rest of
 * the text. Paste the remainder from LinkedIn at `/admin/recommendations`.
 */
export const recommendations: Recommendation[] = [
  {
    name: "Md. Jalal Uddin",
    title: "Software Engineer",
    relationship: "Md. Jalal was Musarrat's mentor",
    date: "July 15, 2026",
    quote:
      "I had the opportunity to work closely with Musarrat Chowdhury for several months and found him to be an exceptionally talented and dependable professional. He consistently demonstrated strong problem-solving skills, a commitment to excellence, and the ability to deliver results with minimal guidance. I am confident he will be a valuable asset to any organization and highly recommend him.",
  },
  {
    name: "Md. Rashidul Hasan",
    title: "Senior Software Architect",
    company: "Onnorokom Projukti Limited",
    relationship: "Md. Rashidul was Musarrat's mentor",
    date: "February 23, 2026",
    quote:
      "I had the pleasure of mentoring Musarrat Chowdhury during his time at Onnorokom Software Limited, and I truly appreciate the dedication and professionalism he brought to the team. As an Assistant Software Engineer at OSL, Musarrat demonstrated strong command over backend development with ASP.NET, along with a solid understanding of frontend integration, database design, and Android and iOS app development. He was dependable when handling feature development, bug fixing, and performance improvements, always ensuring his work met both functional and quality expectations.",
  },
  {
    name: "Syed Mohaiminul Hoque",
    title: "Jr. Software Engineer — QA Engineer",
    relationship: "Syed Mohaiminul worked with Musarrat on the same team",
    date: "June 22, 2025",
    quote:
      "Musarrat bhai is a man with exceptional talents. Despite being so good in multiple fields like game development, software development, he's so humble. Besides the code he wrote for the software requirements, he used to work on his existing hobby projects by improving them everyday. He's a better problem solver than he seems, because his knowledge and understanding of the software development made the task easier for us to make the app using experience better. Both of us used to talk about our hobby projects regarding optimizations and never felt tired. Also, he used to stay up late until the bug in the code was solved. To him, not only good coding practices but also the nature of the bug in the software spoke volumes of its existence.",
  },
];
