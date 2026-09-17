"use client";

import { useRef } from "react";
import { problem } from "@/data/fsp";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/motion/TextReveal";
import { ANY_MOTION, useScrollScene } from "@/components/motion/useScrollScene";

/**
 * "Being a good trainer is not enough." — sticky headline with an editorial
 * list whose rows light up as they cross the centre of the viewport.
 */
export function ProblemList() {
  const ref = useRef<HTMLElement>(null);

  useScrollScene(ref, (mm, { gsap, ScrollTrigger }, root) => {
    mm.add(ANY_MOTION, () => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-problem-row]", root);
      gsap.set(rows.map((row) => row.querySelector("[data-problem-text]")), { opacity: 0.5 });
      rows.forEach((row) => {
        const text = row.querySelector("[data-problem-text]");
        ScrollTrigger.create({
          trigger: row,
          start: "top 62%",
          end: "bottom 38%",
          onToggle: (self) => {
            gsap.to(text, { opacity: self.isActive ? 1 : 0.5, duration: 0.5, ease: "power2.out", overwrite: true });
            row.toggleAttribute("data-active", self.isActive);
          },
        });
      });
    });
  });

  return (
    <section ref={ref} aria-labelledby="problem-title" className="tone-dark section-pad relative">
      <div className="container-fsp grid-fsp gap-y-14">
        <div className="col-span-4 md:col-span-8 lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
            <Eyebrow index="01" className="mb-8 text-on-dark-muted">{problem.eyebrow}</Eyebrow>
            <TextReveal
              id="problem-title"
              lines={[problem.headline[0], <>{problem.headline[1].slice(0, -1)}<span className="text-orange">.</span></>]}
              className="font-display text-display"
            />
            <div className="mt-10 space-y-1 text-lede text-on-dark-muted">
              {problem.lead.map((line, i) => (
                <p key={line} className={i === problem.lead.length - 1 ? "pt-3 font-semibold text-on-dark" : undefined}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
          <p className="eyebrow mb-6 text-on-dark-muted">Great facilitators</p>
          <ol className="border-t border-line-dark">
            {problem.points.map((point, i) => (
              <li
                key={point}
                data-problem-row
                className="group grid grid-cols-[2.75rem_1fr] items-baseline gap-2 border-b border-line-dark py-5 md:grid-cols-[4.5rem_1fr] md:py-7"
              >
                <span className="text-sm font-semibold tabular-nums text-orange">{String(i + 1).padStart(2, "0")}</span>
                <span data-problem-text className="text-[clamp(1.5rem,3.4vw,2.75rem)] font-semibold leading-[1.05] tracking-tight transition-transform duration-700 ease-[var(--ease-out)] group-data-[active]:translate-x-2">
                  {point}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-12 text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight md:mt-16">
            <span className="text-orange">→ </span>
            {problem.close}
          </p>
        </div>
      </div>
    </section>
  );
}
