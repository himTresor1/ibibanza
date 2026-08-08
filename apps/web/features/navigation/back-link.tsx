import { RiArrowLeftLine } from "@remixicon/react";
import Link from "next/link";
import type { ReactNode } from "react";

interface BackLinkProps {
  href: string;
  children?: ReactNode;
}

export function BackLink({ href, children = "Subira ku bibanza" }: BackLinkProps) {
  return (
    <Link
      href={href}
      aria-label={typeof children === "string" ? children : "Subira ku bibanza"}
      className="inline-flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm font-semibold text-[var(--text-sub-600)] transition hover:bg-[var(--bg-weak-50)] hover:text-[var(--text-strong-950)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-base)]"
    >
      <RiArrowLeftLine className="size-5" />
      <span>{children}</span>
    </Link>
  );
}
