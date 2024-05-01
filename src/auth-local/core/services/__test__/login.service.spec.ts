import { ILocalAuthProiderRepository } from "src/auth-local/core/ports/inbound/ILocalAuthProviderRepository";
import { IBcryptService } from "src/auth-local/core/ports/outbound/IBcryptService";
import { LoginService } from "src/auth-local/core/services/login.service";
import { AuthTokenService } from "src/auth/core/services/auth-token.service";
import { User } from "src/user/core/entities/user.entity";

describe("LoginService", () => {
  let loginService: LoginService;
  let bcryptService: IBcryptService;
  let authTokenService: AuthTokenService;
  let localAuthProviderRepository: ILocalAuthProiderRepository;

  beforeEach(() => {
    bcryptService = {
      compare: jest.fn(),
    } as unknown as IBcryptService;
    authTokenService = {
      generateAuthTokens: jest.fn(),
    } as unknown as AuthTokenService;
    localAuthProviderRepository = {
      expectOneByEmail: jest.fn(),
    } as unknown as ILocalAuthProiderRepository;

    loginService = new LoginService(
      bcryptService,
      authTokenService,
      localAuthProviderRepository,
    );
  });

  describe("login", () => {
    it("should return auth tokens and user", async () => {
      const user = { id: "", email: "test@test.com" } as User;
      const accessToken = "access-token";
      const refreshToken = "refresh-token";

      (authTokenService.generateAuthTokens as jest.Mock).mockResolvedValue({
        accessToken,
        refreshToken,
      });

      const result = await loginService.login(user);

      expect(result).toEqual({ user, accessToken, refreshToken });
    });
  });

  describe("validateUserForLocalStrategy", () => {
    it("should return user if password is valid", async () => {
      const user = { id: "", email: "", password: "" } as User;

      (
        localAuthProviderRepository.expectOneByEmail as jest.Mock
      ).mockResolvedValue({ user, password: "" });

      (bcryptService.compare as jest.Mock).mockResolvedValue(true);

      const result = await loginService.validateUserForLocalStrategy(
        user.email,
        user.password,
      );

      expect(result).toEqual(user);
    });

    it("should throw NotFoundException if password is invalid", async () => {
      const user = { id: "", email: "", password: "" } as User;

      (
        localAuthProviderRepository.expectOneByEmail as jest.Mock
      ).mockResolvedValue({ user, password: "" });

      (bcryptService.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        loginService.validateUserForLocalStrategy(user.email, user.password),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Not Found"`);
    });
  });
});
