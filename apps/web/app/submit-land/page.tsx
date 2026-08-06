import { SellerLandForm } from "../../features/sellers/seller-land-form";
import { BackLink } from "../../features/navigation/back-link";

export default function SubmitLandPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <BackLink href="/" />
        <div>
          <p className="font-semibold text-[var(--brand)]">Gurisha ikibanza</p>
          <h1 className="mt-2 text-3xl font-semibold">Ohereza ikibanza cyawe</h1>
          <p className="mt-2 text-[var(--muted-foreground)]">Tugenzura amakuru mbere yo kugishyira ku rubuga. Telefone yawe ntabwo igaragara ku baguzi.</p>
        </div>
        <SellerLandForm />
      </div>
    </main>
  );
}
