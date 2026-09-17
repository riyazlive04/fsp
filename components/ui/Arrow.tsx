import { cn } from "@/lib/cn";

/** Diagonal "rising" arrow echoing the logo's upward trajectory. */
export function Arrow({ className, direction = "up-right" }: { className?: string; direction?: "up-right" | "right" | "down" }) {
  const rotate = direction === "right" ? "rotate-45" : direction === "down" ? "rotate-135" : "";
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn("size-[1em] shrink-0", rotate, className)}
    >
      <path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  );
}
