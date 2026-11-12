import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content/store";
import { EducationEditor } from "@/components/admin/editors/education-editor";

export const metadata: Metadata = { title: "Education" };

export default async function AdminEducationPage() {
  const { education, certifications } = await getSiteContent();

  return (
    <EducationEditor
      initialEducation={education}
      initialCertifications={certifications}
    />
  );
}
