import { Badge, Card } from "@ibibanza/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RiArrowLeftLine, RiMapPin2Line, RiShieldCheckLine, RiSparkling2Line } from "@remixicon/react";
import { BuyerInterestForm } from "../../../features/leads/buyer-interest-form";
import { formatRwf, plots } from "../../../lib/mock-data";

export default async function PlotDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plot = plots.find((item) => item.slug === slug);
  if (!plot) notFound();

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-sub-600)]"><RiArrowLeftLine className="size-4" /> Subira ku bibanza</Link>
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.025em] sm:text-5xl">{plot.title}</h1>
          <p className="mt-3 flex items-center gap-2 text-[var(--text-sub-600)]"><RiMapPin2Line className="size-5" /> {plot.sector}, {plot.district}</p>
        </div>
        <div className="grid gap-2 overflow-hidden rounded-3xl md:grid-cols-[1.3fr_0.7fr]">
          <img src={plot.imageUrls[0]} alt={`${plot.title} ifoto nyamukuru`} className="aspect-[1.35] h-full w-full object-cover" />
          <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
            {plot.imageUrls.slice(1).map((imageUrl, index) => (
              <img key={imageUrl} src={imageUrl} alt={`${plot.title} gallery ${index + 2}`} className="aspect-[1.35] h-full w-full object-cover md:aspect-auto" />
            ))}
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <Card className="p-5">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div><span className="text-sm text-[var(--text-soft-400)]">Igiciro</span><strong className="block text-lg">{formatRwf(plot.priceRwf)}</strong></div>
                <div><span className="text-sm text-[var(--text-soft-400)]">Ingano</span><strong className="block text-lg">{plot.sizeSqm} sqm</strong></div>
                <div><span className="text-sm text-[var(--text-soft-400)]">Icyiciro</span><strong className="block text-lg">{plot.landUse}</strong></div>
                <div><span className="text-sm text-[var(--text-soft-400)]">Hasigaye</span><strong className="block text-lg">{plot.remainingCount}</strong></div>
              </div>
            </Card>
            <Card className="p-5">
              <h2 className="flex items-center gap-2 text-xl font-semibold"><RiShieldCheckLine className="size-5 text-[var(--primary-base)]" /> Ibyagenzuwe</h2>
              <div className="mt-4 flex flex-wrap gap-2">{plot.badges.map((badge) => <Badge key={badge}>{badge}</Badge>)}</div>
              <p className="mt-4 max-w-2xl leading-7 text-[var(--text-sub-600)]">
                Iki kibanza kiri muri pipeline ya Ibibanza. Tugufasha kuvugana n&apos;umuntu ubishinzwe, gutegura gusura,
                no gukurikirana lead mbere y&apos;uko ibiganiro byo kugura bikomeza hanze ya platform.
              </p>
            </Card>
            <Card className="p-5">
              <h2 className="flex items-center gap-2 text-xl font-semibold"><RiSparkling2Line className="size-5 text-[var(--primary-base)]" /> Impamvu kirebwa cyane</h2>
              <ul className="mt-4 grid gap-3 text-[var(--text-sub-600)]">
                <li>Umuhanda uri hafi kandi gusura birategurwa mbere yo kujyayo.</li>
                <li>Numero y&apos;umugurisha ntabwo tuyerekana; Ibibanza niyo igenzura lead.</li>
                <li>Ushobora kwakira updates kuri WhatsApp niba hari plots zisigaye cyangwa igiciro gihindutse.</li>
              </ul>
            </Card>
          </div>
          <div className="lg:sticky lg:top-6 lg:self-start">
            <BuyerInterestForm plotId={plot.id} />
          </div>
        </div>
      </div>
    </main>
  );
}
