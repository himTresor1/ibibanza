import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const IMAGES = [
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e",
];

const SELLERS = [
  { name: "Mukamana Chantal", phone: "+250788111222" },
  { name: "Habimana Eric", phone: "+250788111333" },
  { name: "Uwase Diane", phone: "+250788111444" },
  { name: "Nsengimana Jean Paul", phone: "+250788111555" },
  { name: "Mukandayisenga Alice", phone: "+250788111666" },
  { name: "Ndayisaba Patrick", phone: "+250788111777" },
];

const TAG_POOL = [
  "Metero 200 uvuye ku muhanda",
  "Hafi y'ishuri ryisumbuye",
  "Amazi arahari",
  "Amashanyarazi arahari",
  "Umudugudu urimo gutera imbere",
  "Hafi y'ibigo by'ubuzima",
  "Aho gutwara imodoka birashoboka",
  "Hafi ya sitasiyo ya moto",
  "Umuhanda uri hafi",
  "Hafi y'isoko",
];

function tagsFor(index: number) {
  const start = index % TAG_POOL.length;
  return [TAG_POOL[start], TAG_POOL[(start + 1) % TAG_POOL.length], TAG_POOL[(start + 3) % TAG_POOL.length]];
}

const PLOTS = [
  // Kigali
  { slug: "kigali-kanombe-35m", title: "Ikibanza cyo guturamo i Kanombe", district: "Kigali", sector: "Kanombe", cell: "Nyarugunga", village: "Karembure", priceRwf: 35_000_000, sizeSqm: 420, landUse: "residential", status: "published", remainingCount: 4 },
  { slug: "kigali-kimironko-42m", title: "Ikibanza i Kimironko hafi y'isoko", district: "Kigali", sector: "Kimironko", cell: "Bibare", village: "Kibagabaga", priceRwf: 42_000_000, sizeSqm: 350, landUse: "residential", status: "published", remainingCount: 2 },
  { slug: "kigali-nyarutarama-65m", title: "Ikibanza cyo hejuru i Nyarutarama", district: "Kigali", sector: "Nyarutarama", cell: "Nyarutarama", village: "Ingabo", priceRwf: 65_000_000, sizeSqm: 500, landUse: "residential", status: "published", remainingCount: 1 },
  { slug: "kigali-kacyiru-80m", title: "Ikibanza cy'ubucuruzi i Kacyiru", district: "Kigali", sector: "Kacyiru", cell: "Kamatamu", village: "Kacyiru I", priceRwf: 80_000_000, sizeSqm: 600, landUse: "commercial", status: "published", remainingCount: 1 },
  { slug: "kigali-gikondo-55m", title: "Ikibanza cy'ubucuruzi i Gikondo", district: "Kigali", sector: "Gikondo", cell: "Kigarama", village: "Gasharu", priceRwf: 55_000_000, sizeSqm: 450, landUse: "commercial", status: "reserved", remainingCount: 0 },
  { slug: "kigali-nyamirambo-28m", title: "Ikibanza cyo guturamo i Nyamirambo", district: "Kigali", sector: "Nyamirambo", cell: "Rugarama", village: "Nyamirambo I", priceRwf: 28_000_000, sizeSqm: 300, landUse: "residential", status: "published", remainingCount: 3 },
  { slug: "kigali-kabeza-38m", title: "Ikibanza kivanze i Kabeza", district: "Kigali", sector: "Kabeza", cell: "Kabeza", village: "Karama", priceRwf: 38_000_000, sizeSqm: 380, landUse: "mixed", status: "pending_review", remainingCount: 2 },

  // Bugesera
  { slug: "bugesera-nyamata-12m", title: "Ikibanza i Nyamata hafi y'umuhanda", district: "Bugesera", sector: "Nyamata", cell: "Rilima", village: "Kayenzi", priceRwf: 12_000_000, sizeSqm: 300, landUse: "residential", status: "published", remainingCount: 8 },
  { slug: "bugesera-ruhuha-8m", title: "Ikibanza cy'ubuhinzi i Ruhuha", district: "Bugesera", sector: "Ruhuha", cell: "Nyarurama", village: "Gitanga", priceRwf: 8_000_000, sizeSqm: 800, landUse: "farming", status: "published", remainingCount: 6 },
  { slug: "bugesera-ntarama-15m", title: "Ikibanza cyo guturamo i Ntarama", district: "Bugesera", sector: "Ntarama", cell: "Cyugaro", village: "Kanzenze", priceRwf: 15_000_000, sizeSqm: 350, landUse: "residential", status: "published", remainingCount: 5 },
  { slug: "bugesera-rilima-6m", title: "Ikibanza cy'ubuhinzi i Rilima", district: "Bugesera", sector: "Rilima", cell: "Kindama", village: "Rilima I", priceRwf: 6_500_000, sizeSqm: 1000, landUse: "farming", status: "published", remainingCount: 10 },
  { slug: "bugesera-mayange-5m", title: "Ikibanza cy'ubuhinzi i Mayange", district: "Bugesera", sector: "Mayange", cell: "Gakoni", village: "Mayange I", priceRwf: 5_000_000, sizeSqm: 1200, landUse: "farming", status: "pending_review", remainingCount: 4 },
  { slug: "bugesera-nyamata-22m", title: "Ikibanza cy'ubucuruzi i Nyamata", district: "Bugesera", sector: "Nyamata", cell: "Nyamata", village: "Nyamata Centre", priceRwf: 22_000_000, sizeSqm: 400, landUse: "commercial", status: "published", remainingCount: 2 },
  { slug: "bugesera-ruhuha-10m", title: "Ikibanza cyo guturamo i Ruhuha", district: "Bugesera", sector: "Ruhuha", cell: "Ruhuha", village: "Rwintare", priceRwf: 10_000_000, sizeSqm: 320, landUse: "residential", status: "reserved", remainingCount: 0 },

  // Muhanga
  { slug: "muhanga-town-45m", title: "Ikibanza cy'ubucuruzi mu mujyi wa Muhanga", district: "Muhanga", sector: "Muhanga", cell: "Kabgayi", village: "Muhanga I", priceRwf: 45_000_000, sizeSqm: 500, landUse: "commercial", status: "published", remainingCount: 2 },
  { slug: "muhanga-nyamabuye-18m", title: "Ikibanza cyo guturamo i Nyamabuye", district: "Muhanga", sector: "Nyamabuye", cell: "Nyamabuye", village: "Gahogo", priceRwf: 18_000_000, sizeSqm: 350, landUse: "residential", status: "published", remainingCount: 4 },
  { slug: "muhanga-kiyumba-7m", title: "Ikibanza cy'ubuhinzi i Kiyumba", district: "Muhanga", sector: "Kiyumba", cell: "Kiyumba", village: "Rugendabari", priceRwf: 7_000_000, sizeSqm: 900, landUse: "farming", status: "published", remainingCount: 7 },
  { slug: "muhanga-shyogwe-14m", title: "Ikibanza cyo guturamo i Shyogwe", district: "Muhanga", sector: "Shyogwe", cell: "Shyogwe", village: "Bwama", priceRwf: 14_000_000, sizeSqm: 300, landUse: "residential", status: "published", remainingCount: 3 },
  { slug: "muhanga-cyeza-6m", title: "Ikibanza cy'ubuhinzi i Cyeza", district: "Muhanga", sector: "Cyeza", cell: "Cyeza", village: "Nyarusenge", priceRwf: 6_000_000, sizeSqm: 1100, landUse: "farming", status: "published", remainingCount: 9 },
  { slug: "muhanga-town-25m", title: "Ikibanza kivanze mu mujyi wa Muhanga", district: "Muhanga", sector: "Muhanga", cell: "Muhanga", village: "Kabgayi II", priceRwf: 25_000_000, sizeSqm: 420, landUse: "mixed", status: "pending_review", remainingCount: 3 },
] as const;

