"use client";

import { cn } from "@ibibanza/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiDashboardLine, RiMap2Line, RiTeamLine, RiWhatsappLine, type RemixiconComponentType } from "@remixicon/react";

const ADMIN_NAV_ITEMS: { href: string; label: string; icon: RemixiconComponentType }[] = [
  { href: "/admin", label: "Ihuriro", icon: RiDashboardLine },
  { href: "/admin/plots", label: "Ibibanza", icon: RiMap2Line },
  { href: "/admin/leads", label: "Leads desk", icon: RiTeamLine },
  { href: "/admin/alerts", label: "WhatsApp alerts", icon: RiWhatsappLine },
];

function AdminNavLink({ href, label, icon: Icon, active }: { href: string; label: string; icon: RemixiconComponentType; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-base)]",
        active
          ? "bg-[var(--primary-alpha-10)] text-[var(--primary-base)]"
          : "text-[var(--text-sub-600)] hover:bg-[var(--bg-soft-100)] hover:text-[var(--text-strong-950)]",
      )}
    >
      <Icon className="size-5 shrink-0" />
      <span>{label}</span>
    </Link>
  );
}

export function AdminNav() {
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden w-56 shrink-0 flex-col gap-1 border-r border-[var(--stroke-soft-200)] bg-[var(--bg-white-0)] px-3 py-6 lg:flex">
        <Link href="/admin" className="mb-4 px-3 text-lg font-bold text-[var(--text-strong-950)]">
          Ibibanza admin
        </Link>
        {ADMIN_NAV_ITEMS.map((item) => (
          <AdminNavLink key={item.href} {...item} active={pathname === item.href} />
        ))}
      </aside>
      <nav className="flex gap-1 overflow-x-auto border-b border-[var(--stroke-soft-200)] bg-[var(--bg-white-0)] px-3 py-2 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {ADMIN_NAV_ITEMS.map((item) => (
          <AdminNavLink key={item.href} {...item} active={pathname === item.href} />
        ))}
      </nav>
    </>
  );
}
