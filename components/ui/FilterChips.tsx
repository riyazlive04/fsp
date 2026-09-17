"use client";

import { cn } from "@/lib/cn";

type Option = { value: string; label: string; count?: number };

/** Single-select filter implemented as a radio group of toggle buttons. */
export function FilterChips({
  label,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div role="group" aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.value)}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 border px-4 text-[0.8125rem] font-medium transition-colors duration-300",
              on ? "border-navy bg-navy text-white" : "border-line-strong bg-transparent text-ink hover:border-navy",
            )}
          >
            {o.label}
            {typeof o.count === "number" && (
              <span className={cn("text-[0.6875rem] tabular-nums", on ? "text-orange" : "text-muted")}>{o.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
