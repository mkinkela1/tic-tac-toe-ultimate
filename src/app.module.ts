import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthLocalModule } from "src/auth-local/infrastructure/modules/auth-local.module";
import { AuthModule } from "src/auth/infrastructure/modules/auth.module";
import { configuration } from "src/main/infrastructure/configuration";
import { MainModule } from "src/main/infrastructure/modules/main.module";
import { PostgresModule } from "src/main/infrastructure/persistance/postgres/modules/postgres.module";
import { UserModule } from "src/user/infrastructure/modules/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(configuration().typeOrm),
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
