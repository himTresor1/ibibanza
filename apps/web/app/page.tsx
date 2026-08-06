import { Badge, Button, Card, Input, Select } from "@ibibanza/ui";
import Link from "next/link";
import { PlotCard } from "../features/plots/plot-card";
import { plots, platformPhone } from "../lib/mock-data";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
        <nav className="mb-8 flex items-center justify-between">
          <strong className="text-xl text-[var(--brand)]">Ibibanza</strong>
          <a href={`tel:${platformPhone}`}><Button className="min-h-10">Hamagara</Button></a>
        </nav>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <Badge>Ubutaka mu Rwanda</Badge>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
              Bona ibibanza byizewe, ubisabire gusura kuri telefone yacu.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted-foreground)]">
              Duhuza abaguzi n&apos;ibibanza biri ku isoko. Numero igaragara ni iya Ibibanza kugira ngo tugufashe
              gutegura gusura no gukurikirana lead neza.
            </p>
          </div>
          <Card className="space-y-3">
            <h2 className="text-lg font-semibold">Shaka ikibanza</h2>
            <Input aria-label="Aho ushaka" placeholder="Bugesera, Kigali, Rwamagana..." />
            <div className="grid grid-cols-2 gap-3">
              <Input aria-label="Budget" placeholder="Budget max" />
              <Select aria-label="Icyiciro">
                <option>Guturwamo</option>
                <option>Ubucuruzi</option>
                <option>Ubuhinzi</option>
              </Select>
            </div>
            <Link href="/alerts"><Button className="w-full">Mbika kuri WhatsApp alerts</Button></Link>
          </Card>
        </div>
      </section>
      <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 pb-12 md:grid-cols-2 lg:grid-cols-3">
        {plots.map((plot) => <PlotCard key={plot.slug} plot={plot} />)}
      </section>
    </main>
  );
}
