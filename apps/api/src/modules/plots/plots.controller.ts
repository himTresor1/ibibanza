import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards, UsePipes } from "@nestjs/common";
import { PlotStatus } from "@prisma/client";
import { CreatePlotSchema } from "@ibibanza/shared";
import { AdminApiKeyGuard } from "../../common/security/admin-api-key.guard";
import { ZodValidationPipe } from "../../common/validation/zod-validation.pipe";
import { PlotsService } from "./plots.service";

@Controller()
export class PlotsController {
  constructor(private readonly plots: PlotsService) {}

  @Get("plots")
  listPublic(@Query() query: Record<string, string>) {
    return this.plots.listPublic({
      location: query.location,
      minPrice: query.minPrice ? Number(query.minPrice) : undefined,
      maxPrice: query.maxPrice ? Number(query.maxPrice) : undefined,
      landUse: query.landUse,
    });
  }

  @Get("plots/:slug")
  getPublic(@Param("slug") slug: string) {
    return this.plots.getPublic(slug);
  }

  @UseGuards(AdminApiKeyGuard)
  @Get("admin/plots")
  listAdmin() {
    return this.plots.listAdmin();
  }

  @UseGuards(AdminApiKeyGuard)
  @Post("admin/plots")
  @UsePipes(new ZodValidationPipe(CreatePlotSchema.extend({ sellerId: CreatePlotSchema.shape.title })))
  createAdmin(@Body() body: Parameters<PlotsService["createAdmin"]>[0]) {
    return this.plots.createAdmin(body);
  }

  @UseGuards(AdminApiKeyGuard)
  @Patch("admin/plots/:id/status")
  updateStatus(@Param("id") id: string, @Body("status") status: PlotStatus) {
    return this.plots.updateStatus(id, status);
  }
}
