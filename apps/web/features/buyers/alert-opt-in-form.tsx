"use client";

import { Button, Card, Checkbox, FormField, Input, Select } from "@ibibanza/ui";
import { useState } from "react";
import { postJson } from "../../lib/api-client";
import { platformPhone } from "../../lib/mock-data";

export function AlertOptInForm() {
  const [status, setStatus] = useState("");
  const waText = encodeURIComponent("Muraho Ibibanza, ndashaka kwakira alerts z'ibibanza kuri WhatsApp.");

  async function onSubmit(formData: FormData) {
    setStatus("Kohereza...");
    try {
      await postJson("/buyers/alert-opt-in", {
        name: formData.get("name"),
        phone: formData.get("phone"),
        locations: String(formData.get("locations") ?? "").split(",").map((item) => item.trim()).filter(Boolean),
        maxBudget: Number(formData.get("maxBudget")),
        landUses: [formData.get("landUse")],
        urgency: formData.get("urgency"),
        buyerType: formData.get("buyerType"),
        language: "rw",
        consentWhatsapp: formData.get("consentWhatsapp") === "on",
      });
      setStatus("Wamaze kujya kuri list ya WhatsApp alerts.");
    } catch {
      setStatus("Ntibyashobotse. Emeza consent kandi wuzuze telefone/location/budget neza.");
    }
  }

  return (
    <Card>
      <form action={onSubmit} className="grid gap-4">
        <FormField id="name" label="Amazina"><Input name="name" required /></FormField>
        <FormField id="phone" label="WhatsApp telefone"><Input name="phone" placeholder="+250788123456" required /></FormField>
        <FormField id="locations" label="Aho ushaka"><Input name="locations" placeholder="Bugesera, Kigali" required /></FormField>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField id="maxBudget" label="Budget ntarengwa"><Input name="maxBudget" inputMode="numeric" required /></FormField>
          <FormField id="urgency" label="Igihe ushaka kuguriramo"><Select name="urgency"><option value="now">Ubu</option><option value="this_month">Muri uku kwezi</option><option value="later">Nyuma</option></Select></FormField>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField id="landUse" label="Zoning"><Select name="landUse"><option value="residential">Guturwamo</option><option value="commercial">Ubucuruzi</option><option value="farming">Ubuhinzi</option></Select></FormField>
          <FormField id="buyerType" label="Uri hehe"><Select name="buyerType"><option value="local">Mu Rwanda</option><option value="diaspora">Diaspora</option></Select></FormField>
        </div>
        <label className="flex items-center gap-3 text-sm"><Checkbox name="consentWhatsapp" required /> Nemeye kwakira ubutumwa kuri WhatsApp.</label>
        <Button type="submit">Ohereza ubutaka bushya kuri WhatsApp</Button>
        <a className="text-sm font-medium text-[var(--brand)]" href={`https://wa.me/${platformPhone.replace("+", "")}?text=${waText}`}>Fungura WhatsApp ubungubu</a>
        {status ? <p className="text-sm text-[var(--muted-foreground)]">{status}</p> : null}
      </form>
    </Card>
  );
}
