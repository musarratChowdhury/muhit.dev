"use client";

import * as React from "react";
import { saveReviews } from "@/app/admin/actions";
import type { Review, ReviewSource, ReviewSummary } from "@/types/content";
import { EditorHeader } from "@/components/admin/save-button";
import { Repeater } from "@/components/admin/repeater";
import { useEditor } from "@/components/admin/use-editor";
import {
  RowGrid,
  SelectField,
  SwitchField,
  TextAreaField,
  TextField,
} from "@/components/admin/form";
import { Card } from "@/components/admin/ui/card";

const SOURCES: readonly ReviewSource[] = [
  "Fiverr",
  "Upwork",
  "LinkedIn",
  "Email",
  "Direct",
];

type Payload = { reviews: Review[]; summary: ReviewSummary };

export function ReviewsEditor({
  initialReviews,
  initialSummary,
}: {
  initialReviews: Review[];
  initialSummary: ReviewSummary;
}) {
  const editor = useEditor<Payload>({
    reviews: initialReviews,
    summary: initialSummary,
  });
  const { reviews, summary } = editor.value;

  const setSummary = React.useCallback(
    (changes: Partial<ReviewSummary>) =>
      editor.setValue((prev) => ({
        ...prev,
        summary: { ...prev.summary, ...changes },
      })),
    [editor],
  );

  async function handleSave() {
    const state = await saveReviews(editor.value);
    if (state.ok) editor.markSaved();
    return state;
  }

  return (
    <div className="space-y-8">
      <EditorHeader
        title="Reviews"
        description="Client quotes and the aggregate rating. Only paste words a client actually wrote — leave the collection empty rather than inventing a quote."
        onSave={handleSave}
        dirty={editor.dirty}
      />

      <section className="space-y-4">
        <div>
          <h2 className="text-sm font-medium">Rating summary</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            The big number and the per-criterion bars next to the reviews.
          </p>
        </div>

        <Card className="gap-5 p-5">
          <RowGrid>
            <TextField
              label="Overall score"
              type="number"
              value={String(summary.score)}
              onChange={(value) => setSummary({ score: Number(value) })}
              hint="Between 0 and 5, e.g. 4.9"
            />
            <SelectField
              label="Platform"
              value={summary.platform}
              options={SOURCES}
              onChange={(value) => setSummary({ platform: value })}
            />
          </RowGrid>

          <TextField
            label="Profile URL"
            value={summary.url ?? ""}
            onChange={(value) => setSummary({ url: value })}
            hint="Optional. Powers the 'View my profile' button."
          />

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Criteria</h3>
            <Repeater
              items={summary.criteria}
              onChange={(criteria) => setSummary({ criteria })}
              create={() => ({ label: "", score: 5 })}
              itemTitle={(criterion) => criterion.label}
              addLabel="Add criterion"
              emptyLabel="No criteria yet."
              render={(criterion, update) => (
                <RowGrid>
                  <TextField
                    label="Label"
                    value={criterion.label}
                    onChange={(value) => update({ label: value })}
                  />
                  <TextField
                    label="Score"
                    type="number"
                    value={String(criterion.score)}
                    onChange={(value) => update({ score: Number(value) })}
                    hint="0 to 5"
                  />
                </RowGrid>
              )}
            />
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-sm font-medium">Client reviews</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            The first featured review is shown large; the rest sit below it.
          </p>
        </div>

        <Repeater
          items={reviews}
          onChange={(next) => editor.setValue((prev) => ({ ...prev, reviews: next }))}
          create={() => ({
            quote: "",
            name: "",
            role: "",
            featured: false,
          })}
          itemTitle={(review) => review.name}
          itemMeta={(review) => review.role}
          addLabel="Add review"
          emptyLabel="No reviews yet."
          render={(review, update) => (
            <>
              <TextAreaField
                label="Quote"
                value={review.quote}
                onChange={(value) => update({ quote: value })}
                rows={4}
              />
              <RowGrid>
                <TextField
                  label="Name"
                  value={review.name}
                  onChange={(value) => update({ name: value })}
                />
                <TextField
                  label="Role"
                  value={review.role}
                  onChange={(value) => update({ role: value })}
                  hint="e.g. Founder, Northwind Studio"
                />
                <TextField
                  label="Country"
                  value={review.country ?? ""}
                  onChange={(value) => update({ country: value })}
                />
                <TextField
                  label="Project type"
                  value={review.projectType ?? ""}
                  onChange={(value) => update({ projectType: value })}
                />
                <TextField
                  label="Rating"
                  type="number"
                  value={review.rating === undefined ? "" : String(review.rating)}
                  onChange={(value) =>
                    update({ rating: value === "" ? undefined : Number(value) })
                  }
                  hint="1 to 5, optional"
                />
                <SelectField
                  label="Source"
                  value={review.source ?? "Direct"}
                  options={SOURCES}
                  onChange={(value) => update({ source: value })}
                />
              </RowGrid>

              <TextField
                label="Source URL"
                value={review.sourceUrl ?? ""}
                onChange={(value) => update({ sourceUrl: value })}
                hint="Optional. Links the 'Verified on…' label."
              />

              <SwitchField
                label="Featured"
                checked={Boolean(review.featured)}
                onChange={(checked) => update({ featured: checked })}
                hint="Only the first featured review gets the large layout."
              />
            </>
          )}
        />
      </section>
    </div>
  );
}
