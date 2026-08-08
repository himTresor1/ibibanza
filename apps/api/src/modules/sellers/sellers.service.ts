import { Injectable } from "@nestjs/common";
import { SellerSubmissionInput } from "@ibibanza/shared";
import { PrismaService } from "../../prisma/prisma.service";

function slugify(input: string) {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

@Injectable()
export class SellersService {
  constructor(private readonly prisma: PrismaService) {}

  async submit(input: SellerSubmissionInput) {
    const seller = await this.prisma.seller.upsert({
      where: { phone: input.sellerPhone },
      update: { name: input.sellerName },
      create: { name: input.sellerName, phone: input.sellerPhone },
    });
    const plot = await this.prisma.plot.create({
      data: {
        slug: slugify(`${input.district}-${input.sector}-${input.priceRwf}-${Date.now()}`),
        title: `Ikibanza ${input.sector}, ${input.district}`,
        district: input.district,
        sector: input.sector,
        priceRwf: input.priceRwf,
        sizeSqm: input.sizeSqm,
        landUse: input.landUse,
        status: "pending_review",
        accessNotes: input.accessNotes,
        internalNotes: input.sellerNotes,
        tags: input.tags ?? [],
        sellerId: seller.id,
        images: { create: input.photoUrls.map((url) => ({ url, alt: `Ikibanza ${input.sector}` })) },
      },
    });
    await this.prisma.auditLog.create({ data: { action: "seller_submission_created", entity: "plot", entityId: plot.id } });
    return { id: plot.id, status: plot.status };
  }
}
