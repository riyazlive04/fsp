"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One IntersectionObserver for every [data-reveal] element on the page.
 * Elements get `.is-inview` once and are then unobserved.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reveal = (el: Element) => el.classList.add("is-inview");

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const scan = () =>
      document.querySelectorAll("[data-reveal]:not(.is-inview)").forEach((el) => io.observe(el));
    scan();

    // Pick up content rendered later (filters, client islands).
    let frame = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
