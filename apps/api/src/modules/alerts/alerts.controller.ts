import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AdminApiKeyGuard } from "../../common/security/admin-api-key.guard";
import { AlertsService } from "./alerts.service";

@UseGuards(AdminApiKeyGuard)
@Controller("admin/alerts")
export class AlertsController {
  constructor(private readonly alerts: AlertsService) {}

  @Get()
  list() {
    return this.alerts.list();
  }

  @Post("draft-for-plot/:plotId")
  draftForPlot(@Param("plotId") plotId: string, @Body() body: { remainingCount?: number; visitWindow?: string }) {
    return this.alerts.draftForPlot(plotId, body);
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.alerts.get(id);
  }

  @Post(":id/mark-sent")
  markSent(@Param("id") id: string) {
    return this.alerts.markSent(id);
  }
}
