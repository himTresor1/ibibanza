import { Injectable } from "@nestjs/common";
import { BuyerPreferenceInput } from "@ibibanza/shared";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class BuyersService {
  constructor(private readonly prisma: PrismaService) {}

  async optIn(input: BuyerPreferenceInput) {
    return this.prisma.buyer.upsert({
      where: { phone: input.phone },
      update: {
        name: input.name,
        locations: input.locations,
        minBudget: input.minBudget,
        maxBudget: input.maxBudget,
        landUses: input.landUses,
        urgency: input.urgency,
        buyerType: input.buyerType,
        language: input.language,
        consentWhatsapp: true,
        whatsappOptInAt: new Date(),
        whatsappOptInSource: "website_form",
      },
      create: {
        name: input.name,
        phone: input.phone,
        locations: input.locations,
        minBudget: input.minBudget,
        maxBudget: input.maxBudget,
        landUses: input.landUses,
        urgency: input.urgency,
        buyerType: input.buyerType,
        language: input.language,
        consentWhatsapp: true,
        whatsappOptInAt: new Date(),
        whatsappOptInSource: "website_form",
      },
    });
  }
}
