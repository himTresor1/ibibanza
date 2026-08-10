import { Injectable, NotFoundException } from "@nestjs/common";
import { PlotStatus, Prisma } from "@prisma/client";
import { CreatePlotInput } from "@ibibanza/shared";
import { PrismaService } from "../../prisma/prisma.service";

const includePublic = { images: true } satisfies Prisma.PlotInclude;
const includeAdmin = { images: true, seller: true } satisfies Prisma.PlotInclude;

function slugify(input: string) {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

@Injectable()
export class PlotsService {
  constructor(private readonly prisma: PrismaService) {}

  async listPublic(query: { location?: string; minPrice?: number; maxPrice?: number; landUse?: string }) {
    return this.prisma.plot.findMany({
      where: {
        status: { in: [PlotStatus.published, PlotStatus.reserved] },
        ...(query.location
          ? {
              OR: [
                { district: { contains: query.location, mode: "insensitive" } },
                { sector: { contains: query.location, mode: "insensitive" } },
                { cell: { contains: query.location, mode: "insensitive" } },
                { village: { contains: query.location, mode: "insensitive" } },
              ],
            }
          : {}),
        ...(query.minPrice || query.maxPrice
          ? {
              priceRwf: {
                ...(query.minPrice ? { gte: query.minPrice } : {}),
                ...(query.maxPrice ? { lte: query.maxPrice } : {}),
              },
            }
          : {}),
        ...(query.landUse ? { landUse: query.landUse as never } : {}),
      },
      include: includePublic,
      orderBy: { createdAt: "desc" },
    });
  }

  async getPublic(slug: string) {
    const plot = await this.prisma.plot.findFirst({
      where: { slug, status: { in: [PlotStatus.published, PlotStatus.reserved] } },
      include: includePublic,
    });
    if (!plot) throw new NotFoundException({ code: "PLOT_NOT_FOUND", message: "Ikibanza ntikibonetse." });
    return plot;
  }

  async listAdmin() {
    return this.prisma.plot.findMany({ include: includeAdmin, orderBy: { createdAt: "desc" } });
  }

  async createAdmin(input: CreatePlotInput & { sellerId: string }) {
    return this.prisma.plot.create({
      data: {
        slug: slugify(`${input.district}-${input.sector}-${input.priceRwf}-${Date.now()}`),
        title: input.title,
        district: input.district,
        sector: input.sector,
        cell: input.cell,
        village: input.village,
        priceRwf: input.priceRwf,
        sizeSqm: input.sizeSqm,
        landUse: input.landUse,
        status: input.status,
        accessNotes: input.accessNotes,
        publicNotes: input.publicNotes,
        tags: input.tags ?? [],
        sellerId: input.sellerId,
        images: { create: input.photoUrls.map((url) => ({ url, alt: input.title })) },
      },
      include: includeAdmin,
    });
  }

  async updateStatus(id: string, status: PlotStatus) {
    return this.prisma.plot.update({ where: { id }, data: { status }, include: includeAdmin });
  }
}
