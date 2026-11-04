"use client";

import { Printer } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function CVPrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={buttonVariants({ size: "sm" })}
    >
      <Printer className="size-4" strokeWidth={1.8} />
      Print / Save as PDF
    </button>
  );
}
