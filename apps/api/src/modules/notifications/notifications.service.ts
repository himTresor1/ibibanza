import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async subscribe(payload: { endpoint: string; [key: string]: unknown }) {
    const jsonPayload = payload as Prisma.InputJsonObject;
    return this.prisma.pushSubscription.upsert({
      where: { endpoint: payload.endpoint },
      update: { payload: jsonPayload },
      create: { endpoint: payload.endpoint, payload: jsonPayload },
    });
  }

  async unsubscribe(endpoint: string) {
    return this.prisma.pushSubscription.delete({ where: { endpoint } });
  }
}
