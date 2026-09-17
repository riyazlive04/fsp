import { numbers } from "@/data/fsp";
import { Stat } from "@/components/ui/Stat";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** Large typographic statistics grid (figures exactly as supplied). */
export function NumbersSection({ index }: { index?: string }) {
  return (
    <section aria-labelledby="numbers-title" className="section-pad bg-paper">
      <div className="container-fsp">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Eyebrow index={index}>FSP in numbers</Eyebrow>
          <h2 id="numbers-title" className="sr-only">FSP in numbers</h2>
        </div>
        <ul className="mt-10 grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {numbers.map((item, i) => (
            <li key={item.label} className="bg-paper py-10 sm:px-6 md:py-14 lg:px-8">
              <div data-reveal="" style={{ ["--reveal-i" as string]: i % 3 }} className="h-full">
                <Stat item={item} className={item.value === null ? "h-full justify-between" : undefined} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
