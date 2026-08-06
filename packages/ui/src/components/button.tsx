import type { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<ButtonVariant, string> = {
  primary: "border-transparent bg-[var(--brand)] text-[var(--brand-foreground)] hover:bg-[var(--brand-strong)]",
  secondary: "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--muted)]",
  ghost: "border-transparent bg-transparent text-[var(--foreground)] hover:bg-[var(--muted)]",
  danger: "border-transparent bg-[var(--danger)] text-white hover:brightness-95",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ className, variant = "primary", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-lg border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
