import { Button } from "@ibibanza/ui";
import Link from "next/link";
import { BackLink } from "../../features/navigation/back-link";
import { platformPhone } from "../../lib/mock-data";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <BackLink href="/" />
        <div>
          <p className="font-semibold text-[var(--brand)]">Abo turi bo</p>
          <h1 className="mt-2 text-3xl font-semibold text-[var(--text-strong-950)]">Ibibanza ni nde?</h1>
          <p className="mt-4 leading-7 text-[var(--muted-foreground)]">
            Ibibanza ni urubuga rufasha abashaka kugura cyangwa kugurisha ubutaka mu Rwanda guhuza mu buryo bworoshye
            kandi bwizewe. Dufasha abaguzi kubona ibibanza byagenzuwe, kandi dufasha abagurisha kubona abaguzi
            b&apos;ukuri bitabaye ngombwa ko batanga telefone yabo hanze.
          </p>
          <p className="mt-4 leading-7 text-[var(--muted-foreground)]">
            Buri kibanza kigenzurwa mbere yo gushyirwa ku isoko, kandi ikipe yacu ifasha guhuza gusura no kubaza
            ibibazo mbere y&apos;uko amasezerano akomeza hanze y&apos;urubuga.
          </p>
        </div>
        <Button asChild>
          <a href={`tel:${platformPhone}`}>Duhamagare</a>
        </Button>
        <p className="text-sm text-[var(--muted-foreground)]">
          Ufite ikibanza wifuza kugurisha? <Link href="/submit-land" className="font-semibold text-[var(--primary-base)]">Ohereza ikibanza</Link>
        </p>
      </div>
    </main>
  );
}
