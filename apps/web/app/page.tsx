import { Badge, Button, Card, Input, Select } from "@ibibanza/ui";
import Link from "next/link";
import { RiCalendarLine, RiMapPin2Line, RiMoneyDollarCircleLine, RiSearchLine } from "@remixicon/react";
import { PlotCard } from "../features/plots/plot-card";
import { plots, platformPhone } from "../lib/mock-data";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:py-10">
        <nav className="mb-8 flex items-center justify-between">
          <strong className="text-xl tracking-[-0.02em] text-[var(--text-strong-950)]">Ibibanza</strong>
          <div className="hidden items-center gap-6 text-sm font-medium text-[var(--text-sub-600)] sm:flex">
            <Link href="/submit-land">Ohereza ikibanza</Link>
            <Link href="/alerts">WhatsApp alerts</Link>
          </div>
          <Button asChild size="small"><a href={`tel:${platformPhone}`}>Hamagara</a></Button>
        </nav>
        <div className="relative overflow-hidden rounded-[28px] bg-[var(--bg-strong-950)] px-5 py-14 text-white sm:px-10 lg:px-14">
          <div className="absolute inset-0 opacity-45">
            <img src={plots[0].imageUrls[1]} alt="Ikibanza gifite umuhanda n'ahazubakwa" className="h-full w-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(14,18,27,0.92)] via-[rgba(14,18,27,0.66)] to-[rgba(14,18,27,0.18)]" />
          <div className="relative max-w-3xl">
            <Badge className="bg-white/10 text-white ring-white/20">Land leads Rwanda</Badge>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.035em] sm:text-6xl">
              Shaka ikibanza nk&apos;uko ushaka aho kurara.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82">
              Hitamo aho ushaka, budget yawe, n&apos;igihe wifuza kugura. Ibibanza ikwereka plots ziri ku isoko,
              hanyuma ikipe yacu igufasha gutegura gusura.
            </p>
          </div>
        </div>

        <Card className="relative z-10 mx-auto -mt-9 grid max-w-5xl gap-2 p-2 shadow-[0_16px_50px_rgba(14,18,27,0.14)] md:grid-cols-[1.2fr_0.9fr_0.9fr_auto]">
          <label className="flex min-h-16 items-center gap-3 rounded-xl px-4 hover:bg-[var(--bg-weak-50)]">
            <RiMapPin2Line className="size-5 text-[var(--primary-base)]" />
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold text-[var(--text-strong-950)]">Aho ushaka</span>
              <Input aria-label="Aho ushaka" placeholder="Bugesera, Kigali..." className="h-6 p-0" />
            </span>
          </label>
          <label className="flex min-h-16 items-center gap-3 rounded-xl px-4 hover:bg-[var(--bg-weak-50)]">
            <RiMoneyDollarCircleLine className="size-5 text-[var(--primary-base)]" />
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold text-[var(--text-strong-950)]">Budget</span>
              <Input aria-label="Budget" placeholder="Kugeza kuri 20M" className="h-6 p-0" />
            </span>
          </label>
          <label className="flex min-h-16 items-center gap-3 rounded-xl px-4 hover:bg-[var(--bg-weak-50)]">
            <RiCalendarLine className="size-5 text-[var(--primary-base)]" />
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold text-[var(--text-strong-950)]">Icyiciro</span>
              <Select aria-label="Icyiciro" className="h-7 border-0 bg-transparent p-0 shadow-none">
                <option>Guturwamo</option><option>Ubucuruzi</option><option>Ubuhinzi</option>
              </Select>
            </span>
          </label>
          <Button asChild className="h-16 rounded-xl px-6"><Link href="/alerts"><RiSearchLine className="size-5" /> Shaka</Link></Button>
        </Card>
      </section>
      <section className="mx-auto flex w-full max-w-7xl items-end justify-between gap-4 px-4 pb-5 pt-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.025em]">Ibibanza biri ku isoko</h2>
          <p className="mt-1 text-sm text-[var(--text-sub-600)]">Scroll amafoto kuri card, ufungure detail, cyangwa uhamagare ikipe.</p>
        </div>
        <Link href="/submit-land" className="hidden text-sm font-semibold text-[var(--primary-base)] sm:block">Ufite ikibanza?</Link>
      </section>
      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-12 md:grid-cols-2 lg:grid-cols-3">
        {plots.map((plot) => <PlotCard key={plot.slug} plot={plot} />)}
      </section>
    </main>
  );
}
