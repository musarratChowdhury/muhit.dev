"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  /**
   * Classes for the inner content wrapper. Use it when the card needs to lay
   * its children out itself (e.g. `"flex flex-1 flex-col"` so a `flex-1` child
   * pushes the footer to the bottom of a stretched grid cell).
   */
  contentClassName?: string;
  spotColor?: string;
};

export function SpotlightCard({
  children,
  className,
  contentClassName,
  spotColor = "rgba(0, 255, 153, 0.08)",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    element.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    element.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className={cn("group relative overflow-hidden", className)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(520px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${spotColor}, transparent 55%)`,
        }}
      />
      <div className={cn("relative z-10", contentClassName)}>{children}</div>
    </div>
  );
}
