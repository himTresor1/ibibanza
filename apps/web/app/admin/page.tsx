import { Badge, Card } from "@ibibanza/ui";
import Link from "next/link";
import { leads, plots } from "../../lib/mock-data";

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <h1 className="text-3xl font-semibold">Admin ya Ibibanza</h1>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card><p className="text-sm text-[var(--muted-foreground)]">Ibibanza</p><strong className="text-3xl">{plots.length}</strong></Card>
          <Card><p className="text-sm text-[var(--muted-foreground)]">Leads nshya</p><strong className="text-3xl">{leads.length}</strong></Card>
          <Card><p className="text-sm text-[var(--muted-foreground)]">Alerts</p><strong className="text-3xl">Manual</strong></Card>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/plots"><Badge>Manage plots</Badge></Link>
          <Link href="/admin/leads"><Badge>Leads desk</Badge></Link>
          <Link href="/admin/alerts"><Badge>WhatsApp alerts</Badge></Link>
        </div>
      </div>
    </main>
  );
}
