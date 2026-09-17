import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Arrow } from "./Arrow";

type Variant = "primary" | "accent" | "outline" | "outline-light" | "text" | "text-light";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
  arrow?: boolean;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 font-semibold uppercase tracking-[0.12em] transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-out)] select-none";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-white hover:bg-ink",
  accent: "bg-orange text-ink hover:bg-white",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-white",
  "outline-light": "border border-white/30 text-white hover:border-white hover:bg-white hover:text-ink",
  text: "text-ink !px-0 !min-h-0 underline-offset-[6px] decoration-1 hover:underline",
  "text-light": "text-white !px-0 !min-h-0 underline-offset-[6px] decoration-1 hover:underline",
};

const sizes = {
  md: "min-h-12 px-6 text-[0.75rem]",
  lg: "min-h-14 px-8 text-[0.8125rem]",
};

export function Button({ href, children, variant = "primary", size = "md", className, arrow = true, ...rest }: Props) {
  return (
    <Link href={href} className={cn(base, sizes[size], variants[variant], className)} {...rest}>
      <span>{children}</span>
      {arrow && (
        <Arrow className="text-[0.95em] transition-transform duration-300 ease-[var(--ease-out)] group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
      )}
    </Link>
  );
}
