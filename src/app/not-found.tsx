import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
        404 — Not found
      </p>
      <h1 className="mt-5 text-5xl font-semibold tracking-tight sm:text-7xl">
        Wrong turn.
      </h1>
      <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-muted">
        This page doesn&apos;t exist. The work, however, is still over there.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={buttonVariants({ size: "md" })}>
          <ArrowLeft className="size-4" strokeWidth={1.8} />
          Back home
        </Link>
        <Link
          href="/projects"
          className={buttonVariants({ variant: "outline", size: "md" })}
        >
          Browse projects
        </Link>
      </div>
    </Container>
  );
}
