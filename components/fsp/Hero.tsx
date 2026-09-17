import { hero, journey } from "@/data/fsp";
import { joinHref } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { TrajectoryLines } from "./TrajectoryLines";

/**
 * Asymmetric editorial hero. Everything above the fold is server-rendered and
 * animated with CSS keyframes only — no JavaScript in the critical path.
 *
 * Desktop composition: the headline runs full width while the supporting
 * message and CTAs occupy the open space to the right of its short first lines.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <TrajectoryLines
        spark
        draw
        className="pointer-events-none absolute -right-[40%] bottom-[18%] h-[55%] w-[130%] text-navy/25 md:-right-[6%] md:bottom-[8%] md:h-[80%] md:w-[62%]"
      />

      <div className="container-fsp relative pt-[calc(var(--nav-h)+1.75rem)] md:pt-[calc(var(--nav-h)+2.5rem)]">
        <div className="hero-fade flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4" style={{ ["--fade-i" as string]: -5 }}>
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="inline-block size-2 rounded-full bg-orange" />
            {hero.programName}
          </p>
          <p className="eyebrow hidden text-muted sm:block">{hero.tagline.join(" ")}</p>
        </div>

        <div className="grid-fsp relative pt-8 md:pt-12">
          <h1 id="hero-title" className="font-display text-hero col-span-4 md:col-span-8 lg:col-span-12 lg:col-start-1 lg:row-start-1">
            {hero.headline.map((line, i) => (
              <span
                key={line}
                className={`line-mask hero-line ${i === 1 ? "pl-[8%] md:pl-[14%]" : ""}`}
                style={{ ["--line-i" as string]: i }}
              >
                <span>
                  {i === hero.headline.length - 1 ? (
                    <>
                      {line.slice(0, -1)}
                      <span className="text-orange">.</span>
                    </>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>

          <div
            className="hero-fade col-span-4 mt-10 md:col-span-5 md:col-start-4 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:mt-3"
            style={{ ["--fade-i" as string]: 1 }}
          >
            <p className="sr-only">{hero.programName}. {hero.tagline.join(" ")}</p>
            <ul className="text-[clamp(1.25rem,2vw,1.75rem)] font-semibold leading-[1.2] tracking-tight">
              {hero.support.map((line, i) => (
                <li key={line} className="flex items-baseline gap-4 border-b border-line py-2 first:pt-0">
                  <span className="w-5 text-[0.6875rem] font-semibold tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                  {line}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Button href={joinHref} size="lg">
                {hero.cta.primary}
              </Button>
              <Button href="#what-is-fsp" variant="text">
                {hero.cta.secondary}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid-fsp gap-y-6 pb-12 pt-10 md:pb-16 md:pt-12">
          <p
            className="hero-fade col-span-4 max-w-md text-[0.9375rem] text-muted md:col-span-5 lg:col-span-4"
            style={{ ["--fade-i" as string]: 3 }}
          >
            {hero.intro}
          </p>
          <p
            className="hero-fade eyebrow col-span-4 flex items-center gap-3 self-end text-muted md:col-span-3 md:justify-end lg:col-span-4 lg:col-start-9"
            style={{ ["--fade-i" as string]: 4 }}
            aria-hidden="true"
          >
            <span>Scroll</span>
            <span className="h-px w-12 bg-line-strong" />
          </p>
        </div>
      </div>

      <div className="hero-fade tone-dark" style={{ ["--fade-i" as string]: 4 }}>
        <div className="container-fsp flex items-center gap-6 py-4">
          <p className="eyebrow hidden shrink-0 border-r border-line-dark pr-6 text-orange sm:block">{hero.tagline.join(" ")}</p>
          <Marquee
            items={journey.map((s) => s.title.toUpperCase())}
            duration={32}
            className="font-display text-[1.75rem] text-on-dark md:text-[2.25rem]"
          />
        </div>
      </div>
    </section>
  );
}
