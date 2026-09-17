import type { ReactNode } from "react";
import { TextReveal } from "@/components/motion/TextReveal";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

type Props = {
  eyebrow?: string;
  index?: string;
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3";
  size?: "mega" | "display" | "headline";
  className?: string;
  headingClassName?: string;
  id?: string;
};

const sizes = { mega: "text-mega", display: "text-display", headline: "text-headline" };

/** Eyebrow + oversized condensed display headline. */
export function SectionHeading({ eyebrow, index, lines, as = "h2", size = "display", className, headingClassName, id }: Props) {
  return (
    <div className={className}>
      {eyebrow && <Eyebrow index={index} className="mb-6 md:mb-8">{eyebrow}</Eyebrow>}
      <TextReveal id={id} as={as} lines={lines} className={cn("font-display", sizes[size], headingClassName)} />
    </div>
  );
}

/** Adds an orange full stop to the last line of a headline. */
export function withStop(lines: string[]): ReactNode[] {
  return lines.map((line, i) => {
    if (i !== lines.length - 1) return line;
    const match = line.match(/^(.*?)([.?!])$/);
    if (!match) return line;
    return (
      <>
        {match[1]}
        <span className="text-orange">{match[2]}</span>
      </>
    );
  });
}
