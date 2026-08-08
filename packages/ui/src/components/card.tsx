import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--stroke-soft-200)] bg-white shadow-[var(--shadow-card)]",
        className,
      )}
      {...props}
    />
  );
}
