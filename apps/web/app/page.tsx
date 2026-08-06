export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-5 py-12">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">
          Ibibanza
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Bona ibibanza byizewe, uhamagare ikipe igufasha kubisura.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted-foreground)]">
          Turakusanyiriza ibibanza biri ku isoko, tugafata amakuru y&apos;abifuza kugura,
          hanyuma tukabafasha kuvugana n&apos;ikipe yacu mbere yo gusura.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white"
            href="tel:+250700000000"
          >
            Hamagara ubu
          </a>
          <a
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--foreground)]"
            href="/alerts"
          >
            Jya ku rutonde rwa WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
