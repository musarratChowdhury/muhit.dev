import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content/store";
import { ExperienceEditor } from "@/components/admin/editors/experience-editor";

export const instant = false;

export const metadata: Metadata = { title: "Experience" };

export default async function AdminExperiencePage() {
  const { experience } = await getSiteContent();

  return <ExperienceEditor initial={experience} />;
}
