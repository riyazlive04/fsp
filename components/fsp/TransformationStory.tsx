import { transformationExamples } from "@/data/fsp";
import { SectionHeading, withStop } from "@/components/ui/SectionHeading";

/**
 * Before/after transformation examples. Labelled as examples — these are not
 * attributed testimonials.
 */
export function TransformationStory({ index }: { index?: string }) {
  return (
    <section aria-labelledby="examples-title" className="section-pad bg-white">
      <div className="container-fsp">
        <div className="grid-fsp items-end gap-y-6">
          <SectionHeading
            id="examples-title"
            eyebrow={transformationExamples.eyebrow}
            index={index}
            lines={withStop(transformationExamples.headline)}
            className="col-span-4 md:col-span-8 lg:col-span-7"
          />
        </div>

        <ol className="mt-14 border-t border-line md:mt-20">
          {transformationExamples.items.map((item, i) => (
            <li key={item.before} data-reveal="" className="grid-fsp gap-y-6 border-b border-line py-10 md:py-14">
              <p className="eyebrow col-span-4 text-muted md:col-span-8 lg:col-span-2">
                Example {String(i + 1).padStart(2, "0")}
              </p>
              <div className="col-span-4 md:col-span-4 lg:col-span-4">
                <p className="eyebrow mb-3 text-muted">Before FSP</p>
                <p className="text-[clamp(1.25rem,2vw,1.625rem)] leading-snug text-muted">{item.before}</p>
              </div>
              <div aria-hidden="true" className="col-span-4 hidden items-center justify-center md:col-span-8 md:flex md:justify-start lg:col-span-1 lg:justify-center">
                <span className="text-3xl text-orange">→</span>
              </div>
              <div className="col-span-4 md:col-span-4 lg:col-span-5">
                <p className="eyebrow mb-3 text-navy">After FSP</p>
                <p className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.15] tracking-tight">{item.after}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
