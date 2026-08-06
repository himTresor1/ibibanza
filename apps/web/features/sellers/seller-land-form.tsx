"use client";

import { Button, Card, FormField, Input, Select, Textarea } from "@ibibanza/ui";
import { useState } from "react";
import { postJson } from "../../lib/api-client";

export function SellerLandForm() {
  const [status, setStatus] = useState<string>("");

  async function onSubmit(formData: FormData) {
    setStatus("Kohereza...");
    try {
      await postJson("/seller-submissions", {
        sellerName: formData.get("sellerName"),
        sellerPhone: formData.get("sellerPhone"),
        district: formData.get("district"),
        sector: formData.get("sector"),
        priceRwf: Number(formData.get("priceRwf")),
        sizeSqm: Number(formData.get("sizeSqm")),
        landUse: formData.get("landUse"),
        photoUrls: String(formData.get("photoUrls") ?? "").split("\n").map((item) => item.trim()).filter(Boolean),
        accessNotes: formData.get("accessNotes"),
        sellerNotes: formData.get("sellerNotes"),
      });
      setStatus("Twakiriye ikibanza. Ikipe ya Ibibanza iraguhamagara nyuma yo kugenzura amakuru.");
    } catch {
      setStatus("Ntibyashobotse. Reba ko API iri gukora kandi amakuru yuzuye neza.");
    }
  }

  return (
    <Card>
      <form action={onSubmit} className="grid gap-4">
        <FormField id="sellerName" label="Amazina y'ugurisha"><Input name="sellerName" required /></FormField>
        <FormField id="sellerPhone" label="Telefone"><Input name="sellerPhone" placeholder="+250788123456" required /></FormField>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField id="district" label="Akarere"><Input name="district" placeholder="Bugesera" required /></FormField>
          <FormField id="sector" label="Umurenge"><Input name="sector" placeholder="Nyamata" required /></FormField>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <FormField id="priceRwf" label="Igiciro RWF"><Input name="priceRwf" inputMode="numeric" required /></FormField>
          <FormField id="sizeSqm" label="Ingano sqm"><Input name="sizeSqm" inputMode="numeric" required /></FormField>
          <FormField id="landUse" label="Icyiciro"><Select name="landUse" defaultValue="residential"><option value="residential">Guturwamo</option><option value="commercial">Ubucuruzi</option><option value="farming">Ubuhinzi</option></Select></FormField>
        </div>
        <FormField id="photoUrls" label="Amafoto"><Textarea name="photoUrls" placeholder="https://example.com/photo.jpg" required /></FormField>
        <FormField id="accessNotes" label="Umuhanda n'ibindi"><Textarea name="accessNotes" /></FormField>
        <FormField id="sellerNotes" label="Ibisobanuro by'imbere"><Textarea name="sellerNotes" /></FormField>
        <Button type="submit">Ohereza ngo bigenzurwe</Button>
        {status ? <p className="text-sm text-[var(--muted-foreground)]">{status}</p> : null}
      </form>
    </Card>
  );
}
