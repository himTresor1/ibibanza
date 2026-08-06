"use client";

import { Button, Card, FormField, Input, Textarea } from "@ibibanza/ui";
import { useState } from "react";
import { postJson } from "../../lib/api-client";
import { platformPhone } from "../../lib/mock-data";

export function BuyerInterestForm({ plotId }: { plotId: string }) {
  const [status, setStatus] = useState("");

  async function onSubmit(formData: FormData) {
    setStatus("Kohereza...");
    try {
      await postJson(`/plots/${plotId}/interests`, {
        buyerName: formData.get("buyerName"),
        buyerPhone: formData.get("buyerPhone"),
        preferredVisitTime: formData.get("preferredVisitTime"),
        note: formData.get("note"),
      });
      setStatus("Twakiriye ubusabe. Liaison wa Ibibanza araguhamagara.");
    } catch {
      setStatus("Ntibyashobotse. Ushobora kuduhamagara ako kanya.");
    }
  }

  return (
    <Card>
      <form action={onSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold">Saba gusura iki kibanza</h2>
        <FormField id="buyerName" label="Amazina yawe"><Input name="buyerName" placeholder="Amazina" required /></FormField>
        <FormField id="buyerPhone" label="Telefone yawe"><Input name="buyerPhone" placeholder="+250788123456" required /></FormField>
        <FormField id="preferredVisitTime" label="Igihe wifuza gusura"><Input name="preferredVisitTime" placeholder="Urugero: Ku wa Gatandatu" /></FormField>
        <FormField id="note" label="Icyo ushaka kubaza"><Textarea name="note" placeholder="Andika ikibazo cyangwa budget yawe." /></FormField>
        <div className="grid gap-2 sm:grid-cols-2">
          <Button type="submit" className="w-full">Ohereza ubusabe</Button>
          <a href={`tel:${platformPhone}`}><Button variant="secondary" className="w-full">Hamagara ubu</Button></a>
        </div>
        {status ? <p className="text-sm text-[var(--muted-foreground)]">{status}</p> : null}
      </form>
    </Card>
  );
}
