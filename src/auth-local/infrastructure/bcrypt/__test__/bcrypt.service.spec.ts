import { Test } from "@nestjs/testing/test";
import { TestingModule } from "@nestjs/testing/testing-module";
import { BcryptService } from "src/auth-local/infrastructure/bcrypt/bcrypt.service";

describe("BcryptService", () => {
  let service: BcryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptService],
    }).compile();

    service = module.get<BcryptService>(BcryptService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return a salt", async () => {
    const salt = await service.salt();

    expect(salt).toBeDefined();
  });

  it("should return a hash", async () => {
    const salt = await service.salt();
    const passwordHashed = await service.hash("password", salt);

    expect(passwordHashed).toBeDefined();
  });

  it("should hash a password correctly", async () => {
    const salt = await service.salt();
    const passwordHashed = await service.hash("password", salt);

    expect(await service.compare("password", passwordHashed)).toBe(true);
  });

  it("should return false when comparing a wrong password", async () => {
    const salt = await service.salt();
    const passwordHashed = await service.hash("password", salt);

    expect(await service.compare("wrong-password", passwordHashed)).toBe(false);
  });
});
