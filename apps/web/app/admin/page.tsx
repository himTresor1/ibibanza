import { Badge, Card } from "@ibibanza/ui";
import Link from "next/link";
import { leads, plots } from "../../lib/mock-data";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[var(--text-strong-950)]">Ihuriro rya admin</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-4"><p className="text-sm text-[var(--muted-foreground)]">Ibibanza</p><strong className="text-2xl">{plots.length}</strong></Card>
        <Card className="p-4"><p className="text-sm text-[var(--muted-foreground)]">Leads nshya</p><strong className="text-2xl">{leads.length}</strong></Card>
        <Card className="p-4"><p className="text-sm text-[var(--muted-foreground)]">Alerts</p><strong className="text-2xl">Manual</strong></Card>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link href="/admin/plots"><Badge>Manage plots</Badge></Link>
        <Link href="/admin/leads"><Badge>Leads desk</Badge></Link>
        <Link href="/admin/alerts"><Badge>WhatsApp alerts</Badge></Link>
      </div>
    </div>
  );
}
