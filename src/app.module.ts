import { Module } from "@nestjs/common";
import { MainModule } from "src/main/infrastructure/modules/main.module";

@Module({
  imports: [MainModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
