import type { FspEvent } from "@/data/events";
import { eventCategories } from "@/data/events";
import { Arrow } from "@/components/ui/Arrow";

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
const dayFmt = new Intl.DateTimeFormat("en-IN", { day: "2-digit", timeZone: "Asia/Kolkata" });
const monthFmt = new Intl.DateTimeFormat("en-IN", { month: "short", timeZone: "Asia/Kolkata" });

/** A single event row. Optional fields are only rendered when supplied. */
export function EventCard({ event }: { event: FspEvent }) {
  const start = new Date(event.startDate);
  const category = eventCategories.find((c) => c.id === event.category);

  return (
    <article className="grid grid-cols-[4.5rem_1fr] gap-x-5 gap-y-3 border-b border-line py-8 md:grid-cols-[7rem_1fr_auto] md:items-center md:gap-x-10">
      <time dateTime={event.startDate} className="row-span-2 flex flex-col md:row-span-1">
        <span className="font-display text-5xl md:text-6xl">{dayFmt.format(start)}</span>
        <span className="eyebrow mt-1 text-muted">{monthFmt.format(start)}</span>
        <span className="sr-only">{dateFmt.format(start)}</span>
      </time>
      <div>
        {category && <p className="eyebrow text-navy">{category.label}</p>}
        <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">{event.title}</h3>
        {event.summary && <p className="mt-2 max-w-2xl text-muted">{event.summary}</p>}
        {(event.format || event.location) && (
          <p className="mt-3 text-sm text-muted">{[event.format, event.location].filter(Boolean).join(" · ")}</p>
        )}
      </div>
      {event.registrationUrl && (
        <a
          href={event.registrationUrl}
          className="col-start-2 inline-flex min-h-12 items-center gap-2 justify-self-start bg-navy px-5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-ink md:col-start-auto md:justify-self-end"
        >
          Register <Arrow />
        </a>
      )}
    </article>
  );
}
