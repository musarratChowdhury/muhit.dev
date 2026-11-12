import type { Metadata } from "next";
import { Suspense } from "react";
import { listAudit, type AuditEntry } from "@/lib/content/audit";
import { Card } from "@/components/admin/ui/card";

export const metadata: Metadata = { title: "Activity" };

const HEX = /^#[0-9a-f]{6}$/i;

/** Server-rendered, so UTC keeps the output identical for every reader. */
function formatWhen(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "unknown time";
  return `${date.toISOString().slice(0, 16).replace("T", " ")} UTC`;
}

function Swatch({ value }: { value: string }) {
  if (!HEX.test(value)) return null;

  return (
    <span
      aria-hidden="true"
      className="inline-block size-3 shrink-0 rounded-sm border align-middle"
      style={{ backgroundColor: value }}
    />
  );
}

function ChangeRow({ change }: { change: AuditEntry["changes"][number] }) {
  return (
    <li className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <span className="text-foreground">{change.field}</span>
      <span className="inline-flex items-center gap-1">
        <Swatch value={change.from} />
        {change.from}
      </span>
      <span aria-hidden="true">→</span>
      <span className="inline-flex items-center gap-1 text-foreground">
        <Swatch value={change.to} />
        {change.to}
      </span>
    </li>
  );
}

function EntryCard({ entry }: { entry: AuditEntry }) {
  const isReset = entry.action === "theme.reset";

  return (
    <Card className="gap-3 p-4">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span
          className={
            isReset
              ? "rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-primary"
              : "rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
          }
        >
          {isReset ? "Reset" : "Save"}
        </span>
        <span className="text-sm font-medium">{entry.summary}</span>
        <span className="ml-auto font-mono text-[11px] text-muted-foreground">
          {formatWhen(entry.at)}
        </span>
      </div>

      <p className="truncate text-xs text-muted-foreground" title={entry.actorEmail}>
        {entry.actorEmail}
        {entry.fields.length > 0 ? (
          <>
            {" · "}
            <span className="font-mono text-[11px]">{entry.fields.join(", ")}</span>
          </>
        ) : null}
      </p>

      {entry.changes.length > 0 ? (
        <ul className="flex flex-col gap-1 border-t pt-3 font-mono text-[11px] text-muted-foreground">
          {entry.changes.map((change) => (
            <ChangeRow key={`${entry.id}-${change.field}`} change={change} />
          ))}
        </ul>
      ) : null}
    </Card>
  );
}

async function ActivityList() {
  const entries = await listAudit(50);

  if (entries.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-sm text-muted-foreground">
          No changes recorded yet. Save something in any editor and it will show up
          here.
        </p>
      </Card>
    );
  }

  return (
    <ul className="space-y-3">
      {entries.map((entry) => (
        <li key={entry.id}>
          <EntryCard entry={entry} />
        </li>
      ))}
    </ul>
  );
}

export default function AdminActivityPage() {
  return (
    <div className="space-y-8">
      <div className="border-b pb-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Activity
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Audit log</h1>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Every save and theme reset, newest first, with the values that changed.
          Entries live in the{" "}
          <code className="font-mono text-xs">contentAudit</code> collection in
          Firestore.
        </p>
      </div>

      <Suspense
        fallback={<p className="text-sm text-muted-foreground">Loading activity…</p>}
      >
        <ActivityList />
      </Suspense>
    </div>
  );
}
