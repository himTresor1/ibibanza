import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpErrorFilter } from "./common/errors/http-error.filter";
import { setupSwagger } from "./common/openapi/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: process.env.WEB_ORIGIN ?? "http://localhost:3004" });
  app.useGlobalFilters(new HttpErrorFilter());
  app.setGlobalPrefix("api/v1");
  setupSwagger(app);
  await app.listen(process.env.PORT ? Number(process.env.PORT) : 4000);
}

void bootstrap();
