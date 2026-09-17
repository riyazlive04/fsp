"use client";

import { useEffect, type RefObject } from "react";
import { loadGsap } from "@/lib/gsap";

type Modules = Awaited<ReturnType<typeof loadGsap>>;
type MatchMedia = ReturnType<Modules["gsap"]["matchMedia"]>;

/**
 * Attaches a GSAP ScrollTrigger scene to a component.
 *
 * GSAP is imported lazily. The setup receives a scoped `gsap.matchMedia()`
 * so scenes can target breakpoints; everything is reverted on unmount.
 * Scenes never run when the user prefers reduced motion — components must
 * render a complete, readable static state without them.
 */
export function useScrollScene<T extends HTMLElement>(
  ref: RefObject<T | null>,
  setup: (mm: MatchMedia, modules: Modules, root: T) => void,
) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let mm: MatchMedia | undefined;

    loadGsap().then((modules) => {
      if (cancelled || !ref.current) return;
      mm = modules.gsap.matchMedia(root);
      setup(mm, modules, root);
      modules.ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      mm?.revert();
    };
    // Scenes are set up once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export const DESKTOP_MOTION = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
export const ANY_MOTION = "(prefers-reduced-motion: no-preference)";
