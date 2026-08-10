import { apiBaseUrl } from "./api-client";
import type { PlotSearch } from "./plot-search";

export interface Plot {
  id: string;
  slug: string;
  title: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  priceRwf: number;
  sizeSqm: number;
  landUse: string;
  remainingCount?: number;
  imageUrls: string[];
  badges: string[];
  tags: string[];
}

const LAND_USE_TO_KINYARWANDA: Record<string, string> = {
  residential: "Guturwamo",
  commercial: "Ubucuruzi",
  farming: "Ubuhinzi",
  mixed: "Bivanze",
  unknown: "Ntibizwi",
};

const LAND_USE_TO_ENUM: Record<string, string> = {
  Guturwamo: "residential",
  Ubucuruzi: "commercial",
  Ubuhinzi: "farming",
};

interface ApiPlot {
  id: string;
  slug: string;
  title: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  priceRwf: number;
  sizeSqm: number;
  landUse: string;
  remainingCount: number | null;
  photosChecked: boolean;
  locationConfirmed: boolean;
  viewingAvailable: boolean;
  documentsChecked: boolean;
  tags: string[];
  images: { url: string; alt: string | null }[];
}

function mapPlot(apiPlot: ApiPlot): Plot {
  const badges: string[] = [];
  if (apiPlot.photosChecked) badges.push("Amafoto yagenzuwe");
  if (apiPlot.locationConfirmed) badges.push("Aho kiri hemejwe");
  if (apiPlot.viewingAvailable) badges.push("Gusura birashoboka");
  if (apiPlot.documentsChecked) badges.push("Inyandiko zaraboneste");

  return {
    id: apiPlot.id,
    slug: apiPlot.slug,
    title: apiPlot.title,
    district: apiPlot.district,
    sector: apiPlot.sector,
    cell: apiPlot.cell,
    village: apiPlot.village,
    priceRwf: apiPlot.priceRwf,
    sizeSqm: apiPlot.sizeSqm,
    landUse: LAND_USE_TO_KINYARWANDA[apiPlot.landUse] ?? apiPlot.landUse,
    remainingCount: apiPlot.remainingCount ?? undefined,
    imageUrls: apiPlot.images.map((image) => image.url),
    badges,
    tags: apiPlot.tags,
  };
}

export async function fetchPlots(search?: Partial<PlotSearch>): Promise<Plot[]> {
  const params = new URLSearchParams();
  if (search?.location) params.set("location", search.location);
  if (search?.minPrice) params.set("minPrice", String(search.minPrice));
  if (search?.maxPrice) params.set("maxPrice", String(search.maxPrice));
  if (search?.landUse) {
    const enumValue = LAND_USE_TO_ENUM[search.landUse];
    if (enumValue) params.set("landUse", enumValue);
  }
  const query = params.toString();

  const response = await fetch(`${apiBaseUrl}/plots${query ? `?${query}` : ""}`, { cache: "no-store" });
  if (!response.ok) return [];
  const data = (await response.json()) as ApiPlot[];
  return data.map(mapPlot);
}

export async function fetchPlotBySlug(slug: string): Promise<Plot | null> {
  const response = await fetch(`${apiBaseUrl}/plots/${slug}`, { cache: "no-store" });
  if (!response.ok) return null;
  const data = (await response.json()) as ApiPlot;
  return mapPlot(data);
}
