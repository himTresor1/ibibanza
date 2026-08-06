"use client";

import { Button, Input, Select } from "@ibibanza/ui";
import { RiMapPin2Line, RiMoneyDollarCircleLine, RiSearchLine, RiShapeLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { buildPlotSearchHref, type PlotSearch } from "../../lib/plot-search";

interface PlotSearchFormProps {
  initialSearch?: Partial<PlotSearch>;
}

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
      <div className="grid gap-2 rounded-xl border border-[var(--stroke-soft-200)] bg-[var(--bg-white-0)] p-2 shadow-[0_14px_32px_rgba(14,18,27,0.08)] md:grid-cols-[1.2fr_0.9fr_0.9fr_auto] md:items-end">
        <div className="min-w-0 px-2 py-1.5">
          <label htmlFor="search-location" className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--text-strong-950)]">
            <RiMapPin2Line className="size-4 text-[var(--primary-base)]" />
            Aho ushaka
          </label>
          <Input
            id="search-location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Nyamata, Kanombe..."
          />
        </div>
        <div className="min-w-0 px-2 py-1.5">
          <label htmlFor="search-budget" className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--text-strong-950)]">
            <RiMoneyDollarCircleLine className="size-4 text-[var(--primary-base)]" />
            Budget yawe
          </label>
          <Input
            id="search-budget"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            inputMode="numeric"
            placeholder="Urugero: 20,000,000"
          />
        </div>
        <div className="min-w-0 px-2 py-1.5">
          <label htmlFor="search-land-use" className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--text-strong-950)]">
            <RiShapeLine className="size-4 text-[var(--primary-base)]" />
            Icyiciro
          </label>
          <Select id="search-land-use" value={landUse} onChange={(event) => setLandUse(event.target.value)}>
            <option value="">Ibyiciro byose</option>
            <option value="Guturwamo">Guturwamo</option>
            <option value="Ubucuruzi">Ubucuruzi</option>
            <option value="Ubuhinzi">Ubuhinzi</option>
          </Select>
        </div>
        <Button type="submit" className="min-h-11 gap-2 px-5 md:mb-1.5">
          <RiSearchLine className="size-5" />
          Shaka ibibanza
        </Button>
      </div>
    </form>
  );
}
