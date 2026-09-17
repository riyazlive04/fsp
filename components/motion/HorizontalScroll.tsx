"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { DESKTOP_MOTION, useScrollScene } from "./useScrollScene";

type Props = {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  label?: string;
};

/**
 * Horizontal scrolling narrative. On desktop with motion allowed the section
 * pins and the track translates horizontally with scroll. Everywhere else the
 * panels simply stack vertically (the default markup).
 */
export function HorizontalScroll({ children, className, trackClassName, label }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useScrollScene(sectionRef, (mm, { gsap }, root) => {
    mm.add(DESKTOP_MOTION, () => {
      const track = root.querySelector<HTMLElement>("[data-hscroll-track]");
      const progress = root.querySelector<HTMLElement>("[data-hscroll-progress]");
      if (!track) return;
      root.dataset.enhanced = "true";
      const distance = () => Math.max(0, track.scrollWidth - root.clientWidth);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      tl.to(track, { x: () => -distance(), ease: "none" }, 0);
      if (progress) tl.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);

      return () => {
        delete root.dataset.enhanced;
      };
    });
  });

  return (
    <div ref={sectionRef} className={cn("group/hscroll relative overflow-hidden", className)} aria-label={label} role={label ? "region" : undefined}>
      <div
        data-hscroll-track
        className={cn(
          "flex flex-col gap-6 group-data-[enhanced=true]/hscroll:w-max group-data-[enhanced=true]/hscroll:flex-row group-data-[enhanced=true]/hscroll:gap-8",
          trackClassName,
        )}
      >
        {children}
      </div>
      <div className="pointer-events-none absolute inset-x-[var(--gutter)] bottom-8 hidden h-px bg-current/15 group-data-[enhanced=true]/hscroll:block">
        <div data-hscroll-progress className="h-full origin-left bg-orange" />
      </div>
    </div>
  );
}
