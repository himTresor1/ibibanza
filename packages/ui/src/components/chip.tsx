import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  selected?: boolean;
}

export function Chip({ className, selected, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex h-12 w-fit shrink-0 cursor-pointer items-center whitespace-nowrap rounded-full px-5 text-sm font-semibold transition",
        selected
          ? "bg-[var(--primary-base)] text-white"
          : "bg-[var(--bg-white-0)] text-[var(--text-sub-600)] ring-1 ring-inset ring-[var(--stroke-soft-200)] hover:bg-[var(--bg-weak-50)] hover:text-[var(--text-strong-950)]",
        className,
      )}
      {...props}
    />
  );
}
