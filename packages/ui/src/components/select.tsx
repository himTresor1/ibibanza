import type { SelectHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "min-h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--foreground)] shadow-sm focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--focus)] disabled:cursor-not-allowed disabled:bg-[var(--muted)] disabled:text-[var(--muted-foreground)] md:text-sm",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
