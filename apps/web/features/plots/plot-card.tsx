import { Badge, Button, Card } from "@ibibanza/ui";
import Link from "next/link";
import { RiArrowRightLine, RiMapPin2Line } from "@remixicon/react";
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
    imageUrls: string[];
    badges: string[];
  };
}

export function PlotCard({ plot }: PlotCardProps) {
  return (
    <Card className="group overflow-hidden p-0 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(14,18,27,0.08)]">
      <div className="relative">
        <div className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {plot.imageUrls.map((imageUrl, index) => (
            <img
              key={imageUrl}
              src={imageUrl}
              alt={`${plot.title} - ifoto ${index + 1}`}
              className="aspect-[1.15] w-full shrink-0 snap-center object-cover"
            />
          ))}
        </div>
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {plot.imageUrls.map((imageUrl) => <span key={imageUrl} className="size-1.5 rounded-full bg-white/90 shadow" />)}
        </div>
      </div>
      <div className="space-y-4 p-4">
        <div>
          <p className="flex items-center gap-1.5 text-sm text-[var(--text-sub-600)]"><RiMapPin2Line className="size-4" />{plot.sector}, {plot.district}</p>
          <h2 className="mt-1 text-lg font-semibold tracking-[-0.01em] text-[var(--text-strong-950)]">{plot.title}</h2>
        </div>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div><span className="block text-[var(--text-soft-400)]">Igiciro</span><strong>{formatRwf(plot.priceRwf)}</strong></div>
          <div><span className="block text-[var(--text-soft-400)]">Ingano</span><strong>{plot.sizeSqm} sqm</strong></div>
          <div><span className="block text-[var(--text-soft-400)]">Hasigaye</span><strong>{plot.remainingCount ?? "-"}</strong></div>
        </div>
        <div className="flex flex-wrap gap-2">{plot.badges.map((badge) => <Badge key={badge}>{badge}</Badge>)}</div>
        <div className="grid gap-2 sm:grid-cols-2">
          <Button asChild className="w-full"><Link href={`/plots/${plot.slug}`}>Reba neza <RiArrowRightLine className="size-4" /></Link></Button>
          <Button asChild variant="neutral" mode="stroke" className="w-full"><a href={`tel:${platformPhone}`}>Hamagara</a></Button>
        </div>
      </div>
    </Card>
  );
}
