"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type CopyEmailProps = {
  className?: string;
  label?: string;
  compact?: boolean;
};

export function CopyEmail({
  className,
  label = "Copy email",
  compact = false,
}: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-live="polite"
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.02] px-4 py-2.5 font-mono text-xs text-muted-strong transition-colors hover:border-accent/40 hover:bg-accent-soft hover:text-accent",
        className,
      )}
    >
      {copied ? (
        <Check className="size-3.5 text-accent" strokeWidth={2.2} />
      ) : (
        <Copy className="size-3.5" strokeWidth={1.8} />
      )}
      <span className={cn(compact && "sr-only sm:not-sr-only")}>
        {copied ? "Copied to clipboard" : label}
      </span>
    </button>
  );
}
