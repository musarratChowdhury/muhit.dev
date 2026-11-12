import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content/store";
import { SkillsEditor } from "@/components/admin/editors/skills-editor";

export const metadata: Metadata = { title: "Skills" };

export default async function AdminSkillsPage() {
  const { skillGroups, techMarquee } = await getSiteContent();

  return <SkillsEditor initialGroups={skillGroups} initialMarquee={techMarquee} />;
}
