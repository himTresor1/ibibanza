import type { HTMLAttributes, TableHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export function Table({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return <table className={cn("w-full border-collapse text-sm", className)} {...props} />;
}

export function TableCell({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn("border-b border-[var(--border)] px-3 py-2", className)} {...props} />;
}

export function TableHead({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "border-b border-[var(--border)] px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]",
        className,
      )}
      {...props}
    />
  );
}
