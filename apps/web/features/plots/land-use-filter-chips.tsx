import Link from "next/link";
import { Chip } from "@ibibanza/ui";
import { LAND_USE_OPTIONS, buildPlotSearchHref, type PlotSearch } from "../../lib/plot-search";

interface LandUseFilterChipsProps {
  search: Partial<PlotSearch>;
}

export function LandUseFilterChips({ search }: LandUseFilterChipsProps) {
  const base = { location: search.location ?? "", maxPrice: search.maxPrice };

  return (
    <div
      role="group"
      aria-label="Hitamo icyiciro"
      className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <Link href={buildPlotSearchHref({ ...base, landUse: "" })}>
        <Chip selected={!search.landUse}>Ibyiciro byose</Chip>
      </Link>
      {LAND_USE_OPTIONS.map((option) => (
        <Link key={option} href={buildPlotSearchHref({ ...base, landUse: option })}>
          <Chip selected={search.landUse === option}>{option}</Chip>
        </Link>
      ))}
    </div>
  );
}
