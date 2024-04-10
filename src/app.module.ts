import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthLocalModule } from "src/auth-local/infrastructure/modules/auth-local.module";
import { AuthModule } from "src/auth/infrastructure/modules/auth.module";
import { MainModule } from "src/main/infrastructure/modules/main.module";
import { PostgresModule } from "src/main/infrastructure/persistance/postgres/modules/postgres.module";
import { configService } from "src/main/infrastructure/persistance/postgres/service/config.service";
import { UserModule } from "src/user/infrastructure/modules/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    PostgresModule,
    MainModule,
    UserModule,
    AuthModule,
    AuthLocalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
