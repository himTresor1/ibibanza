import { Button, Card } from "@ibibanza/ui";
import Link from "next/link";
import { BackLink } from "../../features/navigation/back-link";
import { LandUseFilterChips } from "../../features/plots/land-use-filter-chips";
import { PlotCard } from "../../features/plots/plot-card";
import { PlotSearchForm } from "../../features/plots/plot-search-form";
import { plots } from "../../lib/mock-data";
import { filterPlots, parsePlotSearch } from "../../lib/plot-search";

interface SearchPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const search = parsePlotSearch(await searchParams);
  const matchingPlots = filterPlots(plots, search);

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-4 sm:py-7">
      <div className="mx-auto w-full max-w-7xl">
        <BackLink href="/" />
        <div className="mt-4 max-w-2xl">
          <p className="text-sm font-semibold text-[var(--primary-base)]">Kwamamaza ibibanza</p>
          <h1 className="mt-1 text-3xl font-semibold text-[var(--text-strong-950)] sm:text-4xl">Ibibanza bihuye n&apos;ibyo ushaka</h1>
        </div>
        <div className="mt-5">
          <PlotSearchForm initialSearch={search} />
          <div className="mt-4">
            <LandUseFilterChips search={search} />
          </div>
        </div>

        {matchingPlots.length ? (
          <section data-testid="plot-grid" className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
            {matchingPlots.map((plot) => <PlotCard key={plot.slug} plot={plot} />)}
          </section>
        ) : (
          <Card className="mx-auto mt-8 max-w-xl p-5 sm:p-7">
            <p className="text-sm font-semibold text-[var(--primary-base)]">Nta kibanza gihari ubu</p>
            <h2 className="mt-2 text-xl font-semibold text-[var(--text-strong-950)]">Tuzakimenya kikihagera</h2>
            <p className="mt-2 max-w-md leading-7 text-[var(--text-sub-600)]">
              Ohereza ibyo ushaka kuri WhatsApp alerts. Tuzakumenyesha igihe ikibanza gihuye na byo kibonetse.
            </p>
            <Button asChild className="mt-5 w-fit">
              <Link href="/alerts" aria-label="Akira alerts kuri WhatsApp">
                Akira alerts kuri WhatsApp
              </Link>
            </Button>
          </Card>
        )}
      </div>
    </main>
  );
}
