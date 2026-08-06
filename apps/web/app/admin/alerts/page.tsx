import { Button, Card, FormField, Input, Select, Textarea } from "@ibibanza/ui";
import { formatRwf, platformPhone, plots } from "../../../lib/mock-data";

export default function AdminAlertsPage() {
  const plot = plots[0];
  const message = `IBIBANZA BISHYA - ${plot.district}\n\nHasigaye ibibanza ${plot.remainingCount}.\nIgiciro: ${formatRwf(plot.priceRwf)}\nIngano: ${plot.sizeSqm} sqm\n\nUshaka kugisura, duhamagare:\n${platformPhone}`;
  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-semibold">WhatsApp alert composer</h1>
        <Card className="grid gap-4">
          <FormField id="plot" label="Hitamo ikibanza"><Select>{plots.map((item) => <option key={item.slug}>{item.title}</option>)}</Select></FormField>
          <FormField id="remaining" label="Ibisigaye"><Input defaultValue={plot.remainingCount} /></FormField>
          <FormField id="message" label="Message ya WhatsApp"><Textarea defaultValue={message} className="min-h-56 font-mono" /></FormField>
          <p className="text-sm text-[var(--muted-foreground)]">Recipients bazatoranywa hashingiwe kuri location, budget, land use, urgency na consentWhatsapp.</p>
          <Button>Copy message / mark sent manually</Button>
        </Card>
      </div>
    </main>
  );
}
