"use client";

import * as React from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/admin/ui/button";
import { Card } from "@/components/admin/ui/card";

/**
 * An add/remove/reorder list of structured items.
 *
 * Every editor's collection (experience, projects, reviews…) uses this so the
 * affordances stay identical everywhere. `render` receives the item plus an
 * `update` helper that patches only the changed fields.
 */
export function Repeater<T>({
  items,
  onChange,
  create,
  render,
  itemTitle,
  itemMeta,
  addLabel = "Add item",
  emptyLabel = "Nothing here yet.",
  className,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  create: () => T;
  render: (item: T, update: (changes: Partial<T>) => void, index: number) => React.ReactNode;
  itemTitle: (item: T, index: number) => string;
  itemMeta?: (item: T, index: number) => string | undefined;
  addLabel?: string;
  emptyLabel?: string;
  className?: string;
}) {
  function updateAt(index: number, changes: Partial<T>) {
    onChange(items.map((item, i) => (i === index ? { ...item, ...changes } : item)));
  }

  function removeAt(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved);
    onChange(next);
  }

  return (
    <div className={cn("space-y-4", className)}>
      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed px-4 py-6 text-center text-sm text-muted-foreground">
          {emptyLabel}
        </p>
      ) : null}

      {items.map((item, index) => (
        <Card key={index} className="gap-0 overflow-hidden py-0">
          <div className="flex items-start justify-between gap-3 border-b bg-muted/40 px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {itemTitle(item, index) || `Item ${index + 1}`}
              </p>
              {itemMeta?.(item, index) ? (
                <p className="mt-0.5 truncate font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  {itemMeta(item, index)}
                </p>
              ) : null}
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label="Move up"
              >
                <ArrowUp className="size-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={() => move(index, 1)}
                disabled={index === items.length - 1}
                aria-label="Move down"
              >
                <ArrowDown className="size-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7 text-destructive hover:text-destructive"
                onClick={() => removeAt(index)}
                aria-label="Remove item"
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </div>
          <div className="space-y-4 p-4">
            {render(item, (changes) => updateAt(index, changes), index)}
          </div>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => onChange([...items, create()])}
        className="w-full gap-2 border-dashed"
      >
        <Plus className="size-4" />
        {addLabel}
      </Button>
    </div>
  );
}
