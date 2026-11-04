import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = ComponentProps<"span"> & {
  dot?: boolean;
  dotClassName?: string;
};

export function Badge({
  children,
  className,
  dot = true,
  dotClassName,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-strong",
        className,
      )}
      {...props}
    >
      {dot ? (
        <span
          className={cn(
            "relative flex size-1.5 shrink-0",
            dotClassName,
          )}
        >
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
        </span>
      ) : null}
      {children}
    </span>
  );
}

export function TechPill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-white/[0.025] px-2.5 py-1 font-mono text-[11px] text-muted-strong",
        className,
      )}
    >
      {children}
    </span>
  );
}
