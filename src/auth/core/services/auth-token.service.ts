import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { ConfigService } from "@nestjs/config";
import { JWT_TOKEN_SERVICE } from "src/auth/core/constants/constants";
import { IAuthTokenService } from "src/auth/core/ports/inound/IAuthTokenService";
import {
  IJwtService,
  IJwtServicePayload,
} from "src/auth/core/ports/outbound/IJwtService";

@Injectable()
export class AuthTokenService implements IAuthTokenService {
  constructor(
    @Inject(JWT_TOKEN_SERVICE)
    private readonly jwtService: IJwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateAuthTokens(
    payload: IJwtServicePayload,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return {
      accessToken: await this.jwtService.createToken(
        payload,
        this.configService.get<string>("jwt.accessTokenSecret"),
        this.configService.get<string>("jwt.accessTokenExpiresIn"),
      ),
      refreshToken: await this.jwtService.createToken(
        payload,
        this.configService.get<string>("jwt.refreshTokenSecret"),
        this.configService.get<string>("jwt.refreshTokenExpiresIn"),
      ),
    };
  }
}
