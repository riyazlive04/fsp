"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Chapter = { id: string; label: string };

/** Sticky chapter index that tracks the chapter currently in view. */
export function ChapterNav({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(chapters[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [chapters]);

  return (
    <nav aria-label="Chapters" className="sticky top-[calc(var(--nav-h)+2rem)]">
      <ol className="space-y-1 border-l border-line">
        {chapters.map((c, i) => {
          const on = c.id === active;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                aria-current={on ? "location" : undefined}
                className={cn(
                  "-ml-px flex min-h-10 items-center gap-3 border-l-2 pl-4 text-sm transition-colors duration-300",
                  on ? "border-orange font-semibold text-ink" : "border-transparent text-muted hover:text-ink",
                )}
              >
                <span className="w-5 text-[0.6875rem] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                {c.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
