import { IJwtServicePayload } from "src/auth/core/ports/outbound/IJwtService";

export interface IAuthTokenService {
  generateAuthTokens(
    payload: IJwtServicePayload,
  ): Promise<{ accessToken: string; refreshToken: string }>;
}
