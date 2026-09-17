import type { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { faq } from "@/data/faq";
import { finalCta } from "@/data/fsp";
import { site } from "@/data/site";
import { JsonLd } from "@/components/ui/JsonLd";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { EnquiryForm } from "@/components/fsp/EnquiryForm";
import { TrajectoryLines } from "@/components/fsp/TrajectoryLines";

export const metadata: Metadata = pageMetadata({
  title: "Join Facilitator Support Program",
  description: "Start your FSP journey. Register your interest and the FSP team will contact you with the relevant program details.",
  path: "/contact",
});

export default function ContactPage() {
  const howToJoin = faq.find((f) => f.question === "How do I join FSP?");

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Join FSP", path: "/contact" }])} />

      <section aria-labelledby="contact-title" className="relative overflow-hidden bg-paper pt-[calc(var(--nav-h)+3rem)] md:pt-[calc(var(--nav-h)+5rem)]">
        <div className="container-fsp grid-fsp relative gap-y-14 pb-24 md:pb-32">
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
              <div className="hero-fade" style={{ ["--fade-i" as string]: -4 }}>
                <Eyebrow>Join FSP</Eyebrow>
              </div>
              <h1 id="contact-title" className="font-display mt-8 text-[clamp(3rem,9.5vw,7rem)]">
                <span className="line-mask hero-line" style={{ ["--line-i" as string]: 0 }}>
                  <span>Start your</span>
                </span>
                <span className="line-mask hero-line" style={{ ["--line-i" as string]: 1 }}>
                  <span>
                    FSP journey<span className="text-orange">.</span>
                  </span>
                </span>
              </h1>

              <div className="hero-fade mt-10 max-w-md space-y-3 text-lede text-muted" style={{ ["--fade-i" as string]: 1 }}>
                {finalCta.lines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </div>

              {howToJoin && (
                <div className="hero-fade mt-12 border-t border-line pt-8" style={{ ["--fade-i" as string]: 2 }}>
                  <h2 className="eyebrow text-muted">{howToJoin.question}</h2>
                  <p className="mt-3 max-w-md">{howToJoin.answer}</p>
                </div>
              )}

              {(site.contact.email || site.contact.phone) && (
                <ul className="mt-8 space-y-2">
                  {site.contact.email && (
                    <li>
                      <a href={`mailto:${site.contact.email}`} className="underline underline-offset-4">{site.contact.email}</a>
                    </li>
                  )}
                  {site.contact.phone && (
                    <li>
                      <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="underline underline-offset-4">{site.contact.phone}</a>
                    </li>
                  )}
                </ul>
              )}

              <TrajectoryLines className="pointer-events-none mt-12 hidden h-48 w-full text-navy/20 lg:block" />
            </div>
          </div>

          <div className="hero-fade col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7" style={{ ["--fade-i" as string]: 2 }}>
            <div className="border border-line bg-white p-6 md:p-10">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
