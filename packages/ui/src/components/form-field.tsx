import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { cn } from "../lib/cn";

interface FormFieldProps {
  id: string;
  label: string;
  children: ReactElement<{ id?: string; "aria-describedby"?: string; "aria-invalid"?: boolean }>;
  description?: ReactNode;
  error?: ReactNode;
  className?: string;
}

export function FormField({ id, label, children, description, error, className }: FormFieldProps) {
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const describedBy = error ? errorId : description ? descriptionId : undefined;

  return (
    <div className={cn("space-y-2", className)}>
      <label className="block text-sm font-medium text-[var(--foreground)]" htmlFor={id}>
        {label}
      </label>
      {isValidElement(children)
        ? cloneElement(children, {
            id,
            "aria-describedby": describedBy,
            "aria-invalid": Boolean(error),
          })
        : children}
      {description && !error ? (
        <p id={descriptionId} className="text-sm text-[var(--muted-foreground)]">
          {description}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-sm font-medium text-[var(--danger)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
