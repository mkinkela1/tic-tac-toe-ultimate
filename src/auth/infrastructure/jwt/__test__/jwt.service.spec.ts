import { JwtService } from "@nestjs/jwt";
import { JwtTokenService } from "src/auth/infrastructure/jwt/jwt.service";

describe("JwtService", () => {
  let jwtService: JwtService;
  let jwtTokenService: JwtTokenService;

  beforeEach(() => {
    jwtService = new JwtService();
    jwtTokenService = new JwtTokenService(jwtService);
  });

  describe("checkToken", () => {
    it("should return the payload if the token is valid", async () => {
      const payload = { sub: "123" };
      const secret = "secret";
      const token = await jwtService.signAsync(payload, { secret });

      const result = await jwtTokenService.checkToken(token, secret);

      expect(result.sub).toEqual(payload.sub);
      expect(result.iat).toBeDefined();
    });

    it("should throw an error if the token is invalid", async () => {
      const token = "invalid-token";
      const secret = "secret";

      await expect(jwtTokenService.checkToken(token, secret)).rejects.toThrow();
    });
  });

  describe("createToken", () => {
    it("should return a token", async () => {
      const payload = { sub: "123" };
      const secret = "secret";
      const expiresIn = "1h";

      const result = await jwtTokenService.createToken(
        payload,
        secret,
        expiresIn,
      );

      expect(result).toBeDefined();
    });
  });
});
