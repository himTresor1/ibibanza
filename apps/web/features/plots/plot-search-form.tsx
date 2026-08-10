"use client";

import { Button, Input, Select } from "@ibibanza/ui";
import { RiSearchLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LAND_USE_OPTIONS, buildPlotSearchHref, type PlotSearch } from "../../lib/plot-search";

interface PlotSearchFormProps {
  initialSearch?: Partial<PlotSearch>;
}

function parseAmount(value: string) {
  const numeric = Number(value.replace(/[^\d]/g, ""));
  return Number.isFinite(numeric) && numeric > 0 ? numeric : undefined;
}

export function PlotSearchForm({ initialSearch }: PlotSearchFormProps) {
  const router = useRouter();
  const [location, setLocation] = useState(initialSearch?.location ?? "");
  const [minPrice, setMinPrice] = useState(initialSearch?.minPrice ? String(initialSearch.minPrice) : "");
  const [maxPrice, setMaxPrice] = useState(initialSearch?.maxPrice ? String(initialSearch.maxPrice) : "");
  const [landUse, setLandUse] = useState(initialSearch?.landUse ?? "");

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    router.push(
      buildPlotSearchHref({
        location: location.trim(),
        minPrice: parseAmount(minPrice),
        maxPrice: parseAmount(maxPrice),
        landUse,
      }),
    );
  }

  return (
    <form
      onSubmit={submitSearch}
      aria-label="Shakisha ibibanza"
      className="rounded-3xl bg-[var(--bg-white-0)] p-3 shadow-[var(--shadow-card)] sm:p-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-3">
        <div className="min-w-0 flex-1">
          <label htmlFor="search-location" className="mb-1.5 block text-xs font-semibold text-[var(--text-strong-950)]">
            Aho ushaka
          </label>
          <Input
            id="search-location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Akarere, Umurenge, Akagari cyangwa Umudugudu"
          />
        </div>
        <div className="min-w-0 flex-1">
          <label htmlFor="search-min-price" className="mb-1.5 block text-xs font-semibold text-[var(--text-strong-950)]">
            Guhera kuri (RWF)
          </label>
          <Input
            id="search-min-price"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
            inputMode="numeric"
            placeholder="500,000"
          />
        </div>
        <div className="min-w-0 flex-1">
          <label htmlFor="search-max-price" className="mb-1.5 block text-xs font-semibold text-[var(--text-strong-950)]">
            Kugeza kuri (RWF)
          </label>
          <Input
            id="search-max-price"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            inputMode="numeric"
            placeholder="20,000,000"
          />
        </div>
        <div className="min-w-0 flex-1">
          <label htmlFor="search-land-use" className="mb-1.5 block text-xs font-semibold text-[var(--text-strong-950)]">
            Zoning
          </label>
          <Select
            id="search-land-use"
            value={landUse}
            onChange={(event) => setLandUse(event.target.value)}
          >
            <option value="">Byose</option>
            {LAND_USE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
          </Select>
        </div>
        <Button type="submit" className="gap-2">
          <RiSearchLine className="size-5" />
          Shaka ibibanza
        </Button>
      </div>
    </form>
  );
}
