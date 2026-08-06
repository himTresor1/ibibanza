import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("Ibibanza API")
    .setDescription("APIs for plots, seller submissions, buyer leads, and manual WhatsApp alerts.")
    .setVersion("0.1.0")
    .addApiKey({ type: "apiKey", name: "x-admin-api-key", in: "header" }, "admin-key")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);
}
