"use client";

import { useDeferredValue, useId, useMemo, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { resourceCategories, resourcesCopy, type FspResource, type ResourceCategoryId } from "@/data/resources";
import { FilterChips } from "@/components/ui/FilterChips";
import { ResourceCard } from "./ResourceCard";

function matches(resource: FspResource, query: string) {
  if (!query) return true;
  const haystack = [resource.title, resource.description, resource.type, ...(resource.tags ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .every((term) => haystack.includes(term));
}

/** Search + category filtering over the resource data set. */
export function ResourceLibrary({ resources }: { resources: FspResource[] }) {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ResourceCategoryId | "all">("all");
  const deferredQuery = useDeferredValue(query.trim());

  const results = useMemo(
    () => resources.filter((r) => (category === "all" || r.category === category) && matches(r, deferredQuery)),
    [resources, category, deferredQuery],
  );

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    resources.forEach((r) => map.set(r.category, (map.get(r.category) ?? 0) + 1));
    return map;
  }, [resources]);

  const emptyMessage = resources.length === 0 ? resourcesCopy.empty : resourcesCopy.noMatch;

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="grid gap-8 lg:grid-cols-[20rem_1fr] lg:gap-12">
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
          <label htmlFor={searchId} className="eyebrow mb-3 block text-muted">
            Search the toolkit
          </label>
          <div className="relative">
            <svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" fill="none">
              <circle cx="8.5" cy="8.5" r="6" stroke="currentColor" strokeWidth="1.6" />
              <path d="m13 13 5 5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Templates, activities, worksheets…"
              autoComplete="off"
              className="h-14 w-full border border-line-strong bg-white pl-11 pr-4 text-base outline-none transition-colors placeholder:text-muted focus:border-navy focus-visible:outline-2 focus-visible:outline-navy"
            />
          </div>

          <p className="eyebrow mb-3 mt-8 text-muted">Categories</p>
          <FilterChips
            label="Filter resources by category"
            value={category}
            onChange={(v) => setCategory(v as ResourceCategoryId | "all")}
            options={[
              { value: "all", label: "All", count: resources.length },
              ...resourceCategories.map((c) => ({ value: c.id, label: c.label, count: counts.get(c.id) ?? 0 })),
            ]}
          />
        </div>

        <div>
          <p className="eyebrow mb-4 text-muted" aria-live="polite">
            {results.length} {results.length === 1 ? "resource" : "resources"}
            {category !== "all" && ` · ${resourceCategories.find((c) => c.id === category)?.label}`}
          </p>
          <AnimatePresence mode="wait" initial={false}>
            {results.length === 0 ? (
              <m.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border-y border-line py-16 md:py-24"
              >
                <p className="font-display text-[clamp(2rem,4.4vw,4rem)] text-ink/85">{emptyMessage}</p>
              </m.div>
            ) : (
              <m.ul
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-3"
              >
                {results.map((r) => (
                  <m.li key={r.id} layout transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                    <ResourceCard resource={r} />
                  </m.li>
                ))}
              </m.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </LazyMotion>
  );
}
