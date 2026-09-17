import type { Metadata } from "next";
import { pageMetadata, absoluteUrl } from "@/lib/seo";
import { site } from "@/data/site";
import { founder, whatIsFsp, numbers } from "@/data/fsp";
import { certification, coreProgram, ecosystem, thirtyDays } from "@/data/programs";
import { community } from "@/data/community";
import { Hero } from "@/components/fsp/Hero";
import { ProblemList } from "@/components/fsp/ProblemList";
import { Transformation } from "@/components/fsp/Transformation";
import { Journey } from "@/components/fsp/Journey";
import { BrandStatement } from "@/components/fsp/BrandStatement";
import { AudienceCards } from "@/components/fsp/AudienceCards";
import { Ecosystem } from "@/components/fsp/Ecosystem";
import { EcosystemFlow } from "@/components/fsp/EcosystemFlow";
import { ProgramCards } from "@/components/fsp/ProgramCard";
import { ChallengeCounter } from "@/components/fsp/ChallengeCounter";
import { CertificationJourney } from "@/components/fsp/CertificationJourney";
import { CommunityBenefits, CommunityExperiences } from "@/components/fsp/CommunityGrid";
import { NumbersSection } from "@/components/fsp/NumbersSection";
import { FounderSection } from "@/components/fsp/FounderSection";
import { OrganisationGrid } from "@/components/fsp/OrganisationGrid";
import { TransformationStory } from "@/components/fsp/TransformationStory";
import { FinalCTA } from "@/components/fsp/FinalCTA";
import { SectionHeading, withStop } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { JsonLd } from "@/components/ui/JsonLd";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export const metadata: Metadata = pageMetadata({
  title: "Facilitator Support Program | Learn. Lead. Impact.",
  description: site.description,
  path: "/",
});

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: site.name,
  alternateName: site.shortName,
  slogan: site.tagline,
  description: site.description,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/brand/fsp-logo.png"),
  founder: { "@type": "Person", name: founder.name, jobTitle: founder.roles.join(", ") },
};

