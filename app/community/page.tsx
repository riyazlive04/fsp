import type { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { joinHref } from "@/data/site";
import { community, experiences } from "@/data/community";
import { challenges } from "@/data/programs";
import { numbers } from "@/data/fsp";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CommunityBenefits } from "@/components/fsp/CommunityGrid";
import { ExperienceSection } from "@/components/fsp/ExperienceSection";
import { FinalCTA } from "@/components/fsp/FinalCTA";

export const metadata: Metadata = pageMetadata({
  title: "FSP Community | Learn, Connect & Grow",
  description: `${community.description} ${community.close}`,
  path: "/community",
});

export default function CommunityPage() {
  const members = numbers[0];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Community", path: "/community" }])} />
      <PageHero
        eyebrow="FSP Community"
        size="mega"
        lines={[community.headline[0], <>{community.headline[1].slice(0, -1)}<span key="s" className="text-orange">.</span></>]}
        aside={
          <>
            <p className="text-lede">{community.description}</p>
            <p className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-5xl text-navy">{members.display}</span>
              <span className="eyebrow text-muted">{members.label}</span>
            </p>
          </>
        }
      >
        <nav aria-label="Community experiences" className="flex flex-wrap gap-2 border-t border-line pt-6">
          {experiences.map((e) => (
            <a
              key={e.id}
              href={`#${e.id}`}
              className="inline-flex min-h-11 items-center border border-line-strong px-4 text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              {e.name}
            </a>
          ))}
        </nav>
      </PageHero>

      <section aria-labelledby="inside-title" className="tone-navy section-pad">
        <div className="container-fsp">
          <SectionHeading
            id="inside-title"
            eyebrow="Inside the community"
            lines={["Learn from others.", "Share what you know.", <>Grow together<span key="s" className="text-orange">.</span></>]}
            size="headline"
            className="[&_.eyebrow]:text-on-dark-muted"
          />
          <CommunityBenefits className="mt-16 md:mt-24" />
        </div>
      </section>

      {experiences.map((exp, i) => (
        <ExperienceSection key={exp.id} experience={exp} index={i} />
      ))}

      <section aria-labelledby="challenges-title" className="section-pad bg-stone">
        <div className="container-fsp">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="challenges-title" eyebrow="FSP Challenges" lines={[challenges.headline]} size="headline" />
            <p className="eyebrow text-navy">{challenges.close}</p>
          </div>
          <ul className="mt-14 grid gap-px bg-line-strong md:grid-cols-3">
            {challenges.items.map((c, i) => (
              <li key={c.title} data-reveal="cell" style={{ ["--reveal-i" as string]: i }} className="flex flex-col bg-stone p-6 md:p-8">
                <span className="text-xs font-semibold tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-10 text-2xl font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-3 text-muted">{c.description}</p>
                {c.href && (
                  <Button href={c.href} variant="text" className="mt-6 self-start">
                    Explore
                  </Button>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-14">
            <Button href={joinHref} size="lg">Join FSP</Button>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
