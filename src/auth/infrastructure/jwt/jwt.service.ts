import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {
  IJwtService,
  IJwtServicePayload,
  IJwtTokenResponse,
} from "src/auth/core/ports/outbound/IJwtService";

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async checkToken(token: string, secret: string): Promise<IJwtTokenResponse> {
    return await this.jwtService.verifyAsync(token, {
      secret,
    });
  }

  async createToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn: string,
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret,
      expiresIn,
    });
  }
}
