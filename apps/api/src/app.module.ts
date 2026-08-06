import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { HealthController } from "./health.controller";
import { PrismaModule } from "./prisma/prisma.module";
import { AlertsModule } from "./modules/alerts/alerts.module";
import { BuyersModule } from "./modules/buyers/buyers.module";
import { LeadsModule } from "./modules/leads/leads.module";
import { NotificationsModule } from "./modules/notifications/notifications.module";
import { PlotsModule } from "./modules/plots/plots.module";
import { SellersModule } from "./modules/sellers/sellers.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 30 }]),
    PrismaModule,
    PlotsModule,
    SellersModule,
    BuyersModule,
    LeadsModule,
    AlertsModule,
    NotificationsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
