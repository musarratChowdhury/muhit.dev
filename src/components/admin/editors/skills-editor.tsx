"use client";

import * as React from "react";
import { saveSkills } from "@/app/admin/actions";
import type { SkillGroup } from "@/types/content";
import { EditorHeader } from "@/components/admin/save-button";
import { Repeater } from "@/components/admin/repeater";
import { useEditor } from "@/components/admin/use-editor";
import { LinesField, TextField } from "@/components/admin/form";
import { Card } from "@/components/admin/ui/card";

type Payload = { groups: SkillGroup[]; marquee: string[] };

export function SkillsEditor({
  initialGroups,
  initialMarquee,
}: {
  initialGroups: SkillGroup[];
  initialMarquee: string[];
}) {
  const editor = useEditor<Payload>({
    groups: initialGroups,
    marquee: initialMarquee,
  });
  const { groups, marquee } = editor.value;

  async function handleSave() {
    const state = await saveSkills(editor.value);
    if (state.ok) editor.markSaved();
    return state;
  }

  return (
    <div className="space-y-8">
      <EditorHeader
        title="Skills"
        description="Grouped skills for the about section, plus the names that scroll in the marquee."
        onSave={handleSave}
        dirty={editor.dirty}
      />

      <section className="space-y-4">
        <div>
          <h2 className="text-sm font-medium">Skill groups</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Each group is a card. Keep the item count similar across groups so the
            grid stays even.
          </p>
        </div>

        <Repeater
          items={groups}
          onChange={(next) => editor.setValue((prev) => ({ ...prev, groups: next }))}
          create={() => ({ title: "", items: [] })}
          itemTitle={(group) => group.title}
          itemMeta={(group) => `${group.items.length} items`}
          addLabel="Add group"
          emptyLabel="No skill groups yet."
          render={(group, update) => (
            <>
              <TextField
                label="Title"
                value={group.title}
                onChange={(value) => update({ title: value })}
              />
              <LinesField
                label="Skills"
                value={group.items}
                onChange={(items) => update({ items })}
                hint="One skill per line."
                rows={5}
              />
            </>
          )}
        />
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-sm font-medium">Marquee</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            The infinite scrolling strip of technology names.
          </p>
        </div>

        <Card className="p-5">
          <LinesField
            label="Marquee items"
            value={marquee}
            onChange={(next) => editor.setValue((prev) => ({ ...prev, marquee: next }))}
            hint="One name per line."
            rows={8}
          />
        </Card>
      </section>
    </div>
  );
}
