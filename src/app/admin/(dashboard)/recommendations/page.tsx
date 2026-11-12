import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content/store";
import { RecommendationsEditor } from "@/components/admin/editors/recommendations-editor";

export const metadata: Metadata = { title: "Recommendations" };

export default async function AdminRecommendationsPage() {
  const { recommendations } = await getSiteContent();

  return <RecommendationsEditor initialRecommendations={recommendations} />;
}
