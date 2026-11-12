import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content/store";
import { ReviewsEditor } from "@/components/admin/editors/reviews-editor";

export const metadata: Metadata = { title: "Reviews" };

export default async function AdminReviewsPage() {
  const { reviews, reviewSummary } = await getSiteContent();

  return <ReviewsEditor initialReviews={reviews} initialSummary={reviewSummary} />;
}
