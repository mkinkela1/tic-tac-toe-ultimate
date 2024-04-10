import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {
  IJwtAdapter,
  IJwtServicePayload,
} from "src/auth/core/ports/outbound/IJwtAdapter";

@Injectable()
export class JwtTokenService implements IJwtAdapter {
  constructor(private readonly jwtService: JwtService) {}

  async checkToken(token: string, secret: string): Promise<IJwtServicePayload> {
    return await this.jwtService.verifyAsync(token, { secret });
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
