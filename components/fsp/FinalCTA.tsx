import { finalCta } from "@/data/fsp";
import { joinHref, talkHref } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/motion/TextReveal";
import { TrajectoryLines } from "./TrajectoryLines";

type Props = { headline?: string[]; showBelief?: boolean };

export function FinalCTA({ headline = finalCta.headline, showBelief = true }: Props) {
  const last = headline[headline.length - 1];
  const punct = /[.?!]$/.test(last) ? last.slice(-1) : "";
  const lines = [...headline.slice(0, -1), <>{punct ? last.slice(0, -1) : last}<span className="text-orange">{punct}</span></>];

  return (
    <section aria-labelledby="cta-title" className="tone-dark relative overflow-hidden">
      <TrajectoryLines className="pointer-events-none absolute -bottom-[10%] -left-[10%] h-[120%] w-[90%] text-white/10" />
      <div className="container-fsp section-pad relative">
        <TextReveal id="cta-title" lines={lines} className="font-display text-display max-w-6xl" />

        <div className="grid-fsp mt-14 gap-y-10 md:mt-20">
          <div className="col-span-4 space-y-3 text-lede text-on-dark-muted md:col-span-5 lg:col-span-5">
            {finalCta.lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
            {showBelief && <p className="pt-4 text-base">{finalCta.belief}</p>}
          </div>
          <div className="col-span-4 md:col-span-3 lg:col-span-5 lg:col-start-8 lg:self-end">
            <p className="eyebrow mb-6 text-orange">{finalCta.close}</p>
            <div className="flex flex-wrap gap-3">
              <Button href={joinHref} variant="accent" size="lg">
                {finalCta.cta.primary}
              </Button>
              <Button href={talkHref} variant="outline-light" size="lg" arrow={false}>
                {finalCta.cta.secondary}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
