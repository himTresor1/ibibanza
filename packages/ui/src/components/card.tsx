import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[var(--stroke-soft-200)] bg-white shadow-[var(--shadow-regular-xs)]",
        className,
      )}
      {...props}
    />
  );
}
