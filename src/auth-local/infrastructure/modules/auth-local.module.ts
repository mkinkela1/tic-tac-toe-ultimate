import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LocalAuthController } from "src/auth-local/application/controllers/local-auth.controller";
import { RegistrationService } from "src/auth-local/core/services/registration.service";
import { BcryptModule } from "src/auth-local/infrastructure/bcrypt/bcrypt.module";
import { JwtTokenModule } from "src/auth/infrastructure/jwt/jwt.module";
import { PostgresModule } from "src/main/infrastructure/persistance/postgres/modules/postgres.module";
import { PgUserPersistence } from "src/user/infrastructure/persistance/pg-user.persistence";

@Module({
  imports: [
    TypeOrmModule.forFeature([PgUserPersistence]),
    PostgresModule,
    BcryptModule,
    JwtTokenModule,
  ],
  controllers: [LocalAuthController],
  exports: [],
  providers: [
    PgUserPersistence,
    PostgresModule,
    BcryptModule,
    JwtModule,
    RegistrationService,
  ],
})
export class AuthLocalModule {}
