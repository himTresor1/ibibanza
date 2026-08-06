import type { InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {}

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={cn(
        "size-5 rounded border border-[var(--border)] accent-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--focus)]",
        className,
      )}
      {...props}
    />
  );
}
