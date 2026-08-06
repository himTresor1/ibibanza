import { Button, Card } from "@ibibanza/ui";
import { leads, platformPhone } from "../../../lib/mock-data";

export default function AdminLeadsPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-5">
        <h1 className="text-3xl font-semibold">Leads desk</h1>
        {leads.map((lead) => (
          <Card key={lead.id} className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
            <div><strong>{lead.buyerName}</strong><p>{lead.buyerPhone} - {lead.plot.title}</p><p className="text-sm text-[var(--muted-foreground)]">{lead.status}</p></div>
            <div className="flex gap-2"><a href={`tel:${lead.buyerPhone}`}><Button>Call</Button></a><a href={`https://wa.me/${platformPhone.replace("+", "")}`}><Button variant="neutral" mode="stroke">WhatsApp</Button></a></div>
          </Card>
        ))}
      </div>
    </main>
  );
}
