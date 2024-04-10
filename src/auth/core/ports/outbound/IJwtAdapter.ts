export interface IJwtServicePayload {
  id: string;
  email: string;
}

export interface IJwtAdapter {
  checkToken(token: string, secret: string): Promise<IJwtServicePayload>;
  createToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn: string,
  ): Promise<string>;
}
