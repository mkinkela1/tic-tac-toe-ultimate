import { Module } from "@nestjs/common/decorators/modules";
import { JwtModule } from "@nestjs/jwt";
import { JWT_TOKEN_SERVICE } from "src/auth/core/constants/constants";
import { JwtTokenService } from "src/auth/infrastructure/jwt/jwt.service";

@Module({
  imports: [JwtModule],
  providers: [{ provide: JWT_TOKEN_SERVICE, useClass: JwtTokenService }],
  exports: [{ provide: JWT_TOKEN_SERVICE, useClass: JwtTokenService }],
})
export class JwtTokenModule {}
