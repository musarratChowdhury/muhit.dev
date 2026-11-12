"use client";

import * as React from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { saveProjects } from "@/app/admin/actions";
import type { Project, ProjectCategory, ProjectLink } from "@/types/content";
import { cn } from "@/lib/utils";
import { EditorHeader } from "@/components/admin/save-button";
import { Repeater } from "@/components/admin/repeater";
import { useEditor } from "@/components/admin/use-editor";
import {
  ColorField,
  LinesField,
  RowGrid,
  SelectField,
  SwitchField,
  TextAreaField,
  TextField,
} from "@/components/admin/form";
import { Badge } from "@/components/admin/ui/badge";
import { Button } from "@/components/admin/ui/button";
import { Card } from "@/components/admin/ui/card";

const CATEGORIES: readonly ProjectCategory[] = [
  "Full-stack",
  "Mobile",
  "Real-time",
  "AI",
  "Games",
  "Tools",
];

const LINK_TYPES: readonly ProjectLink["type"][] = ["live", "github", "case-study"];

function emptyProject(): Project {
  return {
    slug: "",
    title: "",
    subtitle: "",
    summary: "",
    description: [],
    year: String(new Date().getFullYear()),
    role: "",
    category: "Full-stack",
    featured: false,
    tech: [],
    links: [],
    cover: "",
    coverAlt: "",
    accent: "#00ff99",
    metrics: [],
    highlights: [],
  };
}

/** Mirrors the server's slug rule so the preview matches what will be stored. */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ProjectRow({
  project,
  index,
  total,
  defaultOpen,
  onChange,
  onRemove,
  onMove,
}: {
  project: Project;
  index: number;
  total: number;
  defaultOpen: boolean;
  onChange: (changes: Partial<Project>) => void;
  onRemove: () => void;
  onMove: (direction: -1 | 1) => void;
}) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <Card className="gap-0 overflow-hidden py-0">
      <div className="flex items-start justify-between gap-3 border-b bg-muted/40 px-4 py-3">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex min-w-0 flex-1 items-start gap-2 text-left"
          aria-expanded={open}
        >
          <ChevronDown
            className={cn(
              "mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform",
              open && "rotate-180",
            )}
          />
          <span className="min-w-0">
            <span className="flex items-center gap-2">
              <span className="truncate text-sm font-medium">
                {project.title || "Untitled project"}
              </span>
              {project.featured ? <Badge>Featured</Badge> : null}
            </span>
            <span className="mt-0.5 block truncate font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              /projects/{project.slug || "…"} · {project.year || "no year"}
            </span>
          </span>
        </button>

        <div className="flex shrink-0 items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onMove(-1)}
            disabled={index === 0}
          >
            Up
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onMove(1)}
            disabled={index === total - 1}
          >
            Down
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7 text-destructive hover:text-destructive"
            onClick={onRemove}
            aria-label={`Remove ${project.title || "project"}`}
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </div>

      {open ? (
        <div className="space-y-5 p-4">
          <RowGrid>
            <TextField
              label="Title"
              value={project.title}
              onChange={(value) => onChange({ title: value })}
            />
            <TextField
              label="Slug"
              value={project.slug}
              onChange={(value) => onChange({ slug: slugify(value) })}
              hint="Letters, numbers and dashes. The URL is /projects/<slug>."
            />
            <TextField
              label="Subtitle"
              value={project.subtitle}
              onChange={(value) => onChange({ subtitle: value })}
            />
            <TextField
              label="Role"
              value={project.role}
              onChange={(value) => onChange({ role: value })}
            />
            <TextField
              label="Year"
              value={project.year}
              onChange={(value) => onChange({ year: value })}
            />
            <SelectField
              label="Category"
              value={project.category}
              options={CATEGORIES}
              onChange={(value) => onChange({ category: value })}
            />
          </RowGrid>

          <SwitchField
            label="Featured"
            checked={project.featured}
            onChange={(checked) => onChange({ featured: checked })}
            hint="Featured projects appear on the home page and the CV."
          />

          <TextAreaField
            label="Summary"
            value={project.summary}
            onChange={(value) => onChange({ summary: value })}
            rows={3}
            hint="One paragraph, also used as the meta description."
          />
          <LinesField
            label="Description"
            value={project.description}
            onChange={(description) => onChange({ description })}
            hint="One paragraph per line. Shown on the case-study page."
            rows={5}
          />
          <LinesField
            label="Highlights"
            value={project.highlights}
            onChange={(highlights) => onChange({ highlights })}
            rows={4}
          />
          <LinesField
            label="Tech"
            value={project.tech}
            onChange={(tech) => onChange({ tech })}
            hint="One technology per line."
            rows={3}
          />

          <RowGrid>
            <TextField
              label="Cover path"
              value={project.cover}
              onChange={(value) => onChange({ cover: value })}
              hint="e.g. /images/projects/thing.svg"
            />
            <TextField
              label="Cover alt text"
              value={project.coverAlt}
              onChange={(value) => onChange({ coverAlt: value })}
            />
          </RowGrid>

          <ColorField
            label="Accent"
            value={project.accent}
            onChange={(value) => onChange({ accent: value })}
            hint="Tints the project card and case-study header."
          />

          <TextAreaField
            label="Note"
            value={project.note ?? ""}
            onChange={(value) => onChange({ note: value })}
            rows={2}
            hint="Optional footnote shown at the end of the case study."
          />

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Links</h3>
            <Repeater
              items={project.links}
              onChange={(links) => onChange({ links })}
              create={() => ({ label: "", href: "", type: "live" as const })}
              itemTitle={(link) => link.label}
              itemMeta={(link) => link.href}
              addLabel="Add link"
              emptyLabel="No links yet."
              render={(link, update) => (
                <>
                  <RowGrid>
                    <TextField
                      label="Label"
                      value={link.label}
                      onChange={(value) => update({ label: value })}
                    />
                    <SelectField
                      label="Type"
                      value={link.type}
                      options={LINK_TYPES}
                      onChange={(value) => update({ type: value })}
                    />
                  </RowGrid>
                  <TextField
                    label="URL"
                    value={link.href}
                    onChange={(value) => update({ href: value })}
                  />
                </>
              )}
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Metrics</h3>
            <Repeater
              items={project.metrics}
              onChange={(metrics) => onChange({ metrics })}
              create={() => ({ value: "", label: "" })}
              itemTitle={(metric) => `${metric.value} — ${metric.label}`}
              addLabel="Add metric"
              emptyLabel="No metrics yet."
              render={(metric, update) => (
                <RowGrid>
                  <TextField
                    label="Value"
                    value={metric.value}
                    onChange={(value) => update({ value })}
                  />
                  <TextField
                    label="Label"
                    value={metric.label}
                    onChange={(value) => update({ label: value })}
                  />
                </RowGrid>
              )}
            />
          </div>
        </div>
      ) : null}
    </Card>
  );
}

