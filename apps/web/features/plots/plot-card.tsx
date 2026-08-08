import { Badge, Card } from "@ibibanza/ui";
import Link from "next/link";
import Image from "next/image";
import { RiArrowRightLine, RiMapPin2Line } from "@remixicon/react";
import { formatRwf } from "../../lib/mock-data";

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
    <Card className="group overflow-hidden p-0 transition duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]">
      <div className="relative">
        <div
          aria-label={`Amafoto ya ${plot.title}`}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {plot.imageUrls.map((imageUrl, index) => (
            <div key={imageUrl} className="relative aspect-[4/3] w-full shrink-0 snap-center overflow-hidden">
              <Image
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                src={imageUrl}
                alt={`${plot.title} - ifoto ${index + 1}`}
                className="object-cover transition duration-300 group-hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>
        <span className="absolute bottom-2 left-2 rounded-full bg-black/65 px-1.5 py-1 text-[11px] font-semibold text-white">
          Amafoto {plot.imageUrls.length}
        </span>
        <Link
          href={`/plots/${plot.slug}`}
          aria-label={`Fungura ${plot.title}`}
          className="absolute right-2 top-2 inline-flex size-11 items-center justify-center rounded-full bg-white text-[var(--text-strong-950)] shadow-[var(--shadow-card)] transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-base)]"
        >
          <RiArrowRightLine className="size-5" />
        </Link>
      </div>
      <div className="space-y-2.5 p-3">
        <p className="flex items-center gap-1 text-xs font-medium text-[var(--text-sub-600)]">
          <RiMapPin2Line className="size-3.5 shrink-0 text-[var(--primary-base)]" />
          <span className="truncate">{plot.sector}, {plot.district}</span>
        </p>
        <Link href={`/plots/${plot.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-base)]">
          <h2 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-[var(--text-strong-950)]">{plot.title}</h2>
          <p className="mt-1 text-sm font-bold text-[var(--text-strong-950)]">{formatRwf(plot.priceRwf)}</p>
        </Link>
        <dl className="grid grid-cols-2 gap-x-2 text-xs text-[var(--text-sub-600)]">
          <div>
            <dt className="text-[var(--text-soft-400)]">Ingano</dt>
            <dd className="mt-0.5 font-semibold text-[var(--text-strong-950)]">{plot.sizeSqm} sqm</dd>
          </div>
          <div>
            <dt className="text-[var(--text-soft-400)]">Hasigaye</dt>
            <dd className="mt-0.5 font-semibold text-[var(--text-strong-950)]">{plot.remainingCount ?? "-"}</dd>
          </div>
        </dl>
        {plot.badges[0] ? <Badge className="max-w-full truncate">{plot.badges[0]}</Badge> : null}
      </div>
    </Card>
  );
}
