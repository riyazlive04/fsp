import Link from "next/link";
import { community, experiences } from "@/data/community";
import { Arrow } from "@/components/ui/Arrow";
import { cn } from "@/lib/cn";

/** Community benefits as a large typographic run of words. */
export function CommunityBenefits({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-baseline gap-x-3 gap-y-1 md:gap-x-5", className)}>
      {community.benefits.map((benefit, i) => (
        <li
          key={benefit}
          data-reveal="fade"
          style={{ ["--reveal-i" as string]: i }}
          className="flex items-baseline gap-3 md:gap-5"
        >
          <span
            className={cn(
              "font-display text-[clamp(2rem,5.6vw,5.25rem)]",
              i % 3 === 1 ? (tone === "dark" ? "text-on-dark-muted" : "text-muted") : "",
            )}
          >
            {benefit}
          </span>
          {i < community.benefits.length - 1 && (
            <span aria-hidden="true" className="text-[clamp(1rem,2vw,1.75rem)] text-orange">
              ✦
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

/** Links to the four community experiences. */
export function CommunityExperiences({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <ul className={cn("grid border-t sm:grid-cols-2 lg:grid-cols-4", dark ? "border-line-dark" : "border-line")}>
      {experiences.map((exp, i) => (
        <li key={exp.id} className={cn("border-b sm:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0", dark ? "border-line-dark" : "border-line")}>
          <Link
            href={`/community#${exp.id}`}
            className={cn(
              "group flex h-full min-h-56 flex-col justify-between gap-10 p-5 transition-colors duration-500 md:p-7",
              dark ? "hover:bg-white/[0.04]" : "hover:bg-white",
            )}
          >
            <span className="flex items-center justify-between">
              <span className={cn("text-xs font-semibold tabular-nums", dark ? "text-on-dark-muted" : "text-muted")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <Arrow className="text-orange transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </span>
            <span>
              <span className="block text-2xl font-semibold tracking-tight">{exp.name}</span>
              <span className={cn("mt-2 block text-sm", dark ? "text-on-dark-muted" : "text-muted")}>{exp.headline}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
