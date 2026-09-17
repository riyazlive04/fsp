import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { TrajectoryLines } from "@/components/fsp/TrajectoryLines";

type Props = {
  eyebrow: string;
  lines: ReactNode[];
  aside?: ReactNode;
  children?: ReactNode;
  className?: string;
  size?: "hero" | "mega";
};

/**
 * Asymmetric editorial hero for inner pages. Headline animates on load with
 * CSS only (no JS needed above the fold).
 */
export function PageHero({ eyebrow, lines, aside, children, className, size = "mega" }: Props) {
  return (
    <section className={cn("relative overflow-hidden pt-[calc(var(--nav-h)+3.5rem)] pb-16 md:pt-[calc(var(--nav-h)+6rem)] md:pb-24", className)}>
      <TrajectoryLines className="pointer-events-none absolute -right-[20%] top-0 hidden h-full w-[80%] text-navy/15 md:block" />
      <div className="container-fsp relative">
        <div className="hero-fade mb-10 md:mb-14" style={{ ["--fade-i" as string]: -4 }}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h1 className={cn("font-display", size === "hero" ? "text-hero" : "text-mega")}>
          {lines.map((line, i) => (
            <span key={i} className="line-mask hero-line" style={{ ["--line-i" as string]: i }}>
              <span>{line}</span>
            </span>
          ))}
        </h1>
        {(aside || children) && (
          <div className="grid-fsp mt-12 gap-y-8 md:mt-20">
            {aside && (
              <div className="hero-fade col-span-4 md:col-span-6 lg:col-span-5 lg:col-start-7" style={{ ["--fade-i" as string]: 1 }}>
                {aside}
              </div>
            )}
            {children && (
              <div className="hero-fade col-span-4 md:col-span-8 lg:col-span-12" style={{ ["--fade-i" as string]: 2 }}>
                {children}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
