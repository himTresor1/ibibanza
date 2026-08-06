import { Badge, Button, Card } from "@ibibanza/ui";
import Link from "next/link";
import { formatRwf, platformPhone } from "../../lib/mock-data";

interface PlotCardProps {
  plot: {
    slug: string;
    title: string;
    district: string;
    sector: string;
    priceRwf: number;
    sizeSqm: number;
    landUse: string;
    remainingCount?: number;
    imageUrl: string;
    badges: string[];
  };
}

export function PlotCard({ plot }: PlotCardProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="aspect-[4/3] bg-[var(--muted)]">
        <img src={plot.imageUrl} alt={plot.title} className="h-full w-full object-cover" />
      </div>
      <div className="space-y-4 p-4">
        <div>
          <p className="text-sm text-[var(--muted-foreground)]">{plot.sector}, {plot.district}</p>
          <h2 className="mt-1 text-xl font-semibold">{plot.title}</h2>
        </div>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div><span className="block text-[var(--muted-foreground)]">Igiciro</span><strong>{formatRwf(plot.priceRwf)}</strong></div>
          <div><span className="block text-[var(--muted-foreground)]">Ingano</span><strong>{plot.sizeSqm} sqm</strong></div>
          <div><span className="block text-[var(--muted-foreground)]">Hasigaye</span><strong>{plot.remainingCount ?? "-"}</strong></div>
        </div>
        <div className="flex flex-wrap gap-2">{plot.badges.map((badge) => <Badge key={badge}>{badge}</Badge>)}</div>
        <div className="grid gap-2 sm:grid-cols-2">
          <Link href={`/plots/${plot.slug}`}><Button className="w-full">Saba gusura</Button></Link>
          <a href={`tel:${platformPhone}`}><Button variant="secondary" className="w-full">Hamagara ubu</Button></a>
        </div>
      </div>
    </Card>
  );
}
