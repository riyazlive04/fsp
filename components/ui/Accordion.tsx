"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type AccordionItem = { id?: string; title: string; content: ReactNode };

/**
 * Accessible accordion (WAI-ARIA disclosure pattern): real buttons with
 * aria-expanded/aria-controls, region panels, keyboard operable.
 */
export function Accordion({
  items,
  defaultOpen = 0,
  className,
  headingLevel: Heading = "h3",
}: {
  items: AccordionItem[];
  defaultOpen?: number | null;
  className?: string;
  headingLevel?: "h2" | "h3" | "h4";
}) {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(() => new Set(defaultOpen === null ? [] : [defaultOpen]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className={cn("border-t border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const buttonId = `${baseId}-button-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={item.title} id={item.id} className="border-b border-line">
            <Heading>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-3 py-6 text-left md:grid-cols-[5rem_1fr_auto] md:py-8"
              >
                <span className="text-sm font-semibold tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[clamp(1.25rem,2.6vw,2rem)] font-semibold leading-tight tracking-tight transition-colors group-hover:text-navy">
                  {item.title}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative mt-2 block size-5 shrink-0 transition-transform duration-500 ease-[var(--ease-out)] md:size-6",
                    isOpen && "rotate-45",
                  )}
                >
                  <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-current" />
                  <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-current" />
                </span>
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out)]",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="pb-8 pl-[calc(2.5rem+0.75rem)] pr-8 text-lede text-muted md:pl-[calc(5rem+0.75rem)] md:pb-10">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
