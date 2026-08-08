"use client";

import { Button, Input, Select } from "@ibibanza/ui";
import { RiSearchLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LAND_USE_OPTIONS, buildPlotSearchHref, type PlotSearch } from "../../lib/plot-search";

interface PlotSearchFormProps {
  initialSearch?: Partial<PlotSearch>;
}

const segmentField = "w-full border-transparent bg-transparent px-0 shadow-none focus:border-transparent focus:ring-0";

export function PlotSearchForm({ initialSearch }: PlotSearchFormProps) {
  const router = useRouter();
  const [location, setLocation] = useState(initialSearch?.location ?? "");
  const [maxPrice, setMaxPrice] = useState(initialSearch?.maxPrice ? String(initialSearch.maxPrice) : "");
  const [landUse, setLandUse] = useState(initialSearch?.landUse ?? "");

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const numericPrice = Number(maxPrice.replace(/[^\d]/g, ""));

    router.push(
      buildPlotSearchHref({
        location: location.trim(),
        maxPrice: Number.isFinite(numericPrice) && numericPrice > 0 ? numericPrice : undefined,
        landUse,
      }),
    );
  }

  return (
    <form onSubmit={submitSearch} aria-label="Shakisha ibibanza">
      <div className="flex flex-col gap-2 rounded-2xl bg-[var(--bg-white-0)] p-2 shadow-[var(--shadow-card)] sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:p-1.5 sm:ring-1 sm:ring-inset sm:ring-[var(--stroke-soft-200)]">
        <div className="min-w-0 flex-1 rounded-xl px-4 py-2 transition hover:bg-[var(--bg-weak-50)] sm:rounded-full">
          <label htmlFor="search-location" className="block text-xs font-semibold text-[var(--text-strong-950)]">
            Aho ushaka
          </label>
          <Input
            id="search-location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Nyamata, Kanombe..."
            className={segmentField}
          />
        </div>
        <div className="hidden h-8 w-px shrink-0 self-center bg-[var(--stroke-soft-200)] sm:block" />
        <div className="min-w-0 flex-1 rounded-xl px-4 py-2 transition hover:bg-[var(--bg-weak-50)] sm:rounded-full">
          <label htmlFor="search-budget" className="block text-xs font-semibold text-[var(--text-strong-950)]">
            Budget yawe
          </label>
          <Input
            id="search-budget"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            inputMode="numeric"
            placeholder="Urugero: 20,000,000"
            className={segmentField}
          />
        </div>
        <div className="hidden h-8 w-px shrink-0 self-center bg-[var(--stroke-soft-200)] sm:block" />
        <div className="min-w-0 flex-1 rounded-xl px-4 py-2 transition hover:bg-[var(--bg-weak-50)] sm:rounded-full">
          <label htmlFor="search-land-use" className="block text-xs font-semibold text-[var(--text-strong-950)]">
            Icyiciro
          </label>
          <Select
            id="search-land-use"
            value={landUse}
            onChange={(event) => setLandUse(event.target.value)}
            className={segmentField}
          >
            <option value="">Ibyiciro byose</option>
            {LAND_USE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
          </Select>
        </div>
        <Button type="submit" size="large" className="mt-1 w-full shrink-0 gap-2 sm:mt-0 sm:w-auto">
          <RiSearchLine className="size-5" />
          Shaka ibibanza
        </Button>
      </div>
    </form>
  );
}
