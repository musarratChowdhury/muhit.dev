import type { Stat } from "@/types/content";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function Stats({ stats }: { stats: Stat[] }) {
  return (
    <section className="relative border-y border-border">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.06}
              className={cn(
                "border-border",
                index % 2 === 1 && "border-l",
                index >= 2 && "border-t",
                index > 0 && "lg:border-l",
                index >= 2 && "lg:border-t-0",
              )}
            >
              <div className="px-5 py-7 sm:px-7 sm:py-9">
                <p className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-muted sm:text-[11px]">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
