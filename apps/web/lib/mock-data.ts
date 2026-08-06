export const platformPhone = "+250700000000";

export const plots = [
  {
    id: "bugesera-nyamata-12m",
    slug: "bugesera-nyamata-12m",
    title: "Ikibanza i Nyamata hafi y'umuhanda",
    district: "Bugesera",
    sector: "Nyamata",
    priceRwf: 12000000,
    sizeSqm: 300,
    landUse: "Guturwamo",
    status: "published",
    remainingCount: 8,
    imageUrls: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=1200&q=80",
    ],
    badges: ["Amafoto yagenzuwe", "Aho kiri hemejwe", "Gusura birashoboka"],
  },
  {
    id: "kigali-kanombe-35m",
    slug: "kigali-kanombe-35m",
    title: "Ikibanza cyo guturamo i Kanombe",
    district: "Kigali",
    sector: "Kanombe",
    priceRwf: 35000000,
    sizeSqm: 420,
    landUse: "Guturwamo",
    status: "published",
    remainingCount: 3,
    imageUrls: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    ],
    badges: ["UPI/document birategerejwe", "Gusura weekend"],
  },
  {
    id: "rwamagana-commercial-18m",
    slug: "rwamagana-commercial-18m",
    title: "Ikibanza cy'ubucuruzi i Rwamagana",
    district: "Rwamagana",
    sector: "Kigabiro",
    priceRwf: 18000000,
    sizeSqm: 500,
    landUse: "Ubucuruzi",
    status: "reserved",
    remainingCount: 5,
    imageUrls: [
      "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    ],
    badges: ["Aho kiri hemejwe", "Umuhanda uri hafi"],
  },
];

export const leads = [
  { id: "lead_1", buyerName: "Uwineza Alice", buyerPhone: "+250788333444", plot: plots[0], status: "new", urgency: "now" },
  { id: "lead_2", buyerName: "Mugisha Eric", buyerPhone: "+250788222111", plot: plots[1], status: "visit_scheduled", urgency: "this_month" },
];

export function formatRwf(value: number) {
  return `${new Intl.NumberFormat("en-US").format(value)} RWF`;
}
