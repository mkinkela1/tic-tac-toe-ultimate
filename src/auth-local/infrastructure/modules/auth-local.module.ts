import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LocalAuthController } from "src/auth-local/application/controllers/local-auth.controller";
import { LoginService } from "src/auth-local/core/services/login.service";
import { RegistrationService } from "src/auth-local/core/services/registration.service";
import { BcryptModule } from "src/auth-local/infrastructure/bcrypt/bcrypt.module";
import { LocalStrategy } from "src/auth-local/infrastructure/passport/local.strategy";
import { AuthTokenService } from "src/auth/core/services/auth-token.service";
import { JwtTokenModule } from "src/auth/infrastructure/jwt/jwt.module";
import { PostgresModule } from "src/main/infrastructure/persistance/postgres/modules/postgres.module";
import { PgUserPersistence } from "src/user/infrastructure/persistance/pg-user.persistence";

@Module({
  imports: [
    TypeOrmModule.forFeature([PgUserPersistence]),
    PostgresModule,
    BcryptModule,
    JwtTokenModule,
    ConfigModule,
  ],
  controllers: [LocalAuthController],
  exports: [],
  providers: [
    PgUserPersistence,
    PostgresModule,
    BcryptModule,
    JwtModule,
    RegistrationService,
    LoginService,
    AuthTokenService,
    LocalStrategy,
  ],
})
export class AuthLocalModule {}
