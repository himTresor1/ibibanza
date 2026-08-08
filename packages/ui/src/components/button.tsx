import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes, ElementType, SVGProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../lib/cn";

export const buttonVariants = tv({
  base: [
    "group relative inline-flex items-center justify-center whitespace-nowrap outline-none",
    "transition duration-200 ease-out disabled:pointer-events-none disabled:bg-[var(--bg-weak-50)] disabled:text-[var(--text-disabled-300)]",
  ],
  variants: {
    variant: {
      primary: "",
      neutral: "",
      error: "",
    },
    mode: {
      filled: "",
      stroke: "ring-1 ring-inset",
      lighter: "ring-1 ring-inset",
      ghost: "ring-1 ring-inset",
    },
    size: {
      large: "h-14 gap-3 rounded-full px-8 text-base font-semibold",
      medium: "h-10 gap-3 rounded-full px-5 text-sm font-semibold",
      small: "h-9 gap-3 rounded-full px-4 text-sm font-semibold",
      xsmall: "h-8 gap-2.5 rounded-full px-3 text-sm font-semibold",
    },
  },
  compoundVariants: [
    { variant: "primary", mode: "filled", class: "bg-[var(--primary-base)] text-white hover:bg-[var(--primary-darker)] focus-visible:shadow-[var(--shadow-button-primary-focus)]" },
    { variant: "primary", mode: "stroke", class: "bg-white text-[var(--primary-base)] ring-[var(--primary-base)] hover:bg-[var(--primary-alpha-10)] hover:ring-transparent" },
    { variant: "primary", mode: "lighter", class: "bg-[var(--primary-alpha-10)] text-[var(--primary-base)] ring-transparent hover:bg-white hover:ring-[var(--primary-base)]" },
    { variant: "neutral", mode: "filled", class: "bg-[var(--bg-strong-950)] text-white hover:bg-[var(--bg-surface-800)] focus-visible:shadow-[var(--shadow-button-important-focus)]" },
    { variant: "neutral", mode: "stroke", class: "bg-white text-[var(--text-sub-600)] shadow-[var(--shadow-regular-xs)] ring-[var(--stroke-soft-200)] hover:bg-[var(--bg-weak-50)] hover:text-[var(--text-strong-950)]" },
    { variant: "neutral", mode: "ghost", class: "bg-transparent text-[var(--text-sub-600)] ring-transparent hover:bg-[var(--bg-weak-50)] hover:text-[var(--text-strong-950)]" },
    { variant: "error", mode: "filled", class: "bg-[var(--error-base)] text-white hover:brightness-95 focus-visible:shadow-[var(--shadow-button-error-focus)]" },
  ],
  defaultVariants: {
    variant: "primary",
    mode: "filled",
    size: "medium",
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Root({ className, variant, mode, size, asChild, type = "button", ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";
  return <Component type={type} className={buttonVariants({ variant, mode, size, className })} {...props} />;
}

export function Icon({ as: Component, className, ...props }: SVGProps<SVGSVGElement> & { as?: ElementType }) {
  const IconComponent = Component ?? "span";
  return <IconComponent className={cn("size-5 shrink-0", className)} {...props} />;
}

export function Button(props: ButtonProps) {
  return <Root {...props} />;
}
