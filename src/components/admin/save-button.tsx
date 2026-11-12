"use client";

import * as React from "react";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/admin/ui/button";
import type { SaveState } from "@/app/admin/actions";

export function SaveButton({
  onSave,
  label = "Save changes",
  disabled,
}: {
  onSave: () => Promise<SaveState>;
  label?: string;
  disabled?: boolean;
}) {
  const [pending, setPending] = React.useState(false);

  async function handleClick() {
    setPending(true);
    try {
      const state = await onSave();
      if (state.ok) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    } catch {
      toast.error("Something went wrong. Nothing was saved.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Button onClick={handleClick} disabled={pending || disabled} className="gap-2">
      {pending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Save className="size-4" />
      )}
      {pending ? "Saving…" : label}
    </Button>
  );
}

/**
 * Header for an editor: title, description and the save action, with a
 * reminder that unsaved edits only exist in the browser.
 */
export function EditorHeader({
  title,
  description,
  onSave,
  dirty,
}: {
  title: string;
  description: string;
  onSave: () => Promise<SaveState>;
  dirty: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          {dirty ? "Unsaved changes" : "Saved"}
        </span>
        <SaveButton onSave={onSave} />
      </div>
    </div>
  );
}
