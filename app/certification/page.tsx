import type { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { joinHref } from "@/data/site";
import { certification } from "@/data/programs";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/motion/TextReveal";
import { CertificationJourney } from "@/components/fsp/CertificationJourney";
import { FinalCTA } from "@/components/fsp/FinalCTA";

export const metadata: Metadata = pageMetadata({
  title: "Good to Great Facilitator | FSP Certification",
  description: certification.description,
  path: "/certification",
});

export default function CertificationPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Certification", path: "/certification" }])} />
      <PageHero
        eyebrow={certification.name}
        size="hero"
        lines={[certification.headline[0], <>{certification.headline[1].slice(0, -1)}<span key="s" className="text-orange">.</span></>]}
        aside={
          <>
            <p className="text-lede">{certification.intro}</p>
            <p className="mt-4 font-semibold">{certification.cycle.join(" → ")}</p>
          </>
        }
      />

      <section aria-labelledby="cycle-title" className="section-pad border-t border-line bg-paper">
        <div className="container-fsp grid-fsp items-center gap-y-14">
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <SectionHeading
              id="cycle-title"
              eyebrow="Good to Great"
              lines={["Great facilitation", <>comes through<span key="s" className="text-orange">:</span></>]}
              size="headline"
            />
            <p className="mt-8 max-w-md text-lede text-muted">{certification.description}</p>
            <ol className="mt-10 border-t border-line">
              {certification.cycle.map((step, i) => (
                <li key={step} className="flex items-baseline gap-5 border-b border-line py-3">
                  <span className="text-xs font-semibold tabular-nums text-navy">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg font-semibold">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7" aria-hidden="true">
            <CertificationJourney variant="loop" />
          </div>
        </div>
      </section>

      <section aria-labelledby="focus-title" className="tone-dark section-pad">
        <div className="container-fsp">
          <SectionHeading
            id="focus-title"
            eyebrow="Certification"
            lines={["Focus", <>areas<span key="s" className="text-orange">.</span></>]}
            className="[&_.eyebrow]:text-on-dark-muted"
          />
          <ol className="mt-16 grid gap-px bg-line-dark sm:grid-cols-2 lg:grid-cols-3">
            {certification.focusAreas.map((area, i) => (
              <li
                key={area}
                data-reveal="cell"
                style={{ ["--reveal-i" as string]: i % 3 }}
                className="flex min-h-44 flex-col justify-between gap-8 bg-ink p-6 md:min-h-56 md:p-8"
              >
                <span className="font-display text-5xl text-orange">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[clamp(1.375rem,2.2vw,1.875rem)] font-semibold leading-tight tracking-tight">{area}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="milestone-title" className="section-pad bg-white">
        <div className="container-fsp">
          <TextReveal
            id="milestone-title"
            lines={[
              <span key="a" className="text-muted">{certification.close[0]}</span>,
              <>{certification.close[1].slice(0, -1)}<span key="s" className="text-orange">.</span></>,
            ]}
            className="font-display text-display"
          />
          <div className="mt-12">
            <Button href={joinHref} size="lg">Join FSP</Button>
          </div>
        </div>
      </section>

      <FinalCTA showBelief={false} />
    </>
  );
}
