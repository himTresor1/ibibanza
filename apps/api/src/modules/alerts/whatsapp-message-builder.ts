import { Plot } from "@prisma/client";

export function buildWhatsappMessage(plot: Plot, remainingCount?: number, visitWindow?: string) {
  const phone = process.env.PUBLIC_CONTACT_PHONE ?? "+250700000000";
  const remaining = remainingCount ?? plot.remainingCount;
  return [
    `IBIBANZA BISHYA - ${plot.district}`,
    "",
    remaining ? `Hasigaye ibibanza ${remaining}.` : "Hari ibibanza bishya bihari.",
    `Igiciro: ${plot.priceRwf.toLocaleString("en-US")} RWF`,
    `Ingano: ${plot.sizeSqm} sqm`,
    `Aho biherereye: ${plot.sector}, ${plot.district}`,
    visitWindow ? `Gusura: ${visitWindow}` : "Gusura birashoboka.",
    "",
    "Ushaka kugisura cyangwa kubaza amakuru, duhamagare:",
    phone,
  ].join("\n");
}
