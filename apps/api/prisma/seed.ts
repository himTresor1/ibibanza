import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const seller = await prisma.seller.upsert({
    where: { phone: "+250788111222" },
    update: {},
    create: { name: "Mukamana Chantal", phone: "+250788111222" },
  });

  await prisma.plot.upsert({
    where: { slug: "bugesera-nyamata-12m" },
    update: {},
    create: {
      slug: "bugesera-nyamata-12m",
      title: "Ikibanza i Nyamata hafi y'umuhanda",
      district: "Bugesera",
      sector: "Nyamata",
      priceRwf: 12000000,
      sizeSqm: 300,
      remainingCount: 8,
      landUse: "residential",
      status: "published",
      sellerId: seller.id,
      accessNotes: "Umuhanda uri hafi, gusura birashoboka.",
      publicNotes: "Hamagara ikipe ya Ibibanza mbere yo kujya kuhareba.",
      photosChecked: true,
      locationConfirmed: true,
      viewingAvailable: true,
      tags: ["Metero 300 uvuye ku muhanda", "Hafi y'ishuri ryisumbuye", "Amazi arahari"],
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
            alt: "Ikibanza i Bugesera",
          },
        ],
      },
    },
  });

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
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
