import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: readonly string[];
  className?: string;
  reverse?: boolean;
  itemClassName?: string;
};

export function Marquee({
  items,
  className,
  reverse = false,
  itemClassName,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "flex w-max shrink-0 items-center",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          "group-hover:[animation-play-state:paused] motion-reduce:animate-none",
        )}
      >
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={cn(
              "mx-1.5 inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.02] px-3 py-1.5 font-mono text-xs text-muted-strong",
              itemClassName,
            )}
          >
            <span className="size-1 rounded-full bg-accent/70" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
