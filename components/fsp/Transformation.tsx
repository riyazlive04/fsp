"use client";

import { useRef } from "react";
import { transformationStages } from "@/data/fsp";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DESKTOP_MOTION, useScrollScene } from "@/components/motion/useScrollScene";

/**
 * Trainer → Facilitator → Facilitator with impact.
 *
 * Static layout: the three stages rise diagonally (the logo's trajectory).
 * Desktop + motion: the section pins and one stage morphs into the next,
 * while a rising path draws with scroll progress.
 */
export function Transformation() {
  const ref = useRef<HTMLElement>(null);

  useScrollScene(ref, (mm, { gsap }, root) => {
    mm.add(DESKTOP_MOTION, () => {
      const stage = root.querySelector<HTMLElement>("[data-stage-wrap]");
      const items = gsap.utils.toArray<HTMLElement>("[data-stage]", root);
      const path = root.querySelector<SVGPathElement>("[data-stage-path]");
      const counter = root.querySelectorAll<HTMLElement>("[data-stage-count]");
      if (!stage || items.length !== 3) return;

      root.dataset.enhanced = "true";
      gsap.set(items, { autoAlpha: 0, yPercent: 40 });
      gsap.set(items[0], { autoAlpha: 1, yPercent: 0 });
      if (path) gsap.set(path, { strokeDasharray: 1, strokeDashoffset: 1 });

      const setCount = (i: number) =>
        counter.forEach((el, j) => el.toggleAttribute("data-on", j <= i));
      setCount(0);

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => setCount(self.progress < 0.36 ? 0 : self.progress < 0.72 ? 1 : 2),
        },
      });

      if (path) tl.to(path, { strokeDashoffset: 0, ease: "none", duration: 2.4 }, 0);
      tl.to(items[0], { autoAlpha: 0, yPercent: -40, duration: 0.6 }, 0.5)
        .to(items[1], { autoAlpha: 1, yPercent: 0, duration: 0.6 }, 0.62)
        .to(items[1], { autoAlpha: 0, yPercent: -40, duration: 0.6 }, 1.45)
        .to(items[2], { autoAlpha: 1, yPercent: 0, duration: 0.6 }, 1.57)
        .to({}, { duration: 0.4 });

      return () => {
        delete root.dataset.enhanced;
      };
    });
  });

  return (
    <section ref={ref} aria-labelledby="transformation-title" className="group/tr relative bg-white">
      <div data-stage-wrap className="relative overflow-hidden group-data-[enhanced=true]/tr:h-dvh">
        <svg
          aria-hidden="true"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 hidden size-full group-data-[enhanced=true]/tr:block"
          fill="none"
        >
          <path data-stage-path d="M0 560 C 320 540, 560 420, 720 260 S 930 40, 1000 10" pathLength={1} stroke="var(--fsp-orange)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>

        <div className="container-fsp section-pad relative flex h-full flex-col group-data-[enhanced=true]/tr:justify-between group-data-[enhanced=true]/tr:py-[calc(var(--nav-h)+2rem)]">
          <div className="flex items-end justify-between gap-6">
            <div>
              <Eyebrow index="02">The shift</Eyebrow>
              <h2 id="transformation-title" className="sr-only">
                {transformationStages.join(" to ")}
              </h2>
            </div>
            <ol aria-hidden="true" className="hidden gap-2 group-data-[enhanced=true]/tr:flex">
              {transformationStages.map((s, i) => (
                <li
                  key={s}
                  data-stage-count
                  className="eyebrow flex items-center gap-2 text-muted transition-colors duration-500 data-[on]:text-ink"
                >
                  <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  {i < 2 && <span className="h-px w-8 bg-current" />}
                </li>
              ))}
            </ol>
          </div>

          {/* Static composition: stages step upward. Enhanced: stacked + morph. */}
          <ol
            aria-hidden="true"
            className="relative mt-14 grid gap-10 md:gap-6 group-data-[enhanced=true]/tr:mt-0 group-data-[enhanced=true]/tr:flex-1 group-data-[enhanced=true]/tr:gap-0"
          >
            {transformationStages.map((stage, i) => (
              <li
                key={stage}
                data-stage
                className="flex flex-col md:flex-row md:items-baseline md:gap-8 group-data-[enhanced=true]/tr:absolute group-data-[enhanced=true]/tr:inset-0 group-data-[enhanced=true]/tr:flex-col! group-data-[enhanced=true]/tr:items-start! group-data-[enhanced=true]/tr:justify-center group-data-[enhanced=true]/tr:gap-4 group-data-[enhanced=true]/tr:pl-0!"
                style={{ paddingLeft: `calc(${i} * min(14vw, 12rem))` }}
              >
                <span className="eyebrow mb-3 text-muted md:mb-0 md:w-16">{String(i + 1).padStart(2, "0")}</span>
                <span
                  className={`font-display block ${i === 2 ? "text-navy" : i === 0 ? "text-muted" : "text-ink"} text-[clamp(2.5rem,10vw,6rem)] group-data-[enhanced=true]/tr:text-[clamp(4rem,12vw,13rem)]`}
                >
                  {i === 2 ? (
                    <>
                      Facilitator
                      <br />
                      with impact<span className="text-orange">.</span>
                    </>
                  ) : (
                    stage
                  )}
                </span>
                {i < 2 && (
                  <span className="mt-4 text-3xl text-orange md:hidden" aria-hidden="true">
                    ↓
                  </span>
                )}
              </li>
            ))}
          </ol>

          <p className="mt-14 max-w-sm text-sm text-muted group-data-[enhanced=true]/tr:mt-0">
            A conceptual view of the facilitator journey.
          </p>
        </div>
      </div>
    </section>
  );
}
