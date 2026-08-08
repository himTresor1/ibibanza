import { Badge, Card, Table, TableCell, TableHead } from "@ibibanza/ui";
import { formatRwf, plots } from "../../../lib/mock-data";

export default function AdminPlotsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[var(--text-strong-950)]">Ibibanza byose</h1>
      <Card className="overflow-x-auto p-0">
        <Table>
          <thead><tr><TableHead>Ikibanza</TableHead><TableHead>Igiciro</TableHead><TableHead>Status</TableHead><TableHead>Hasigaye</TableHead></tr></thead>
          <tbody>{plots.map((plot) => <tr key={plot.slug}><TableCell>{plot.title}</TableCell><TableCell>{formatRwf(plot.priceRwf)}</TableCell><TableCell><Badge>{plot.status}</Badge></TableCell><TableCell>{plot.remainingCount}</TableCell></tr>)}</tbody>
        </Table>
      </Card>
    </div>
  );
}
