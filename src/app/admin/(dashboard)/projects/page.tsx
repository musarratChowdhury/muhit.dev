import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content/store";
import { ProjectsEditor } from "@/components/admin/editors/projects-editor";

export const instant = false;

export const metadata: Metadata = { title: "Projects" };

export default async function AdminProjectsPage() {
  const { projects } = await getSiteContent();

  return <ProjectsEditor initial={projects} />;
}
