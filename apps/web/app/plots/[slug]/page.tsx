import { Badge, Card } from "@ibibanza/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyerInterestForm } from "../../../features/leads/buyer-interest-form";
import { formatRwf, plots } from "../../../lib/mock-data";

export default async function PlotDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plot = plots.find((item) => item.slug === slug);
  if (!plot) notFound();

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <Link href="/" className="text-sm font-medium text-[var(--brand)]">Subira ku bibanza</Link>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="overflow-hidden p-0">
            <div className="aspect-[4/3] bg-[var(--muted)]">
              <img src={plot.imageUrl} alt={plot.title} className="h-full w-full object-cover" />
            </div>
            <div className="space-y-4 p-4">
              <div className="flex flex-wrap gap-2">{plot.badges.map((badge) => <Badge key={badge}>{badge}</Badge>)}</div>
              <h1 className="text-3xl font-semibold">{plot.title}</h1>
              <p className="text-[var(--muted-foreground)]">{plot.sector}, {plot.district}</p>
              <div className="grid grid-cols-3 gap-3">
                <strong>{formatRwf(plot.priceRwf)}</strong>
                <strong>{plot.sizeSqm} sqm</strong>
                <strong>{plot.remainingCount} bisigaye</strong>
              </div>
            </div>
          </Card>
          <BuyerInterestForm plotId={plot.id} />
        </div>
      </div>
    </main>
  );
}
