import { Body, Controller, Delete, Post } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notifications: NotificationsService) {}

  @Post("subscribe")
  subscribe(@Body() body: { endpoint: string; [key: string]: unknown }) {
    return this.notifications.subscribe(body);
  }

  @Delete("subscribe")
  unsubscribe(@Body("endpoint") endpoint: string) {
    return this.notifications.unsubscribe(endpoint);
  }
}
