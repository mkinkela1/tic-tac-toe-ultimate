export interface IJwtServicePayload {
  sub: string;
}

export interface IJwtTokenResponse extends IJwtServicePayload {
  iat: string;
}

export interface IJwtService {
  checkToken(token: string, secret: string): Promise<IJwtTokenResponse>;
  createToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn: string,
  ): Promise<string>;
}
