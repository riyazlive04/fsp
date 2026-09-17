"use client";

import type Lenis from "lenis";

/**
 * Central scroll orchestration.
 *
 * A single Lenis instance (created by <SmoothScroll />) is registered here.
 * GSAP ScrollTrigger is connected lazily the first time a scroll scene loads,
 * so there is exactly one smooth-scroll loop and one ScrollTrigger update
 * subscription for the whole site.
 */

let lenis: Lenis | null = null;
const listeners = new Set<(instance: Lenis | null) => void>();

export function setLenis(instance: Lenis | null) {
  lenis = instance;
  listeners.forEach((fn) => fn(instance));
}

export function getLenis() {
  return lenis;
}

export function onLenisChange(fn: (instance: Lenis | null) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

/** Pause page scrolling (e.g. while an overlay is open). */
export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