async function main() {
  const sellers = [];
  for (const sellerData of SELLERS) {
    const seller = await prisma.seller.upsert({
      where: { phone: sellerData.phone },
      update: {},
      create: sellerData,
    });
    sellers.push(seller);
  }

  for (const [index, plot] of PLOTS.entries()) {
    const seller = sellers[index % sellers.length];
    await prisma.plot.upsert({
      where: { slug: plot.slug },
      update: {},
      create: {
        slug: plot.slug,
        title: plot.title,
        district: plot.district,
        sector: plot.sector,
        cell: plot.cell,
        village: plot.village,
        priceRwf: plot.priceRwf,
        sizeSqm: plot.sizeSqm,
        remainingCount: plot.remainingCount,
        landUse: plot.landUse,
        status: plot.status,
        sellerId: seller.id,
        accessNotes: "Umuhanda uri hafi, gusura birashoboka.",
        publicNotes: "Hamagara ikipe ya Ibibanza mbere yo kujya kuhareba.",
        photosChecked: true,
        locationConfirmed: true,
        viewingAvailable: true,
        tags: tagsFor(index),
        images: {
          create: [
            { url: IMAGES[index % IMAGES.length], alt: plot.title },
            { url: IMAGES[(index + 1) % IMAGES.length], alt: plot.title },
          ],
        },
      },
    });
  }

  await prisma.buyer.upsert({
    where: { phone: "+250788333444" },
    update: {},
    create: {
      name: "Uwineza Alice",
      phone: "+250788333444",
      locations: ["Bugesera", "Kigali"],
      maxBudget: 15000000,
      landUses: ["residential"],
      urgency: "now",
      buyerType: "local",
      language: "rw",
      consentWhatsapp: true,
      whatsappOptInAt: new Date(),
      whatsappOptInSource: "seed",
    },
  });

  console.log(`Seeded ${sellers.length} sellers and ${PLOTS.length} plots.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
