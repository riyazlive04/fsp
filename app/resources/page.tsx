import type { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { resourceCategories, resources, resourcesCopy } from "@/data/resources";
import { numbers } from "@/data/fsp";
import { joinHref } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { ResourceLibrary } from "@/components/fsp/ResourceLibrary";
import { FinalCTA } from "@/components/fsp/FinalCTA";

export const metadata: Metadata = pageMetadata({
  title: "FSP Resources | Facilitator Toolkit",
  description: `Your facilitator toolkit: ${resourceCategories.map((c) => c.label.toLowerCase()).join(", ")}.`,
  path: "/resources",
});

export default function ResourcesPage() {
  const resourceStat = numbers.find((n) => n.label.startsWith("Learning Resources"));
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Resources", path: "/resources" }])} />
      <PageHero
        eyebrow="FSP Resources"
        size="mega"
        lines={["Your facilitator", <>toolkit<span key="s" className="text-orange">.</span></>]}
        aside={
          <>
            <p className="text-lede">{resourcesCopy.intro}</p>
            {resourceStat && (
              <p className="mt-6 flex items-baseline gap-3">
                <span className="font-display text-5xl text-navy">{resourceStat.display}</span>
                <span className="eyebrow text-muted">{resourceStat.label}</span>
              </p>
            )}
            <div className="mt-8">
              <Button href={joinHref}>Join FSP</Button>
            </div>
          </>
        }
      />

      <div className="tone-dark py-4" aria-hidden="true">
        <Marquee items={resourceCategories.map((c) => c.label.toUpperCase())} duration={45} className="font-display text-3xl md:text-4xl" />
      </div>

      <section aria-label="Resource library" className="bg-paper py-20 md:py-28">
        <div className="container-fsp">
          <ResourceLibrary resources={resources} />
        </div>
      </section>

      <FinalCTA showBelief={false} />
    </>
  );
}
