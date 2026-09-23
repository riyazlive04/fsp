import { hero, journey } from "@/data/fsp";
import { joinHref } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { TrajectoryLines } from "./TrajectoryLines";

/**
 * Asymmetric editorial hero. Everything above the fold is server-rendered and
 * animated with CSS keyframes only — no JavaScript in the critical path.
 *
 * Responsive composition:
 * - Large desktop: Two-column layout (Headline on left 7 cols, numbered benefits + CTAs on right 5 cols)
 * - Tablet & Mobile: Clean single-column stack (Headline -> Benefits -> CTAs -> Wide Description)
 * - Description: Wide editorial text block spanning ~75-85% of content width on desktop
 * - Safe screen boundaries respecting gutters, viewport, and floating chat widget
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative w-full max-w-full box-border">
      {/* Background trajectory lines contained safely without overflowing page boundaries */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <TrajectoryLines
          spark
          draw
          className="absolute -right-[40%] bottom-[18%] h-[55%] w-[130%] text-navy/25 md:-right-[6%] md:bottom-[8%] md:h-[80%] md:w-[62%]"
        />
      </div>

      <div className="container-fsp relative flex flex-col pt-[calc(var(--nav-h)+1.25rem)] md:pt-[calc(var(--nav-h)+2rem)] lg:pt-[calc(var(--nav-h)+2.25rem)]">
        {/* Eyebrow sub-bar */}
        <div
          className="hero-fade flex flex-wrap items-center justify-between gap-4 border-b border-line pb-3 sm:pb-4"
          style={{ ["--fade-i" as string]: -5 }}
        >
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="inline-block size-2 rounded-full bg-orange" />
            {hero.programName}
          </p>
          <p className="eyebrow hidden text-muted sm:block">{hero.tagline.join(" ")}</p>
        </div>

        {/* Main Hero Grid: 2 columns on desktop (lg+), single column on tablet & mobile */}
        <div className="grid-fsp relative pt-6 md:pt-8 lg:pt-10 items-start">
          {/* Left Column: Headline */}
          <h1
            id="hero-title"
            className="font-display col-span-4 md:col-span-8 lg:col-span-7 text-[clamp(2.5rem,7.5vw,4.5rem)] md:text-[clamp(3.75rem,7vw,5.5rem)] lg:text-[clamp(3.5rem,5.4vw,6.5rem)] xl:text-[clamp(4.25rem,6vw,7.5rem)]"
          >
            {hero.headline.map((line, i) => (
              <span
                key={line}
                className="line-mask hero-line"
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

          {/* Right Column: Numbered benefits + CTA buttons */}
          <div
            className="hero-fade col-span-4 md:col-span-8 lg:col-span-5 mt-8 md:mt-10 lg:mt-2 lg:pl-4 xl:pl-8"
            style={{ ["--fade-i" as string]: 1 }}
          >
            <p className="sr-only">
              {hero.programName}. {hero.tagline.join(" ")}
            </p>
            <ul className="text-[clamp(1.125rem,2.4vw,1.4rem)] md:text-[clamp(1.25rem,2vw,1.5rem)] lg:text-[clamp(1.125rem,1.5vw,1.45rem)] xl:text-[1.5rem] font-semibold leading-[1.25] tracking-tight">
              {hero.support.map((line, i) => (
                <li key={line} className="flex items-baseline gap-3 sm:gap-4 border-b border-line py-2.5 first:pt-0">
                  <span className="w-5 text-[0.6875rem] font-semibold tabular-nums text-muted shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-x-6 sm:gap-x-7 gap-y-3.5">
              <Button href={joinHref} size="lg">
                {hero.cta.primary}
              </Button>
              <Button href="#what-is-fsp" variant="text">
                {hero.cta.secondary}
              </Button>
            </div>
          </div>
        </div>

        {/* Wide Editorial Description & Scroll Indicator */}
        <div className="grid-fsp items-end gap-y-4 pt-8 pb-6 md:pt-10 md:pb-8 border-t border-line/60 mt-8 md:mt-10">
          <p
            className="hero-fade col-span-4 md:col-span-8 lg:col-span-10 xl:col-span-9 text-[0.9375rem] sm:text-base lg:text-[1.0625rem] leading-relaxed text-muted"
            style={{ ["--fade-i" as string]: 3 }}
          >
            {hero.intro}
          </p>
          <p
            className="hero-fade eyebrow hidden lg:flex items-center justify-end gap-3 text-muted lg:col-span-2 xl:col-span-3 pb-1"
            style={{ ["--fade-i" as string]: 4 }}
            aria-hidden="true"
          >
            <span>Scroll</span>
            <span className="h-px w-10 xl:w-12 bg-line-strong" />
          </p>
        </div>
      </div>

      {/* Marquee Banner */}
      <div className="hero-fade tone-dark" style={{ ["--fade-i" as string]: 4 }}>
        <div className="container-fsp flex items-center gap-6 py-3.5 md:py-4">
          <p className="eyebrow hidden shrink-0 border-r border-line-dark pr-6 text-orange sm:block">
            {hero.tagline.join(" ")}
          </p>
          <Marquee
            items={journey.map((s) => s.title.toUpperCase())}
            duration={32}
            className="font-display text-[1.5rem] sm:text-[1.75rem] text-on-dark md:text-[2.25rem]"
          />
        </div>
      </div>
    </section>
  );
}
