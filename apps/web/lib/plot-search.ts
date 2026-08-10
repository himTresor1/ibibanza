export interface PlotSearch {
  location: string;
  minPrice?: number;
  maxPrice?: number;
  landUse: string;
}

export const LAND_USE_OPTIONS = ["Guturwamo", "Ubucuruzi", "Ubuhinzi"] as const;

type SearchParamValue = string | string[] | undefined;

function firstValue(value: SearchParamValue) {
  return Array.isArray(value) ? value[0] : value;
}

export function parsePlotSearch(input: Record<string, SearchParamValue>): PlotSearch {
  const rawMinPrice = firstValue(input.minPrice);
  const minPrice = Number(rawMinPrice);
  const rawMaxPrice = firstValue(input.maxPrice);
  const maxPrice = Number(rawMaxPrice);

  return {
    location: (firstValue(input.location) ?? "").trim(),
    minPrice: Number.isFinite(minPrice) && minPrice > 0 ? minPrice : undefined,
    maxPrice: Number.isFinite(maxPrice) && maxPrice > 0 ? maxPrice : undefined,
    landUse: (firstValue(input.landUse) ?? "").trim(),
  };
}

export function buildPlotSearchHref(search: PlotSearch) {
  const params = new URLSearchParams();

  if (search.location) params.set("location", search.location);
  if (search.minPrice) params.set("minPrice", String(search.minPrice));
  if (search.maxPrice) params.set("maxPrice", String(search.maxPrice));
  if (search.landUse) params.set("landUse", search.landUse);

  const query = params.toString();
  return query ? `/search?${query}` : "/search";
}

export function filterPlots<Plot extends {
  district: string;
  sector: string;
  priceRwf: number;
  landUse: string;
}>(plots: Plot[], search: PlotSearch) {
  const location = search.location.toLocaleLowerCase();

  return plots.filter((plot) => {
    const plotLocation = `${plot.sector} ${plot.district}`.toLocaleLowerCase();

    return (
      (!location || plotLocation.includes(location)) &&
      (!search.minPrice || plot.priceRwf >= search.minPrice) &&
      (!search.maxPrice || plot.priceRwf <= search.maxPrice) &&
      (!search.landUse || plot.landUse === search.landUse)
    );
  });
}
