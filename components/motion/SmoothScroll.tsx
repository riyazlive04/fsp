"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { getLenis, setLenis } from "@/lib/scroll";

/**
 * Global Lenis smooth scrolling.
 * - Not created at all for prefers-reduced-motion (native scrolling).
 * - Touch input stays native (Lenis default), which keeps mobile browsers
 *   behaving normally.
 * - Handles same-page anchor links with a header offset.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const create = () => {
      if (media.matches || getLenis()) return;
      const navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 80;
      const instance = new Lenis({
        autoRaf: true,
        lerp: 0.11,
        wheelMultiplier: 1,
        anchors: { offset: -(navHeight + 16) },
        stopInertiaOnNavigate: true,
        prevent: (node) => node.closest?.("[data-lenis-prevent]") != null,
      });
      setLenis(instance);
    };
    const destroy = () => {
      getLenis()?.destroy();
      setLenis(null);
    };
    const onChange = () => (media.matches ? destroy() : create());

    create();
    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
      destroy();
    };
  }, []);

  // New route: jump to top (or to the hash target) and re-measure.
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    const hash = window.location.hash;
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    lenis.resize();
    if (target) {
      requestAnimationFrame(() => lenis.scrollTo(target, { immediate: true, offset: -(parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 80) - 16 }));
    } else {
      lenis.scrollTo(0, { immediate: true, force: true });
    }
  }, [pathname]);

  return null;
}
