import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small uppercase label with an orange tick; optional index like "(03)". */
export function Eyebrow({ children, index, className }: { children: ReactNode; index?: string; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", className)}>
      <span aria-hidden="true" className="inline-block h-px w-6 bg-orange" />
      {index && <span className="tabular-nums">({index})</span>}
      <span>{children}</span>
    </p>
  );
}
