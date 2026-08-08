import type { InputHTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../lib/cn";

export const inputVariants = tv({
  base: [
    "w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] shadow-sm outline-none",
    "transition duration-200 ease-out placeholder:text-[var(--muted-foreground)]",
    "focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--focus)]",
    "disabled:cursor-not-allowed disabled:bg-[var(--muted)] disabled:text-[var(--muted-foreground)]",
  ],
  variants: {
    size: {
      medium: "h-10 px-3 text-sm",
      small: "h-9 px-2.5 text-sm",
      xsmall: "h-8 px-2 text-sm",
    },
    hasError: {
      true: "border-[var(--danger)] focus:border-[var(--danger)] focus:ring-[var(--red-alpha-10)]",
    },
  },
  defaultVariants: { size: "medium" },
});

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof inputVariants> {}

export function Input({ className, size, hasError, ...props }: InputProps) {
  return <input className={cn(inputVariants({ size, hasError }), className)} {...props} />;
}
