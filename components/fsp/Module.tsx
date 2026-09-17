import type { Module as ModuleType } from "@/data/programs";
import { cn } from "@/lib/cn";

/**
 * Detailed module panel for the Core Program page. Designed to work both as
 * a stacked block and as a panel inside HorizontalScroll (group "hscroll").
 */
export function Module({ module, index }: { module: ModuleType; index: number }) {
  const dark = index === 1;
  return (
    <article
      aria-labelledby={`module-${module.number}`}
      className={cn(
        "flex flex-col border p-6 md:p-10 lg:group-data-[enhanced=true]/hscroll:h-[calc(100dvh-var(--nav-h)-7rem)] lg:group-data-[enhanced=true]/hscroll:w-[min(78vw,64rem)] lg:group-data-[enhanced=true]/hscroll:shrink-0",
        dark ? "border-navy bg-navy text-white" : "border-line bg-white text-ink",
      )}
    >
      <div className="flex items-start justify-between gap-6">
        <p className={cn("eyebrow", dark ? "text-on-dark-muted" : "text-muted")}>{module.label}</p>
        <p className={cn("font-display text-[clamp(5rem,12vw,11rem)] leading-[0.72]", dark ? "text-orange" : "text-navy")}>{module.number}</p>
      </div>
      <div className="mt-10 grid gap-10 md:mt-auto md:grid-cols-2 md:items-end md:gap-12 md:pt-12">
        <h2 id={`module-${module.number}`} className="font-display text-[clamp(2.25rem,4.2vw,4.25rem)]">
          {module.title}
        </h2>
        <ol className={cn("border-t", dark ? "border-line-dark" : "border-line")}>
          {module.topics.map((topic, i) => (
            <li
              key={topic}
              className={cn("flex items-baseline gap-4 border-b py-3 text-base md:text-lg", dark ? "border-line-dark" : "border-line")}
            >
              <span className={cn("w-6 text-xs font-semibold tabular-nums", dark ? "text-on-dark-muted" : "text-muted")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {topic}
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}