export default function HomePage() {
  const members = numbers[0];
  return (
    <>
      <JsonLd data={organizationLd} />
      <Hero />
      <ProblemList />
      <Transformation />

      {/* What is FSP + journey */}
      <section id="what-is-fsp" aria-labelledby="what-title" className="section-pad bg-paper pb-0!">
        <div className="container-fsp">
          <div className="grid-fsp items-end gap-y-10">
            <SectionHeading
              id="what-title"
              eyebrow={whatIsFsp.eyebrow}
              index="03"
              lines={withStop(whatIsFsp.headline)}
              size="mega"
              headingClassName="lg:[&_.line-mask]:whitespace-nowrap"
              className="col-span-4 md:col-span-8 lg:col-span-8"
            />
            <ScrollReveal className="col-span-4 md:col-span-6 lg:col-span-4 lg:col-start-9">
              <p className="text-lede">{whatIsFsp.body}</p>
            </ScrollReveal>
          </div>
          <div className="mt-20 lg:mt-8">
            <Journey />
          </div>
        </div>
      </section>

      <div className="h-24 bg-paper md:h-40" aria-hidden="true" />
      <BrandStatement />

      {/* Who is FSP for */}
      <section aria-labelledby="audience-title" className="section-pad bg-paper">
        <div className="container-fsp">
          <div className="grid-fsp items-end gap-y-6">
            <SectionHeading
              id="audience-title"
              eyebrow="Who is FSP for?"
              index="04"
              lines={["Who is", <>FSP for<span key="q" className="text-orange">?</span></>]}
              size="mega"
              headingClassName="lg:[&_.line-mask]:whitespace-nowrap"
              className="col-span-4 md:col-span-8 lg:col-span-8"
            />
          </div>
          <div className="mt-14 md:mt-20">
            <AudienceCards />
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section aria-labelledby="ecosystem-title" className="section-pad bg-white">
        <div className="container-fsp">
          <SectionHeading
            id="ecosystem-title"
            eyebrow="The FSP ecosystem"
            index="05"
            lines={withStop(ecosystem.headline)}
            headingClassName="max-w-6xl"
          />
          <div className="mt-16 md:mt-24">
            <Ecosystem />
          </div>
          <div className="mt-20 md:mt-28">
            <p className="eyebrow mb-6 text-muted">The core ecosystem</p>
            <EcosystemFlow />
          </div>
        </div>
      </section>

      {/* Core program */}
      <section aria-labelledby="core-title" className="section-pad bg-stone">
        <div className="container-fsp">
          <div className="grid-fsp items-end gap-y-10">
            <SectionHeading
              id="core-title"
              eyebrow="FSP Core Program"
              index="06"
              lines={withStop(coreProgram.headline)}
              size="headline"
              className="col-span-4 md:col-span-8 lg:col-span-7"
            />
            <ScrollReveal className="col-span-4 md:col-span-6 lg:col-span-4 lg:col-start-9">
              <p className="text-muted">{coreProgram.description}</p>
              <Button href="/core-program" className="mt-8">
                Explore core program
              </Button>
            </ScrollReveal>
          </div>
          <div className="mt-16 md:mt-24">
            <ProgramCards modules={coreProgram.modules} />
          </div>
        </div>
      </section>

      {/* 30 days */}
      <section aria-labelledby="days-title" className="tone-dark section-pad">
        <div className="container-fsp">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-8 md:mb-20">
            <div>
              <Eyebrow index="07" className="mb-6 text-on-dark-muted">30 Days Challenge</Eyebrow>
              <h2 id="days-title" className="max-w-xl text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-tight tracking-tight">
                {thirtyDays.statement}
              </h2>
            </div>
            <Button href="/30-days-challenge" variant="outline-light">
              Explore 30 days challenge
            </Button>
          </div>
          <ChallengeCounter />
        </div>
      </section>

      {/* Good to great */}
      <section aria-labelledby="g2g-title" className="section-pad bg-paper">
        <div className="container-fsp">
          <div className="grid-fsp items-end gap-y-10">
            <SectionHeading
              id="g2g-title"
              eyebrow={certification.name}
              index="08"
              lines={withStop(certification.headline)}
              size="mega"
              headingClassName="lg:[&_.line-mask]:whitespace-nowrap"
              className="col-span-4 md:col-span-8 lg:col-span-8"
            />
            <ScrollReveal className="col-span-4 md:col-span-6 lg:col-span-4 lg:col-start-9">
              <p className="text-lede">{certification.intro}</p>
              <p className="mt-5 text-muted">{certification.description}</p>
            </ScrollReveal>
          </div>
          <CertificationJourney className="mt-16 md:mt-24" />
          <div className="mt-14 grid-fsp gap-y-8">
            <p className="eyebrow col-span-4 text-muted md:col-span-2">Focus areas</p>
            <ul className="col-span-4 flex flex-wrap gap-2 md:col-span-6 lg:col-span-8">
              {certification.focusAreas.map((area) => (
                <li key={area} className="border border-line-strong px-3.5 py-2 text-sm">
                  {area}
                </li>
              ))}
            </ul>
            <div className="col-span-4 md:col-span-8 lg:col-span-2 lg:justify-self-end">
              <Button href="/certification" variant="text">Certification</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Community */}
      <section aria-labelledby="community-title" className="tone-navy section-pad">
        <div className="container-fsp">
          <div className="grid-fsp items-end gap-y-10">
            <SectionHeading
              id="community-title"
              eyebrow="FSP Community"
              index="09"
              lines={withStop(["You don't have", "to grow alone."])}
              className="col-span-4 md:col-span-8 lg:col-span-8 [&_.eyebrow]:text-on-dark-muted"
            />
            <ScrollReveal className="col-span-4 md:col-span-6 lg:col-span-3 lg:col-start-10">
              <p className="text-on-dark-muted">{community.description}</p>
              {members && (
                <p className="mt-6">
                  <span className="font-display block text-6xl text-orange">{members.display}</span>
                  <span className="eyebrow mt-2 block">{members.label}</span>
                </p>
              )}
            </ScrollReveal>
          </div>
          <CommunityBenefits className="mt-16 md:mt-24" />
          <p className="mt-14 text-lede text-on-dark-muted">{community.close}</p>
          <div className="mt-16 md:mt-24">
            <CommunityExperiences />
          </div>
        </div>
      </section>

      <NumbersSection index="10" />
      <FounderSection index="11" showCredentials={false} />
      <OrganisationGrid index="12" />
      <TransformationStory index="13" />
      <FinalCTA />
    </>
  );
}
