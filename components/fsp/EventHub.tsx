"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { eventCategories, eventsCopy, type EventCategoryId, type FspEvent } from "@/data/events";
import { FilterChips } from "@/components/ui/FilterChips";
import { EventCard } from "./EventCard";

/** Filterable list of upcoming events. Receives pre-sorted upcoming events. */
export function EventHub({ events }: { events: FspEvent[] }) {
  const [category, setCategory] = useState<EventCategoryId | "all">("all");

  const visible = useMemo(
    () => (category === "all" ? events : events.filter((e) => e.category === category)),
    [events, category],
  );

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    events.forEach((e) => map.set(e.category, (map.get(e.category) ?? 0) + 1));
    return map;
  }, [events]);

  return (
    <LazyMotion features={domAnimation} strict>
      <FilterChips
        label="Filter events by category"
        value={category}
        onChange={(v) => setCategory(v as EventCategoryId | "all")}
        options={[
          { value: "all", label: "All", count: events.length },
          ...eventCategories.map((c) => ({ value: c.id, label: c.label, count: counts.get(c.id) ?? 0 })),
        ]}
      />

      <p className="sr-only" aria-live="polite">
        {visible.length === 0 ? eventsCopy.empty : `${visible.length} upcoming ${visible.length === 1 ? "event" : "events"}`}
      </p>

      <div className="mt-10 border-t border-line">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.length === 0 ? (
            <m.div
              key={`empty-${category}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-24"
            >
              <p className="font-display text-[clamp(2.25rem,5vw,4.5rem)] text-ink/85">{eventsCopy.empty}</p>
              <span aria-hidden="true" className="relative flex size-4">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-orange opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-4 rounded-full bg-orange" />
              </span>
            </m.div>
          ) : (
            visible.map((event) => (
              <m.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <EventCard event={event} />
              </m.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}
