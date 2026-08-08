import { Button, Card } from "@ibibanza/ui";
import { leads, platformPhone } from "../../../lib/mock-data";

export default function AdminLeadsPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold text-[var(--text-strong-950)]">Leads desk</h1>
      {leads.map((lead) => (
        <Card key={lead.id} className="grid gap-3 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div><strong>{lead.buyerName}</strong><p>{lead.buyerPhone} - {lead.plot.title}</p><p className="text-sm text-[var(--muted-foreground)]">{lead.status}</p></div>
          <div className="flex gap-2">
            <a href={`tel:${lead.buyerPhone}`}><Button size="small">Call</Button></a>
            <a href={`https://wa.me/${platformPhone.replace("+", "")}`}><Button size="small" variant="neutral" mode="stroke">WhatsApp</Button></a>
          </div>
        </Card>
      ))}
    </div>
  );
}
