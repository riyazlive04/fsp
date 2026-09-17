import type { CommunityExperience } from "@/data/community";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/motion/TextReveal";
import { cn } from "@/lib/cn";

const surfaces = ["bg-paper", "bg-white", "tone-dark", "bg-paper"];

/**
 * One community experience (Wednesday Masterclass, Mastermind, Catalyst
 * Connect, TTX). Layout alternates to keep the page rhythm asymmetric.
 */
export function ExperienceSection({ experience, index }: { experience: CommunityExperience; index: number }) {
  const dark = surfaces[index % surfaces.length] === "tone-dark";
  const flip = index % 2 === 1;
  const detailed = experience.list.some((item) => item.description);
  const words = experience.headline.replace(/\.$/, "");
  const hasStop = experience.headline.endsWith(".");

  return (
    <section
      id={experience.id}
      aria-labelledby={`${experience.id}-title`}
      className={cn("section-pad", surfaces[index % surfaces.length])}
    >
      <div className="container-fsp grid-fsp gap-y-12">
        <div className={cn("col-span-4 md:col-span-8 lg:col-span-6", flip && "lg:order-2 lg:col-start-7")}>
          <Eyebrow index={String(index + 1).padStart(2, "0")} className={cn("mb-8", dark ? "text-on-dark-muted" : "text-muted")}>
            Community experience
          </Eyebrow>
          <h2 id={`${experience.id}-title`} className="font-display text-[clamp(2.5rem,7vw,6.25rem)]">
            {experience.name}
          </h2>
          <TextReveal
            as="p"
            lines={[<>{words}{hasStop && <span key="s" className="text-orange">.</span>}</>]}
            className={cn("mt-8 max-w-xl text-[clamp(1.5rem,2.8vw,2.5rem)] font-semibold leading-[1.1] tracking-tight", dark ? "text-orange" : "text-navy")}
          />
          {experience.summary && (
            <p className={cn("mt-6 max-w-lg text-lede", dark ? "text-on-dark-muted" : "text-muted")}>{experience.summary}</p>
          )}
        </div>

        <div className={cn("col-span-4 md:col-span-8 lg:col-span-5 lg:self-end", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8")}>
          {experience.listLabel && (
            <p className={cn("eyebrow mb-4", dark ? "text-on-dark-muted" : "text-muted")}>{experience.listLabel}</p>
          )}
          <ol className={cn("border-t", dark ? "border-line-dark" : "border-line")}>
            {experience.list.map((item, i) => (
              <li
                key={item.title}
                data-reveal=""
                style={{ ["--reveal-i" as string]: i }}
                className={cn(
                  "grid grid-cols-[2.5rem_1fr] items-baseline gap-x-2 border-b",
                  detailed ? "py-5" : "py-3.5",
                  dark ? "border-line-dark" : "border-line",
                )}
              >
                <span className={cn("text-xs font-semibold tabular-nums", dark ? "text-orange" : "text-navy")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={cn("font-semibold tracking-tight", detailed ? "text-2xl" : "text-lg")}>{item.title}</span>
                {item.description && (
                  <span className={cn("col-start-2 mt-1", dark ? "text-on-dark-muted" : "text-muted")}>{item.description}</span>
                )}
              </li>
            ))}
          </ol>
          {experience.close && (
            <p className={cn("mt-8 text-lede font-semibold", dark ? "text-on-dark" : "text-ink")}>{experience.close}</p>
          )}
        </div>
      </div>
    </section>
  );
}
