"use client";

import * as React from "react";
import { saveEducation } from "@/app/admin/actions";
import type { Certification, Education } from "@/types/content";
import { EditorHeader } from "@/components/admin/save-button";
import { Repeater } from "@/components/admin/repeater";
import { useEditor } from "@/components/admin/use-editor";
import { RowGrid, TextAreaField, TextField } from "@/components/admin/form";

type Payload = { education: Education[]; certifications: Certification[] };

export function EducationEditor({
  initialEducation,
  initialCertifications,
}: {
  initialEducation: Education[];
  initialCertifications: Certification[];
}) {
  const editor = useEditor<Payload>({
    education: initialEducation,
    certifications: initialCertifications,
  });
  const { education, certifications } = editor.value;

  async function handleSave() {
    const state = await saveEducation(editor.value);
    if (state.ok) editor.markSaved();
    return state;
  }

  return (
    <div className="space-y-8">
      <EditorHeader
        title="Education"
        description="Degrees and certifications, in the order they appear on the CV and about section."
        onSave={handleSave}
        dirty={editor.dirty}
      />

      <section className="space-y-4">
        <div>
          <h2 className="text-sm font-medium">Degrees</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            A degree needs a title and a school.
          </p>
        </div>

        <Repeater
          items={education}
          onChange={(next) => editor.setValue((prev) => ({ ...prev, education: next }))}
          create={(): Education => ({ degree: "", school: "", period: "", detail: "" })}
          itemTitle={(item) => item.degree}
          itemMeta={(item) => [item.school, item.period].filter(Boolean).join(" · ")}
          addLabel="Add degree"
          emptyLabel="No degrees yet."
          render={(item, update) => (
            <>
              <RowGrid>
                <TextField
                  label="Degree"
                  value={item.degree}
                  onChange={(value) => update({ degree: value })}
                />
                <TextField
                  label="School"
                  value={item.school}
                  onChange={(value) => update({ school: value })}
                />
                <TextField
                  label="Period"
                  value={item.period}
                  onChange={(value) => update({ period: value })}
                />
                <TextField
                  label="Status"
                  value={item.status ?? ""}
                  onChange={(value) => update({ status: value })}
                  hint="Optional, e.g. Graduated"
                />
              </RowGrid>
              <TextAreaField
                label="Detail"
                value={item.detail}
                onChange={(value) => update({ detail: value })}
                rows={3}
              />
            </>
          )}
        />
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-sm font-medium">Certifications</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Issuer and year are optional.
          </p>
        </div>

        <Repeater
          items={certifications}
          onChange={(next) =>
            editor.setValue((prev) => ({ ...prev, certifications: next }))
          }
          create={() => ({ name: "", issuer: "", year: "" })}
          itemTitle={(item) => item.name}
          itemMeta={(item) => [item.issuer, item.year].filter(Boolean).join(" · ")}
          addLabel="Add certification"
          emptyLabel="No certifications yet."
          render={(item, update) => (
            <RowGrid>
              <TextField
                label="Name"
                value={item.name}
                onChange={(value) => update({ name: value })}
              />
              <TextField
                label="Issuer"
                value={item.issuer}
                onChange={(value) => update({ issuer: value })}
              />
              <TextField
                label="Year"
                value={item.year}
                onChange={(value) => update({ year: value })}
              />
            </RowGrid>
          )}
        />
      </section>
    </div>
  );
}
