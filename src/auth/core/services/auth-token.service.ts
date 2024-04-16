import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { JWT_TOKEN_SERVICE } from "src/auth/core/constants/constants";
import { IAuthTokenService } from "src/auth/core/ports/inound/IAuthTokenService";
import {
  IJwtService,
  IJwtServicePayload,
} from "src/auth/core/ports/outbound/IJwtService";
import { configService } from "src/main/infrastructure/persistance/postgres/service/config.service";

@Injectable()
export class AuthTokenService implements IAuthTokenService {
  constructor(
    @Inject(JWT_TOKEN_SERVICE)
    private readonly jwtService: IJwtService,
  ) {}

  async generateAuthTokens(
    payload: IJwtServicePayload,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return {
      accessToken: await this.jwtService.createToken(
        payload,
        configService.getJwtAccessTokenSecret(),
        configService.getJwtAccessTokenExpiresIn(),
      ),
      refreshToken: await this.jwtService.createToken(
        payload,
        configService.getJwtRefreshTokenSecret(),
        configService.getJwtRefreshTokenExpiresIn(),
      ),
    };
  }
}