export function ProjectsEditor({ initial }: { initial: Project[] }) {
  const editor = useEditor<Project[]>(initial);

  async function handleSave() {
    const state = await saveProjects(editor.value);
    if (state.ok) editor.markSaved();
    return state;
  }

  function updateAt(index: number, changes: Partial<Project>) {
    editor.setValue((prev) =>
      prev.map((project, i) => (i === index ? { ...project, ...changes } : project)),
    );
  }

  function removeAt(index: number) {
    editor.setValue((prev) => prev.filter((_, i) => i !== index));
  }

  function move(index: number, direction: -1 | 1) {
    editor.setValue((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      const [moved] = next.splice(index, 1);
      next.splice(target, 0, moved);
      return next;
    });
  }

  return (
    <div className="space-y-6">
      <EditorHeader
        title="Projects"
        description="Each project becomes its own page at /projects/<slug>. Featured ones also appear on the home page and CV."
        onSave={handleSave}
        dirty={editor.dirty}
      />

      <div className="space-y-4">
        {editor.value.length === 0 ? (
          <p className="rounded-lg border border-dashed px-4 py-6 text-center text-sm text-muted-foreground">
            No projects yet.
          </p>
        ) : null}

        {editor.value.map((project, index) => (
          <ProjectRow
            key={index}
            project={project}
            index={index}
            total={editor.value.length}
            defaultOpen={index === 0}
            onChange={(changes) => updateAt(index, changes)}
            onRemove={() => removeAt(index)}
            onMove={(direction) => move(index, direction)}
          />
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() => editor.setValue((prev) => [...prev, emptyProject()])}
          className="w-full gap-2 border-dashed"
        >
          <Plus className="size-4" />
          Add project
        </Button>
      </div>
    </div>
  );
}
