import type { InputHTMLAttributes, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../lib/cn";

export const inputVariants = tv({
  slots: {
    root: [
      "group relative flex w-full overflow-hidden bg-white text-[var(--text-strong-950)] shadow-[var(--shadow-regular-xs)]",
      "transition duration-200 ease-out before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:ring-1 before:ring-inset before:ring-[var(--stroke-soft-200)]",
      "has-[input:focus]:shadow-[var(--shadow-button-important-focus)] has-[input:focus]:before:ring-[var(--text-strong-950)]",
    ],
    wrapper: "flex w-full cursor-text items-center bg-white transition duration-200 ease-out hover:bg-[var(--bg-weak-50)]",
    input: "w-full bg-transparent text-sm text-[var(--text-strong-950)] outline-none placeholder:text-[var(--text-soft-400)] focus:outline-none",
  },
  variants: {
    size: {
      medium: { root: "rounded-xl", wrapper: "gap-2 px-3", input: "h-10" },
      small: { root: "rounded-xl", wrapper: "gap-2 px-2.5", input: "h-9" },
      xsmall: { root: "rounded-xl", wrapper: "gap-1.5 px-2", input: "h-8" },
    },
    hasError: {
      true: { root: "before:ring-[var(--error-base)] has-[input:focus]:shadow-[var(--shadow-button-error-focus)] has-[input:focus]:before:ring-[var(--error-base)]" },
    },
  },
  defaultVariants: { size: "medium" },
});

type InputSharedProps = VariantProps<typeof inputVariants>;

export function Root({ className, children, size, hasError }: { className?: string; children: ReactNode } & InputSharedProps) {
  const styles = inputVariants({ size, hasError });
  return <div className={styles.root({ className })}>{children}</div>;
}

export function Wrapper({ className, children, size }: { className?: string; children: ReactNode } & InputSharedProps) {
  const styles = inputVariants({ size });
  return <label className={styles.wrapper({ className })}>{children}</label>;
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">, InputSharedProps {}

export function Input({ className, size, hasError, ...props }: InputProps) {
  const styles = inputVariants({ size, hasError });
  return (
    <Root size={size} hasError={hasError}>
      <Wrapper size={size}>
        <input className={styles.input({ className })} {...props} />
      </Wrapper>
    </Root>
  );
}
