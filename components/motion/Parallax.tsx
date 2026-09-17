"use client";

import { useRef, type ReactNode } from "react";
import { DESKTOP_MOTION, useScrollScene } from "./useScrollScene";

type Props = { children: ReactNode; className?: string; /** Travel in % of element height. */ speed?: number };

/** Subtle scroll parallax for decorative elements (desktop, motion allowed only). */
export function Parallax({ children, className, speed = 12 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useScrollScene(ref, (mm, { gsap }, root) => {
    mm.add(DESKTOP_MOTION, () => {
      gsap.fromTo(
        root,
        { yPercent: -speed / 2 },
        {
          yPercent: speed / 2,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
  });

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {children}
    </div>
  );
}
