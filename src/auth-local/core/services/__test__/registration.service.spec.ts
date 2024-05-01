import { ILocalAuthProiderRepository } from "src/auth-local/core/ports/inbound/ILocalAuthProviderRepository";
import { IBcryptService } from "src/auth-local/core/ports/outbound/IBcryptService";
import { RegistrationService } from "src/auth-local/core/services/registration.service";
import { IUserRepository } from "src/user/core/ports/inbound/IUserRepository";

describe("RegistrationService", () => {
  let registrationService: RegistrationService;
  let bcryptService: IBcryptService;
  let authProviderRepository: ILocalAuthProiderRepository;
  let userRepository: IUserRepository;

  beforeEach(() => {
    bcryptService = {
      salt: jest.fn(),
      hash: jest.fn(),
    } as unknown as IBcryptService;
    authProviderRepository = {
      registerUser: jest.fn(),
    } as unknown as ILocalAuthProiderRepository;
    userRepository = {
      createUser: jest.fn(),
    } as unknown as IUserRepository;

    registrationService = new RegistrationService(
      bcryptService,
      authProviderRepository,
      userRepository,
    );
  });

  describe("registerUser", () => {
    it("should register a user", async () => {
      const request = {
        email: "test@test.com",
        firstName: "Test",
        lastName: "Test",
        password: "Test123!",
      };

      (bcryptService.salt as jest.Mock).mockResolvedValue("salt");
      (bcryptService.hash as jest.Mock).mockResolvedValue("hashedPassword");
      (userRepository.createUser as jest.Mock).mockResolvedValue({
        id: 1,
        email: request.email,
        firstName: request.firstName,
        lastName: request.lastName,
      });
      (authProviderRepository.registerUser as jest.Mock).mockResolvedValue({
        id: 1,
        email: request.email,
        firstName: request.firstName,
        lastName: request.lastName,
      });

      const result = await registrationService.registerUser(request);

      expect(result).toEqual({
        id: 1,
        email: request.email,
        firstName: request.firstName,
        lastName: request.lastName,
      });
    });

    it("should throw ConflictException if email already exists", async () => {
      const request = {
        email: "repeat@test.com",
        firstName: "Test",
        lastName: "Test",
        password: "Test123!",
      };

      (bcryptService.salt as jest.Mock).mockResolvedValue("salt");
      (bcryptService.hash as jest.Mock).mockResolvedValue("hashedPassword");
      (userRepository.createUser as jest.Mock).mockResolvedValue({
        id: 1,
        email: request.email,
        firstName: request.firstName,
        lastName: request.lastName,
      });
      (authProviderRepository.registerUser as jest.Mock).mockRejectedValue({
        code: "23505",
      });

      await expect(
        registrationService.registerUser(request),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Conflict"`);
    });
  });
});
