import { cn } from "@/lib/cn";

type Props = { items: string[]; className?: string; duration?: number; separator?: string };

/**
 * Decorative CSS marquee. The duplicated track is hidden from assistive tech;
 * the first copy is readable. Pauses on hover and for reduced motion.
 */
export function Marquee({ items, className, duration = 40, separator = "✦" }: Props) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center">
          <span className="px-5 md:px-8">{item}</span>
          <span aria-hidden="true" className="text-orange text-[0.5em]">{separator}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cn("marquee overflow-hidden", className)}>
      <div className="marquee-track flex w-max" style={{ ["--marquee-duration" as string]: `${duration}s` }}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
