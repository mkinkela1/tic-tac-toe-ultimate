import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HealthController } from "src/main/application/controllers/health.controller";

@Module({
  imports: [ConfigModule],
  controllers: [HealthController],
  providers: [],
})
export class MainModule {}
