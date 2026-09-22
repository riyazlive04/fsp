import Image from "next/image";
import { founder } from "@/data/fsp";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/motion/TextReveal";

type Props = { index?: string; showCredentials?: boolean; headingLevel?: "h2" | "h3" };

/** Founder: typographic portrait, approved bio, credentials and the FSP vision. */
export function FounderSection({ index, showCredentials = true, headingLevel = "h2" }: Props) {
  return (
    <section aria-labelledby="founder-title" className="section-pad bg-white">
      <div className="container-fsp grid-fsp gap-y-14">
        <div className="col-span-4 md:col-span-8 lg:col-span-5">
          <Eyebrow index={index} className="mb-8">Meet the founder</Eyebrow>
          <TextReveal
            as={headingLevel}
            id="founder-title"
            lines={["Karunai", "Prakash"]}
            className="font-display text-[clamp(3rem,7vw,9rem)]"
          />
          <ul className="mt-8 flex flex-wrap gap-2">
            {founder.roles.map((role) => (
              <li key={role} className="border border-line px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-navy">
                {role}
              </li>
            ))}
          </ul>
          {founder.photo && (
            <div className="relative mt-10 aspect-[4/5] w-full max-w-sm overflow-hidden bg-stone">
              <Image src={founder.photo} alt={founder.name} fill sizes="(min-width: 1024px) 24rem, 100vw" className="object-cover" />
            </div>
          )}
        </div>

        <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
          <div className="space-y-5 text-lede text-muted">
            {founder.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {showCredentials && (
            <div className="mt-12">
              <p className="eyebrow mb-4 text-muted">Credentials</p>
              <ul className="border-t border-line">
                {founder.credentials.map((c) => (
                  <li key={c} className="flex gap-4 border-b border-line py-3.5 text-[0.95rem]">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-orange" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <figure className="tone-navy relative mt-14 overflow-hidden p-8 md:p-12">
            <p className="eyebrow text-orange">Vision through FSP</p>
            <blockquote className="font-display mt-6 text-[clamp(2.25rem,4.6vw,4rem)]">
              <p>
                To create <span className="text-orange">1000</span> impactful facilitators.
              </p>
            </blockquote>
            <figcaption className="mt-8 space-y-1 text-on-dark-muted">
              {founder.visionSupport.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="mt-4 block text-sm font-semibold text-on-dark">— {founder.name}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
