import { Test } from "@nestjs/testing/test";
import { TestingModule } from "@nestjs/testing/testing-module";
import { JWT_TOKEN_SERVICE } from "src/auth/core/constants/constants";
import {
  IJwtService,
  IJwtServicePayload,
} from "src/auth/core/ports/outbound/IJwtService";
import { AuthTokenService } from "src/auth/core/services/auth-token.service";
import { ConfigService } from "src/main/infrastructure/persistance/postgres/service/config.service";

describe("AuthTokenService", () => {
  let authTokenService: AuthTokenService;
  let jwtService: IJwtService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthTokenService,
        {
          provide: JWT_TOKEN_SERVICE,
          useValue: {
            createToken: jest.fn(),
          },
        },
      ],
    }).compile();

    authTokenService = module.get<AuthTokenService>(AuthTokenService);
    jwtService = module.get<IJwtService>(JWT_TOKEN_SERVICE);
    configService = new ConfigService({
      JWT_ACCESS_TOKEN_SECRET: "secret",
      JWT_ACCESS_TOKEN_EXPIRES_IN: "1h",
      JWT_REFRESH_TOKEN_EXPIRES_IN: "1d",
      JWT_REFRESH_TOKEN_SECRET: "secret",
    });
  });

  it("should be defined", () => {
    expect(authTokenService).toBeDefined();
  });

  describe("generateAuthTokens", () => {
    it("should return access and refresh tokens", async () => {
      const payload: IJwtServicePayload = {
        sub: "1",
      };

      const accessToken = "access-token";
      const refreshToken = "refresh-token";

      (jwtService.createToken as jest.Mock).mockReturnValueOnce(accessToken);
      (jwtService.createToken as jest.Mock).mockReturnValueOnce(refreshToken);

      const result = await authTokenService.generateAuthTokens(payload);

      expect(result).toEqual({
        accessToken,
        refreshToken,
      });
      expect(jwtService.createToken).toHaveBeenCalledTimes(2);
    });
  });
});
