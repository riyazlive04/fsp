import { certification } from "@/data/programs";
import { cn } from "@/lib/cn";

type Props = { variant?: "line" | "loop"; className?: string };

/**
 * Learning → Practice → Reflection → Feedback → Improvement.
 * "line": horizontal sequence (home). "loop": continuous cycle (certification page).
 */
export function CertificationJourney({ variant = "line", className }: Props) {
  const steps = certification.cycle;

  if (variant === "line") {
    return (
      <ol className={cn("grid gap-px bg-line md:grid-cols-5", className)}>
        {steps.map((step, i) => (
          <li
            key={step}
            data-reveal="cell"
            style={{ ["--reveal-i" as string]: i }}
            className="group relative flex items-baseline gap-4 bg-paper py-5 md:flex-col md:gap-10 md:px-5 md:py-8"
          >
            <span className="w-8 text-xs font-semibold tabular-nums text-muted md:w-auto">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-display text-[clamp(2rem,2.9vw,2.6rem)]">{step}</span>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="absolute right-4 top-1/2 -translate-y-1/2 text-orange md:top-8 md:translate-y-0">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    );
  }

  const size = 100;
  const r = 38;
  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-[40rem]", className)}>
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 size-full" aria-hidden="true" fill="none">
        <circle cx="50" cy="50" r={r} stroke="var(--fsp-line-strong)" strokeWidth="0.3" />
        <g className="orbit">
          <circle cx="50" cy={50 - r} r="1.4" fill="var(--fsp-orange)" />
        </g>
        {/* Direction markers */}
        {steps.map((_, i) => {
          const a = ((360 / steps.length) * i + 36 - 90) * (Math.PI / 180);
          const x = 50 + r * Math.cos(a);
          const y = 50 + r * Math.sin(a);
          const deg = (360 / steps.length) * i + 36;
          return (
            <path
              key={i}
              d="M -1 -1.2 L 0.6 0 L -1 1.2"
              stroke="var(--fsp-navy)"
              strokeWidth="0.35"
              transform={`translate(${x} ${y}) rotate(${deg})`}
            />
          );
        })}
      </svg>
      <div className="absolute inset-[26%] flex flex-col items-center justify-center text-center">
        <p className="eyebrow text-muted">Continuous</p>
        <p className="font-display mt-2 text-[clamp(1.75rem,5vw,3.25rem)]">Growth</p>
      </div>
      <ol className="absolute inset-0">
        {steps.map((step, i) => {
          const a = ((360 / steps.length) * i - 90) * (Math.PI / 180);
          const x = 50 + r * Math.cos(a);
          const y = 50 + r * Math.sin(a);
          return (
            <li
              key={step}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 bg-paper px-2 py-1 text-center"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <span className="text-[0.625rem] font-semibold tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-[clamp(1.125rem,3.4vw,2rem)]">{step}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
