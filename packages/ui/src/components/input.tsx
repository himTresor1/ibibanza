import type { InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "min-h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--foreground)] shadow-sm placeholder:text-[var(--muted-foreground)] focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--focus)] disabled:cursor-not-allowed disabled:bg-[var(--muted)] disabled:text-[var(--muted-foreground)] md:text-sm",
        className,
      )}
      {...props}
    />
  );
}
