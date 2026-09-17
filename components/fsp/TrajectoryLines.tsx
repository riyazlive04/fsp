import { cn } from "@/lib/cn";

type Props = { className?: string; spark?: boolean; draw?: boolean };

/**
 * Abstract rising trajectories inspired by the logo's upward sweep.
 * Pure SVG + CSS: the spark travels along the main path via offset-path.
 */
export function TrajectoryLines({ className, spark = false, draw = false }: Props) {
  const main = "M -40 760 C 260 700, 520 560, 700 360 S 940 60, 1040 -20";
  return (
    <div className={cn("relative", className)} aria-hidden="true">
      <svg viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" fill="none">
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M -40 ${800 - i * 26} C ${260 + i * 30} ${740 - i * 34}, ${540 + i * 20} ${600 - i * 40}, ${720 + i * 12} ${380 - i * 30} S ${960 + i * 8} ${70 - i * 20}, 1060 ${-10 - i * 12}`}
            stroke="currentColor"
            strokeWidth={i === 2 ? 1.25 : 0.75}
            pathLength={1}
            className={draw ? "path-draw" : undefined}
            style={draw ? { animationDelay: `${0.3 + i * 0.12}s` } : undefined}
          />
        ))}
      </svg>
      {spark && (
        <svg viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full overflow-visible">
          <circle
            r="6"
            className="spark-travel fill-orange"
            style={{ offsetPath: `path("${main}")` }}
          />
        </svg>
      )}
    </div>
  );
}
