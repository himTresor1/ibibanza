import { Badge, Button } from "@ibibanza/ui";
import Link from "next/link";
import Image from "next/image";
import { RiAddLine, RiArrowRightLine, RiPhoneLine, RiWhatsappLine } from "@remixicon/react";
import { PlotCard } from "../features/plots/plot-card";
import { PlotSearchForm } from "../features/plots/plot-search-form";
import { LandUseFilterChips } from "../features/plots/land-use-filter-chips";
import { plots, platformPhone } from "../lib/mock-data";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto w-full max-w-7xl px-4 py-4 sm:py-7">
        <nav className="flex items-center justify-between gap-3">
          <Link href="/" className="text-xl font-bold text-[var(--text-strong-950)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-base)]">
            Ibibanza
          </Link>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/alerts"
              aria-label="Akira alerts kuri WhatsApp"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-[var(--text-sub-600)] transition hover:bg-[var(--bg-soft-100)] hover:text-[var(--text-strong-950)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-base)]"
            >
              <RiWhatsappLine className="size-5 text-[var(--primary-base)]" />
              <span className="hidden sm:inline">WhatsApp alerts</span>
            </Link>
            <Link
              href="/submit-land"
              aria-label="Ohereza ikibanza"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-[var(--text-sub-600)] transition hover:bg-[var(--bg-soft-100)] hover:text-[var(--text-strong-950)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-base)]"
            >
              <RiAddLine className="size-5" />
              <span className="hidden sm:inline">Ohereza ikibanza</span>
            </Link>
            <Button asChild size="small" className="min-h-11 px-3">
              <a href={`tel:${platformPhone}`} aria-label="Hamagara Ibibanza">
                <RiPhoneLine className="size-5" />
                <span className="hidden sm:inline">Hamagara</span>
              </a>
            </Button>
          </div>
        </nav>
        <div className="mt-6 sm:mt-8">
          <PlotSearchForm />
          <div className="mt-4">
            <LandUseFilterChips search={{}} />
          </div>
        </div>
        <div className="mt-4 grid overflow-hidden rounded-2xl bg-[var(--bg-strong-950)] text-white md:grid-cols-[1fr_0.9fr]">
          <div className="flex min-h-72 flex-col justify-center px-5 py-10 sm:px-8 lg:px-12">
            <Badge className="w-fit bg-white/10 text-white ring-white/20">Ibibanza bigurishwa mu Rwanda</Badge>
            <h1 className="mt-4 max-w-xl text-3xl font-semibold leading-tight sm:text-5xl">
              Shaka ikibanza gihuje n&apos;umushinga wawe.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-white/80 sm:text-lg">
              Reba ibibanza byagenzuwe, uhitemo icyo wifuza, hanyuma dutegure gusura hamwe.
            </p>
            <Link
              href="#ibibanza-biri-ku-isoko"
              className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-[var(--text-strong-950)] transition hover:bg-[var(--bg-soft-100)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Reba ibibanza
              <RiArrowRightLine className="size-4" />
            </Link>
          </div>
          <div className="relative min-h-64 md:min-h-full">
            <Image
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              src={plots[0].imageUrls[1]}
              alt="Ubutaka buri hafi y'umuhanda mu Rwanda"
              className="object-cover"
            />
          </div>
        </div>
      </section>
      <section id="ibibanza-biri-ku-isoko" className="mx-auto flex w-full max-w-7xl items-end justify-between gap-4 px-4 pb-4 pt-3 sm:pt-5">
        <div>
          <p className="text-sm font-semibold text-[var(--primary-base)]">Ku isoko ubu</p>
          <h2 className="mt-1 text-2xl font-semibold">Ibibanza biri ku isoko</h2>
        </div>
        <Link href="/submit-land" className="hidden min-h-11 items-center text-sm font-semibold text-[var(--primary-base)] sm:inline-flex">Ufite ikibanza?</Link>
      </section>
      <section data-testid="plot-grid" className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-3 px-4 pb-12 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
        {plots.map((plot) => <PlotCard key={plot.slug} plot={plot} />)}
      </section>
    </main>
  );
}
