"use client";

import { getLenis, onLenisChange } from "./scroll";

type GsapModules = {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
};

let loading: Promise<GsapModules> | null = null;
let ready: Promise<void> | null = null;

/**
 * Resolves on the visitor's first scroll/interaction, or after a short delay —
 * keeping GSAP out of the startup window while making sure every scene is
 * initialised before its section is reached.
 */
function whenInteractive(): Promise<void> {
  if (!ready) {
    ready = new Promise((resolve) => {
      const events = ["scroll", "wheel", "touchstart", "pointerdown", "keydown"] as const;
      const done = () => {
        events.forEach((e) => window.removeEventListener(e, done));
        clearTimeout(timer);
        resolve();
      };
      events.forEach((e) => window.addEventListener(e, done, { once: true, passive: true }));
      const timer = setTimeout(done, 3500);
      if (window.scrollY > 0) done();
    });
  }
  return ready;
}

/**
 * Loads GSAP + ScrollTrigger on demand (kept out of the initial bundle) and
 * wires ScrollTrigger to the shared Lenis instance exactly once.
 */
export function loadGsap(): Promise<GsapModules> {
  if (!loading) {
    loading = whenInteractive().then(() => Promise.all([import("gsap"), import("gsap/ScrollTrigger")])).then(([g, st]) => {
      const { gsap } = g;
      const { ScrollTrigger } = st;
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true });

      let detach: (() => void) | undefined;
      const attach = (instance: ReturnType<typeof getLenis>) => {
        detach?.();
        detach = instance ? instance.on("scroll", ScrollTrigger.update) : undefined;
      };
      attach(getLenis());
      onLenisChange(attach);

      if (document.fonts?.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }
      return { gsap, ScrollTrigger };
    });
  }
  return loading;
}
