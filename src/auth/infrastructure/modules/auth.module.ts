import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtTokenModule } from "src/auth/infrastructure/jwt/jwt.module";
import { PostgresModule } from "src/main/infrastructure/persistance/postgres/modules/postgres.module";
import { PgUserPersistence } from "src/user/infrastructure/persistance/pg-user.persistence";

@Module({
  imports: [
    TypeOrmModule.forFeature([PgUserPersistence]),
    PostgresModule,
    JwtTokenModule,
    JwtModule,
  ],
  exports: [],
  providers: [PostgresModule, PgUserPersistence],
})
export class AuthModule {}
