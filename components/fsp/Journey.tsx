"use client";

import { useEffect, useRef, useState } from "react";
import { journey } from "@/data/fsp";
import { cn } from "@/lib/cn";
import { ANY_MOTION, useScrollScene } from "@/components/motion/useScrollScene";

/**
 * LEARN → PRACTICE → CREATE → BUILD → CONNECT → GROW
 *
 * Desktop: CSS-sticky stage word on the left; the active stage is chosen by an
 * IntersectionObserver as step blocks pass the viewport centre, and a GSAP
 * scrubbed line tracks progress. Mobile: a vertical timeline. Without JS the
 * full list of stages is readable.
 */
export function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-journey-step]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.journeyStep));
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    steps.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useScrollScene(sectionRef, (mm, { gsap }, root) => {
    mm.add(ANY_MOTION, () => {
      const bar = root.querySelector<HTMLElement>("[data-journey-progress]");
      const list = root.querySelector<HTMLElement>("[data-journey-list]");
      if (!bar || !list) return;
      gsap.fromTo(
        bar,
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: list, start: "top 50%", end: "bottom 50%", scrub: true } },
      );
    });
  });

  return (
    <div ref={sectionRef} className="grid-fsp relative">
      {/* Sticky stage display (desktop) */}
      <div className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-0 flex h-dvh flex-col justify-center" aria-hidden="true">
          <p className="eyebrow mb-6 flex items-center gap-3 text-muted">
            <span className="tabular-nums text-ink">{String(active + 1).padStart(2, "0")}</span>
            <span className="h-px w-10 bg-line-strong" />
            <span className="tabular-nums">{String(journey.length).padStart(2, "0")}</span>
          </p>
          <div className="relative h-[clamp(5.5rem,10.5vw,11rem)]">
            {journey.map((stage, i) => (
              <p
                key={stage.key}
                className={cn(
                  "font-display absolute inset-0 text-[clamp(5rem,10vw,10.5rem)] transition-[opacity,transform] duration-700 ease-[var(--ease-out)]",
                  i === active ? "translate-y-0 opacity-100" : i < active ? "-translate-y-8 opacity-0" : "translate-y-8 opacity-0",
                  i === journey.length - 1 ? "text-navy" : "text-ink",
                )}
              >
                {stage.title}
                <span className="text-orange">.</span>
              </p>
            ))}
          </div>
          <ol className="mt-10 flex flex-wrap gap-x-5 gap-y-2">
            {journey.map((stage, i) => (
              <li
                key={stage.key}
                className={cn(
                  "eyebrow transition-colors duration-500",
                  i === active ? "text-ink underline decoration-orange decoration-2 underline-offset-8" : i < active ? "text-navy" : "text-muted",
                )}
              >
                {stage.title}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Steps */}
      <ol data-journey-list className="relative col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8">
        <span aria-hidden="true" className="absolute bottom-0 left-[0.4375rem] top-0 w-px bg-line lg:left-0" />
        <span
          aria-hidden="true"
          data-journey-progress
          className="absolute bottom-0 left-[0.4375rem] top-0 w-px origin-top bg-orange lg:left-0"
        />
        {journey.map((stage, i) => (
          <li
            key={stage.key}
            data-journey-step={i}
            className="relative pb-16 pl-10 last:pb-0 lg:flex lg:min-h-[70dvh] lg:flex-col lg:justify-center lg:pb-0 lg:pl-12"
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-0 top-2 size-[0.9375rem] rounded-full border-2 transition-colors duration-500 lg:-left-[0.4375rem] lg:top-auto",
                i <= active ? "border-orange bg-orange" : "border-line-strong bg-paper",
              )}
            />
            <p className="eyebrow tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="font-display mt-3 text-[clamp(3rem,14vw,4.5rem)] lg:text-[clamp(2rem,3.2vw,3rem)]">{stage.title}</h3>
            <p className="mt-4 max-w-md text-lede text-muted">{stage.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
