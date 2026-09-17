import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbJsonLd, pageMetadata, absoluteUrl } from "@/lib/seo";
import { eventCategories, getUpcomingEvents } from "@/data/events";
import { site } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Arrow } from "@/components/ui/Arrow";
import { EventHub } from "@/components/fsp/EventHub";
import { FinalCTA } from "@/components/fsp/FinalCTA";

export const metadata: Metadata = pageMetadata({
  title: "FSP Events | Masterclasses, Mastermind & Experiences",
  description:
    "What's happening inside FSP: Core Program, 30 Days Challenge, Wednesday Masterclass, FSP Mastermind, Catalyst Connect, FSP TTX, community meetups and special learning experiences.",
  path: "/events",
});

// Re-generate periodically so past events drop off without a redeploy.
export const revalidate = 3600;

export default function EventsPage() {
  const upcoming = getUpcomingEvents();

  const eventsLd = upcoming.map((e) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    startDate: e.startDate,
    ...(e.endDate && { endDate: e.endDate }),
    ...(e.summary && { description: e.summary }),
    ...(e.location && { location: { "@type": "Place", name: e.location } }),
    organizer: { "@type": "Organization", name: site.name, url: absoluteUrl("/") },
  }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Events", path: "/events" }])} />
      {eventsLd.map((ld, i) => (
        <JsonLd key={i} data={ld} />
      ))}

      <PageHero
        eyebrow="FSP Events"
        size="mega"
        lines={["What's happening", <>inside FSP<span key="s" className="text-orange">?</span></>]}
      />

      <section aria-labelledby="upcoming-title" className="bg-paper pb-24 md:pb-36">
        <div className="container-fsp">
          <h2 id="upcoming-title" className="eyebrow mb-6 text-muted">
            Upcoming experiences
          </h2>
          <EventHub events={upcoming} />
        </div>
      </section>

      <section aria-labelledby="formats-title" className="section-pad bg-white">
        <div className="container-fsp">
          <SectionHeading
            id="formats-title"
            eyebrow="Event categories"
            lines={["Experience", <>formats<span key="s" className="text-orange">.</span></>]}
            size="headline"
          />
          <ul className="mt-14 grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {eventCategories.map((c, i) => (
              <li key={c.id} data-reveal="cell" style={{ ["--reveal-i" as string]: i % 4 }} className="bg-white">
                <Link href={c.href} className="group flex h-full min-h-60 flex-col justify-between gap-8 p-6 transition-colors hover:bg-paper md:p-7">
                  <span className="flex items-center justify-between">
                    <span className="text-xs font-semibold tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <Arrow className="text-navy transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                  <span>
                    <span className="block text-2xl font-semibold leading-tight tracking-tight">{c.label}</span>
                    <span className="mt-3 block text-sm text-muted">{c.description}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA showBelief={false} />
    </>
  );
}
