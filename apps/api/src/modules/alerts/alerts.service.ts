import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { buildWhatsappMessage } from "./whatsapp-message-builder";

@Injectable()
export class AlertsService {
  constructor(private readonly prisma: PrismaService) {}

  async draftForPlot(plotId: string, input: { remainingCount?: number; visitWindow?: string }) {
    const plot = await this.prisma.plot.findUnique({ where: { id: plotId } });
    if (!plot) throw new NotFoundException({ code: "PLOT_NOT_FOUND", message: "Ikibanza ntikibonetse." });

    const buyers = await this.prisma.buyer.findMany({
      where: {
        consentWhatsapp: true,
        locations: { hasSome: [plot.district, plot.sector] },
        landUses: { has: plot.landUse },
        OR: [{ maxBudget: null }, { maxBudget: { gte: plot.priceRwf } }],
      },
      orderBy: [{ urgency: "asc" }, { createdAt: "desc" }],
    });

    const message = buildWhatsappMessage(plot, input.remainingCount, input.visitWindow);
    return this.prisma.alertDraft.create({
      data: {
        plotId,
        title: `Alert - ${plot.district} ${plot.priceRwf}`,
        message,
        remainingCount: input.remainingCount,
        visitWindow: input.visitWindow,
        recipients: { create: buyers.map((buyer) => ({ buyerId: buyer.id, phone: buyer.phone })) },
      },
      include: { plot: true, recipients: { include: { buyer: true } } },
    });
  }

  async get(id: string) {
    return this.prisma.alertDraft.findUnique({ where: { id }, include: { plot: true, recipients: { include: { buyer: true } } } });
  }

  async list() {
    return this.prisma.alertDraft.findMany({ include: { plot: true, recipients: true }, orderBy: { createdAt: "desc" } });
  }

  async markSent(id: string) {
    return this.prisma.alertDraft.update({
      where: { id },
      data: { status: "sent", sentAt: new Date(), recipients: { updateMany: { where: { status: "pending" }, data: { status: "sent", sentAt: new Date() } } } },
      include: { recipients: true },
    });
  }
}
