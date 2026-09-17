import type { CSSProperties, ElementType, ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger index (multiplied by 80ms). */
  index?: number;
  variant?: "rise" | "fade" | "cell";
  style?: CSSProperties;
  id?: string;
};

/** Fade/rise on first view. Server component; driven by RevealObserver + CSS. */
export function ScrollReveal({ children, as: Tag = "div", className, index = 0, variant = "rise", style, id }: Props) {
  return (
    <Tag
      id={id}
      data-reveal={variant === "rise" ? "" : variant}
      className={className}
      style={{ ...style, ["--reveal-i" as string]: index }}
    >
      {children}
    </Tag>
  );
}
