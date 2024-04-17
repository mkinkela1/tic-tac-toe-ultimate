import { VersioningType } from "@nestjs/common/enums/version-type.enum";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { AppModule } from "src/app.module";
import { REFRESH_TOKEN_COOKIE_NAME } from "src/auth-local/core/constants/constants";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.enableCors({ origin: "*" });
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle("Tic Tac Toe API")
    .setVersion("1.0")
    .addCookieAuth(
      "auth-cookie",
      {
        type: "http",
        in: "Header",
        scheme: "Bearer",
      },
      REFRESH_TOKEN_COOKIE_NAME,
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
