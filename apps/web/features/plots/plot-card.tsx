import { Chip } from "@ibibanza/ui";
import Link from "next/link";
import Image from "next/image";
import { RiMapPin2Line } from "@remixicon/react";
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
    tags: string[];
  };
}

export function PlotCard({ plot }: PlotCardProps) {
  return (
    <Link
      href={`/plots/${plot.slug}`}
      aria-label={`Fungura ${plot.title}`}
      className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-base)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
        <div className="flex h-full snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {plot.imageUrls.map((imageUrl, index) => (
            <div key={imageUrl} className="relative h-full w-full shrink-0 snap-center">
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
        <span className="absolute bottom-2 left-2 rounded-full bg-black/65 px-1.5 py-1 text-xs font-semibold text-white">
          Amafoto {plot.imageUrls.length}
        </span>
      </div>
      <div className="space-y-1.5 pt-3">
        <p className="flex items-center gap-1 text-xs font-medium text-[var(--text-sub-600)]">
          <RiMapPin2Line className="size-3.5 shrink-0 text-[var(--primary-base)]" />
          <span className="truncate">{plot.sector}, {plot.district}</span>
        </p>
        <h2 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-[var(--text-strong-950)]">{plot.title}</h2>
        <p className="font-mono text-base font-bold text-[var(--primary-base)]">{formatRwf(plot.priceRwf)}</p>
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
        {plot.tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {plot.tags.slice(0, 2).map((tag) => (
              <Chip key={tag} className="h-auto truncate px-2.5 py-1 text-xs">
                {tag}
              </Chip>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
