"use client";

import { saveExperience } from "@/app/admin/actions";
import type { Experience } from "@/types/content";
import { EditorHeader } from "@/components/admin/save-button";
import { Repeater } from "@/components/admin/repeater";
import { useEditor } from "@/components/admin/use-editor";
import {
  LinesField,
  RowGrid,
  SwitchField,
  TextAreaField,
  TextField,
} from "@/components/admin/form";

export function ExperienceEditor({ initial }: { initial: Experience[] }) {
  const editor = useEditor<Experience[]>(initial);

  async function handleSave() {
    const state = await saveExperience(editor.value);
    if (state.ok) editor.markSaved();
    return state;
  }

  return (
    <div className="space-y-6">
      <EditorHeader
        title="Experience"
        description="Newest first — this is the order the timeline renders in. Each role needs a company and a title."
        onSave={handleSave}
        dirty={editor.dirty}
      />

      <Repeater
        items={editor.value}
        onChange={editor.setValue}
        create={() => ({
          company: "",
          role: "",
          period: "",
          location: "",
          summary: "",
          highlights: [],
          tech: [],
          current: false,
        })}
        itemTitle={(item) => item.role || item.company}
        itemMeta={(item) => [item.company, item.period].filter(Boolean).join(" · ")}
        addLabel="Add role"
        emptyLabel="No roles yet."
        render={(item, update) => (
          <>
            <RowGrid>
              <TextField
                label="Company"
                value={item.company}
                onChange={(value) => update({ company: value })}
              />
              <TextField
                label="Role"
                value={item.role}
                onChange={(value) => update({ role: value })}
              />
              <TextField
                label="Period"
                value={item.period}
                onChange={(value) => update({ period: value })}
                hint="e.g. Jan 2023 — Present"
              />
              <TextField
                label="Location"
                value={item.location}
                onChange={(value) => update({ location: value })}
              />
            </RowGrid>

            <SwitchField
              label="Current role"
              checked={Boolean(item.current)}
              onChange={(checked) => update({ current: checked })}
              hint="Highlights this entry as the present job."
            />

            <TextAreaField
              label="Summary"
              value={item.summary}
              onChange={(value) => update({ summary: value })}
              rows={3}
            />
            <LinesField
              label="Highlights"
              value={item.highlights}
              onChange={(highlights) => update({ highlights })}
              rows={4}
            />
            <LinesField
              label="Tech"
              value={item.tech}
              onChange={(tech) => update({ tech })}
              hint="One technology per line."
              rows={3}
            />
          </>
        )}
      />
    </div>
  );
}
