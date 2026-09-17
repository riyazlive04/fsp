import { cn } from "@/lib/cn";

export function Divider({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return <hr className={cn("border-0 border-t", tone === "dark" ? "border-line-dark" : "border-line", className)} />;
}
