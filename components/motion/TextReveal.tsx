import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  id?: string;
};

/**
 * Display headline revealed line-by-line with a mask. Server-rendered;
 * animated by the shared RevealObserver. Content is fully visible without JS.
 */
export function TextReveal({ lines, as: Tag = "h2", className, lineClassName, id }: Props) {
  return (
    <Tag id={id} data-reveal="lines" className={className}>
      {lines.map((line, i) => (
        <span key={i} className={cn("line-mask", lineClassName)} style={{ ["--line-i" as string]: i }}>
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
