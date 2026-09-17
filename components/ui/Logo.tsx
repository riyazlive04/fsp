import Image from "next/image";
import logo from "@/public/brand/fsp-logo.png";
import logoReverse from "@/public/brand/fsp-logo-reverse.png";
import { cn } from "@/lib/cn";

type Props = { tone?: "light" | "dark"; className?: string; priority?: boolean; sizes?: string };

/** FSP logo. `tone="dark"` uses the white wordmark for dark surfaces. */
export function Logo({ tone = "light", className, priority, sizes = "140px" }: Props) {
  return (
    <Image
      src={tone === "dark" ? logoReverse : logo}
      alt="FSP — Facilitator Support Program"
      sizes={sizes}
      className={cn("h-auto w-full", className)}
      preload={priority}
      fetchPriority={priority ? "high" : undefined}
      loading={priority ? "eager" : undefined}
    />
  );
}
