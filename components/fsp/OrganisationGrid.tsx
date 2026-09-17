import Image from "next/image";
import { organisations, organisationsCopy } from "@/data/organisations";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Organisation names as a clean typographic grid (logos only when approved). */
export function OrganisationGrid({ index }: { index?: string }) {
  return (
    <section aria-labelledby="orgs-title" className="section-pad bg-paper">
      <div className="container-fsp">
        <SectionHeading
          id="orgs-title"
          eyebrow="Organisations"
          index={index}
          lines={organisationsCopy.headline}
          size="headline"
          headingClassName="max-w-5xl"
        />
        <ul className="mt-14 grid grid-cols-2 border-l border-t border-line md:mt-20 md:grid-cols-3 lg:grid-cols-5">
          {organisations.map((org, i) => (
            <li
              key={org.name}
              data-reveal="fade"
              style={{ ["--reveal-i" as string]: i % 5 }}
              className="group flex min-h-24 items-center border-b border-r border-line px-4 py-6 transition-colors duration-500 hover:bg-white md:min-h-32 md:px-6"
            >
              {org.logo ? (
                <Image src={org.logo.src} width={org.logo.width} height={org.logo.height} alt={org.name} className="h-8 w-auto" />
              ) : (
                <span className="text-[clamp(1rem,1.6vw,1.375rem)] font-semibold leading-tight tracking-tight text-ink/80 transition-colors group-hover:text-navy">
                  {org.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
