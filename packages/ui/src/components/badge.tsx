import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-md bg-[var(--bg-weak-50)] px-2 text-xs font-medium text-[var(--text-sub-600)] ring-1 ring-inset ring-[var(--stroke-soft-200)]",
        className,
      )}
      {...props}
    />
  );
}
