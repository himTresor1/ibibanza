import { AlertOptInForm } from "../../features/buyers/alert-opt-in-form";
import { BackLink } from "../../features/navigation/back-link";

export default function AlertsPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <BackLink href="/" />
        <div>
          <p className="font-semibold text-[var(--brand)]">WhatsApp alerts</p>
          <h1 className="mt-2 text-3xl font-semibold">Akira ibibanza bikubereye</h1>
          <p className="mt-2 text-[var(--muted-foreground)]">Hitamo aho ushaka, budget, n&apos;icyiciro. Tuzajya twohereza ubutaka buhuye n&apos;ibyo ushaka.</p>
        </div>
        <AlertOptInForm />
      </div>
    </main>
  );
}
