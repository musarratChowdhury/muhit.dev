import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:scale-[0.98]",
    variant === "primary" &&
      "bg-accent text-accent-foreground shadow-[0_0_0_1px_rgba(0,255,153,0.2),0_12px_40px_-12px_rgba(0,255,153,0.6)] hover:bg-[#33ffad] hover:shadow-[0_0_0_1px_rgba(0,255,153,0.3),0_16px_50px_-12px_rgba(0,255,153,0.75)]",
    variant === "outline" &&
      "border border-border bg-white/[0.02] text-foreground hover:border-accent/40 hover:bg-accent-soft hover:text-accent",
    variant === "ghost" && "text-muted-strong hover:bg-white/[0.04] hover:text-foreground",
    size === "sm" && "h-9 px-4 text-sm",
    size === "md" && "h-11 px-5 text-sm",
    size === "lg" && "h-12 px-6 text-base",
    className,
  );
}
