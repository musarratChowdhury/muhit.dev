"use client";

import * as React from "react";
import { saveRecommendations } from "@/app/admin/actions";
import type { Recommendation } from "@/types/content";
import { EditorHeader } from "@/components/admin/save-button";
import { Repeater } from "@/components/admin/repeater";
import { useEditor } from "@/components/admin/use-editor";
import { RowGrid, TextAreaField, TextField } from "@/components/admin/form";

export function RecommendationsEditor({
  initialRecommendations,
}: {
  initialRecommendations: Recommendation[];
}) {
  const editor = useEditor<Recommendation[]>(initialRecommendations);

  async function handleSave() {
    const state = await saveRecommendations(editor.value);
    if (state.ok) editor.markSaved();
    return state;
  }

  return (
    <div className="space-y-8">
      <EditorHeader
        title="Recommendations"
        description="LinkedIn-style recommendations for the auto-rotating carousel on the home page. Order matters — the carousel follows this list."
        onSave={handleSave}
        dirty={editor.dirty}
      />

      <section className="space-y-4">
        <div>
          <h2 className="text-sm font-medium">Recommendations</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Paste each recommendation exactly as it was written. Name and quote are
            required; every other field is optional and simply drops out of the card
            when left empty.
          </p>
        </div>

        <Repeater<Recommendation>
          items={editor.value}
          onChange={(items) => editor.setValue(items)}
          create={() => ({ name: "", title: "", quote: "" })}
          itemTitle={(item) => item.name}
          itemMeta={(item) => [item.title, item.company].filter(Boolean).join(" · ")}
          addLabel="Add recommendation"
          emptyLabel="No recommendations yet. The carousel is hidden until there is at least one."
          render={(item, update) => (
            <>
              <TextAreaField
                label="Quote"
                value={item.quote}
                onChange={(value) => update({ quote: value })}
                rows={6}
                hint="Word for word — the carousel has room for the whole paragraph."
              />

              <RowGrid>
                <TextField
                  label="Name"
                  value={item.name}
                  onChange={(value) => update({ name: value })}
                />
                <TextField
                  label="Title"
                  value={item.title}
                  onChange={(value) => update({ title: value })}
                  hint="e.g. Senior Software Architect"
                />
                <TextField
                  label="Company"
                  value={item.company ?? ""}
                  onChange={(value) => update({ company: value })}
                />
                <TextField
                  label="Relationship"
                  value={item.relationship ?? ""}
                  onChange={(value) => update({ relationship: value })}
                  hint="e.g. Managed Musarrat directly"
                />
                <TextField
                  label="Date"
                  value={item.date ?? ""}
                  onChange={(value) => update({ date: value })}
                  hint="Free text, e.g. July 15, 2026"
                />
                <TextField
                  label="LinkedIn profile URL"
                  type="url"
                  value={item.profileUrl ?? ""}
                  onChange={(value) => update({ profileUrl: value })}
                  hint="Optional. Turns the name into a link."
                />
              </RowGrid>

              <TextField
                label="Avatar URL"
                type="url"
                value={item.avatar ?? ""}
                onChange={(value) => update({ avatar: value })}
                hint="Optional. Without it the card shows their initials."
              />
            </>
          )}
        />
      </section>
    </div>
  );
}
