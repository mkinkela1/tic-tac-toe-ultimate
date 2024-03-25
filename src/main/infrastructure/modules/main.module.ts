import { Module } from "@nestjs/common";
import { HealthController } from "src/main/application/controllers/health.controller";

@Module({
  imports: [],
  controllers: [HealthController],
  providers: [],
})
export class MainModule {}
