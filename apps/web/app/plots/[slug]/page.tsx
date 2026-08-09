import { Badge, Button, Chip } from "@ibibanza/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RiMapPin2Line, RiShieldCheckLine, RiSparkling2Line } from "@remixicon/react";
import { BuyerInterestForm } from "../../../features/leads/buyer-interest-form";
import { BackLink } from "../../../features/navigation/back-link";
import { PlotGallery } from "../../../features/plots/plot-gallery";
import { formatRwf } from "../../../lib/mock-data";
import { fetchPlotBySlug } from "../../../lib/plots-api";

export default async function PlotDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plot = await fetchPlotBySlug(slug);
  if (!plot) notFound();

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-4 pb-24 sm:py-7 lg:pb-7">
      <div className="mx-auto max-w-7xl">
        <BackLink href="/" />

        <header className="mt-4 flex flex-col gap-4 sm:mt-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--primary-base)]">Ikibanza cyagenzuwe</p>
            <h1 className="mt-1 max-w-3xl text-3xl font-semibold leading-tight text-[var(--text-strong-950)] sm:text-5xl">{plot.title}</h1>
            <p className="mt-3 flex items-center gap-2 text-sm font-medium text-[var(--text-sub-600)] sm:text-base">
              <RiMapPin2Line className="size-5 text-[var(--primary-base)]" />
              {plot.sector}, {plot.district}
            </p>
          </div>
        </header>

        <div className="mt-6">
          <PlotGallery images={plot.imageUrls} title={plot.title} />
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_23rem]">
          <article className="space-y-8">
            <section className="grid grid-cols-2 border-y border-[var(--stroke-soft-200)] sm:grid-cols-4">
              <div className="border-b border-r border-[var(--stroke-soft-200)] px-3 py-4 sm:border-b-0">
                <p className="text-xs font-medium text-[var(--text-soft-400)]">Igiciro</p>
                <p className="mt-1 font-mono text-lg font-bold text-[var(--primary-base)]">{formatRwf(plot.priceRwf)}</p>
              </div>
              <div className="border-b border-[var(--stroke-soft-200)] px-3 py-4 sm:border-b-0 sm:border-r">
                <p className="text-xs font-medium text-[var(--text-soft-400)]">Ingano</p>
                <p className="mt-1 text-base font-bold text-[var(--text-strong-950)]">{plot.sizeSqm} sqm</p>
              </div>
              <div className="border-r border-[var(--stroke-soft-200)] px-3 py-4 sm:border-r">
                <p className="text-xs font-medium text-[var(--text-soft-400)]">Icyiciro</p>
                <p className="mt-1 text-base font-bold text-[var(--text-strong-950)]">{plot.landUse}</p>
              </div>
              <div className="px-3 py-4">
                <p className="text-xs font-medium text-[var(--text-soft-400)]">Hasigaye</p>
                <p className="mt-1 text-base font-bold text-[var(--text-strong-950)]">{plot.remainingCount} plots</p>
              </div>
            </section>

            <section className="border-b border-[var(--stroke-soft-200)] pb-8">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-[var(--text-strong-950)]">
                <RiShieldCheckLine className="size-5 text-[var(--primary-base)]" />
                Ibyagenzuwe
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {plot.badges.map((badge) => <Badge key={badge}>{badge}</Badge>)}
              </div>
              <p className="mt-4 max-w-2xl leading-7 text-[var(--text-sub-600)]">
                Iki kibanza cyashyizwe ku isoko nyuma yo kugenzura amakuru y&apos;ibanze. Ibibanza ikurikirana ubusabe bwawe
                kandi igategura gusura mbere y&apos;uko ibiganiro byo kugura bikomeza hanze ya platform.
              </p>
            </section>

            {plot.tags.length > 0 ? (
              <section className="border-b border-[var(--stroke-soft-200)] pb-8">
                <h2 className="text-xl font-semibold text-[var(--text-strong-950)]">
                  Ibindi bijyanye n&apos;iki kibanza
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {plot.tags.map((tag) => (
                    <Chip key={tag} className="h-auto cursor-default px-2.5 py-1 text-xs">
                      {tag}
                    </Chip>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="border-b border-[var(--stroke-soft-200)] pb-8">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-[var(--text-strong-950)]">
                <RiSparkling2Line className="size-5 text-[var(--primary-base)]" />
                Uko bigenda
              </h2>
              <ol className="mt-4 grid gap-3 text-sm leading-6 text-[var(--text-sub-600)]">
                <li><span className="font-semibold text-[var(--text-strong-950)]">1.</span> Ohereza usabe gusura cyangwa uhamagare Ibibanza.</li>
                <li><span className="font-semibold text-[var(--text-strong-950)]">2.</span> Liaison wacu agufasha guhuza igihe cyo gusura ikibanza.</li>
                <li><span className="font-semibold text-[var(--text-strong-950)]">3.</span> Nuhitamo kugura, ibiganiro bikomeza hanze ya platform.</li>
              </ol>
            </section>
          </article>

          <aside className="hidden lg:sticky lg:top-6 lg:block lg:self-start">
            <BuyerInterestForm plotId={plot.id} />
          </aside>
          <div className="lg:hidden">
            <BuyerInterestForm plotId={plot.id} />
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[var(--stroke-soft-200)] bg-white/95 p-3 shadow-[0_-8px_24px_rgba(20,20,18,0.08)] backdrop-blur lg:hidden">
        <Button asChild className="min-h-11 w-full">
          <Link href="#visit-request">Tegura gusura</Link>
        </Button>
      </div>
    </main>
  );
}
