"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { m } from "framer-motion";
import { joinHref, primaryNav, site, talkHref } from "@/data/site";
import { Arrow } from "@/components/ui/Arrow";
import { lockScroll } from "@/lib/scroll";

const ease = [0.16, 1, 0.3, 1] as const;

/** Full-screen overlay menu with focus trap, Escape to close and scroll lock. */
export function MobileMenu({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    lockScroll(true);
    ref.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !ref.current) return;
      const focusables = ref.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      lockScroll(false);
      previous?.focus?.();
    };
  }, [onClose]);

  let index = 0;

  return (
    <m.div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      data-lenis-prevent
      className="tone-dark fixed inset-0 z-[60] flex flex-col overflow-y-auto lg:hidden"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.6, ease }}
    >
      <div className="container-fsp flex h-[var(--nav-h)] shrink-0 items-center justify-between">
        <span className="eyebrow text-on-dark-muted">Menu</span>
        <button type="button" onClick={onClose} className="inline-flex min-h-11 items-center gap-3 eyebrow" aria-label="Close menu">
          Close
          <span aria-hidden="true" className="relative block size-4">
            <span className="absolute left-0 top-1/2 h-0.5 w-full rotate-45 bg-current" />
            <span className="absolute left-0 top-1/2 h-0.5 w-full -rotate-45 bg-current" />
          </span>
        </button>
      </div>

      <nav aria-label="Mobile" className="container-fsp flex-1 pb-8 pt-4">
        <ul>
          {[{ label: "Home", href: "/" } as const, ...primaryNav].map((item) => {
            const i = index++;
            return (
              <m.li
                key={item.label}
                className="border-b border-line-dark"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.18 + i * 0.05 }}
              >
                {"href" in item ? (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="flex items-baseline gap-4 py-4"
                  >
                    <span className="w-6 text-xs tabular-nums text-on-dark-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-[clamp(2.25rem,11vw,3.5rem)] aria-[current=page]:text-orange">{item.label}</span>
                  </Link>
                ) : (
                  <div className="py-4">
                    <p className="flex items-baseline gap-4">
                      <span className="w-6 text-xs tabular-nums text-on-dark-muted">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-display text-[clamp(2.25rem,11vw,3.5rem)]">{item.label}</span>
                    </p>
                    <ul className="mt-3 grid gap-1 pl-10">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={onClose}
                            className="flex min-h-11 items-center justify-between gap-4 text-base text-on-dark-muted transition-colors hover:text-white"
                          >
                            {child.label}
                            <Arrow className="text-orange" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </m.li>
            );
          })}
        </ul>
      </nav>

      <m.div
        className="container-fsp sticky bottom-0 grid shrink-0 grid-cols-2 gap-3 border-t border-line-dark bg-ink py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link href={joinHref} onClick={onClose} className="inline-flex min-h-14 items-center justify-center gap-2 bg-orange text-xs font-semibold uppercase tracking-[0.14em] text-ink">
          Join FSP <Arrow />
        </Link>
        <Link href={talkHref} onClick={onClose} className="inline-flex min-h-14 items-center justify-center gap-2 border border-white/30 text-xs font-semibold uppercase tracking-[0.14em]">
          Talk to us
        </Link>
        <p className="col-span-2 pt-2 text-center eyebrow text-on-dark-muted">{site.tagline}</p>
      </m.div>
    </m.div>
  );
}
