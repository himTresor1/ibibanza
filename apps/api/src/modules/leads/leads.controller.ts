import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { BuyerInterestSchema, LeadStatusUpdateSchema } from "@ibibanza/shared";
import { AdminApiKeyGuard } from "../../common/security/admin-api-key.guard";
import { ZodValidationPipe } from "../../common/validation/zod-validation.pipe";
import { LeadsService } from "./leads.service";

@Controller()
export class LeadsController {
  constructor(private readonly leads: LeadsService) {}

  @Post("plots/:plotId/interests")
  create(
    @Param("plotId") plotId: string,
    @Body(new ZodValidationPipe(BuyerInterestSchema.omit({ plotId: true })))
    body: Omit<Parameters<LeadsService["create"]>[0], "plotId">,
  ) {
    return this.leads.create({ ...body, plotId });
  }

  @UseGuards(AdminApiKeyGuard)
  @Get("admin/leads")
  listAdmin() {
    return this.leads.listAdmin();
  }

  @UseGuards(AdminApiKeyGuard)
  @Patch("admin/leads/:id/status")
  updateStatus(
    @Param("id") id: string,
    @Body(new ZodValidationPipe(LeadStatusUpdateSchema)) body: Parameters<LeadsService["updateStatus"]>[1],
  ) {
    return this.leads.updateStatus(id, body);
  }
}
