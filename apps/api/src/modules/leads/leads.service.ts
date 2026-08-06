import { Injectable, NotFoundException } from "@nestjs/common";
import { BuyerInterestInput, LeadStatusUpdateInput } from "@ibibanza/shared";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: BuyerInterestInput) {
    const buyer = await this.prisma.buyer.findUnique({ where: { phone: input.buyerPhone } });
    const plot = await this.prisma.plot.findFirst({ where: { OR: [{ id: input.plotId }, { slug: input.plotId }] } });
    if (!plot) throw new NotFoundException({ code: "PLOT_NOT_FOUND", message: "Ikibanza ntikibonetse." });
    return this.prisma.lead.create({
      data: {
        plotId: plot.id,
        buyerId: buyer?.id,
        buyerName: input.buyerName,
        buyerPhone: input.buyerPhone,
        preferredVisitTime: input.preferredVisitTime,
        note: input.note,
      },
      include: { plot: { include: { images: true } }, buyer: true },
    });
  }

  async listAdmin() {
    return this.prisma.lead.findMany({ include: { plot: true, buyer: true }, orderBy: { createdAt: "desc" } });
  }

  async updateStatus(id: string, input: LeadStatusUpdateInput) {
    return this.prisma.lead.update({
      where: { id },
      data: { status: input.status, statusNote: input.note },
      include: { plot: true, buyer: true },
    });
  }
}
