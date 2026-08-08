import { Button } from "@ibibanza/ui";
import Link from "next/link";
import Image from "next/image";
import { PlotCard } from "../features/plots/plot-card";
import { PlotSearchForm } from "../features/plots/plot-search-form";
import { LandUseFilterChips } from "../features/plots/land-use-filter-chips";
import { plots } from "../lib/mock-data";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="bg-white">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Link href="/" className="text-xl font-bold text-[var(--text-strong-950)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-base)]">
            Ibibanza
          </Link>
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className="hidden rounded-full px-4 py-2 text-sm font-semibold text-[var(--text-sub-600)] transition hover:bg-[var(--bg-soft-100)] hover:text-[var(--text-strong-950)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-base)] sm:inline-flex"
            >
              Ahabanza
            </Link>
            <Link
              href="/about"
              className="hidden rounded-full px-4 py-2 text-sm font-semibold text-[var(--text-sub-600)] transition hover:bg-[var(--bg-soft-100)] hover:text-[var(--text-strong-950)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-base)] sm:inline-flex"
            >
              Abo turi bo
            </Link>
            <Button asChild>
              <Link href="/submit-land">Ohereza ikibanza</Link>
            </Button>
          </div>
        </nav>
      </header>

      <section className="relative mx-4 mt-2 h-[62vh] min-h-[420px] overflow-hidden rounded-2xl sm:mx-6">
        <Image
          fill
          priority
          sizes="100vw"
          src={plots[0].imageUrls[1]}
          alt="Ubutaka buri hafi y'umuhanda mu Rwanda"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
        <div className="absolute inset-x-0 top-0 p-5 sm:p-8">
          <h1 className="max-w-xl text-3xl font-semibold leading-tight text-white sm:text-5xl">
            Shaka ikibanza gihuje n&apos;umushinga wawe.
          </h1>
        </div>
        <div className="absolute inset-x-0 bottom-0 px-4 pb-4 sm:px-8 sm:pb-8">
          <div className="mx-auto max-w-4xl">
            <PlotSearchForm />
          </div>
        </div>
      </section>

      <div className="mx-auto mt-4 w-full max-w-7xl px-4 sm:px-6">
        <LandUseFilterChips search={{}} />
      </div>

      <section id="ibibanza-biri-ku-isoko" className="mx-auto flex w-full max-w-7xl items-end justify-between gap-4 px-4 pb-4 pt-5 sm:px-6">
        <div>
          <p className="text-sm font-semibold text-[var(--primary-base)]">Ku isoko ubu</p>
          <h2 className="mt-1 text-2xl font-semibold">Ibibanza biri ku isoko</h2>
        </div>
        <Link href="/submit-land" className="hidden min-h-11 items-center text-sm font-semibold text-[var(--primary-base)] sm:inline-flex">Ufite ikibanza?</Link>
      </section>
      <section data-testid="plot-grid" className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-3 px-4 pb-12 sm:grid-cols-3 sm:gap-4 sm:px-6 xl:grid-cols-4">
        {plots.map((plot) => <PlotCard key={plot.slug} plot={plot} />)}
      </section>
    </main>
  );
}
