import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import {
  BCRYPT_SERVICE,
  CUSTOM_LOCAL_AUTH_REPOSITORY,
} from "src/auth-local/core/constants/constants";
import { ILocalAuthProiderRepository } from "src/auth-local/core/ports/inbound/ILocalAuthProviderRepository";
import { ILoginService } from "src/auth-local/core/ports/inbound/ILoginService";
import { IBcryptService } from "src/auth-local/core/ports/outbound/IBcryptService";
import { AuthTokenService } from "src/auth/core/services/auth-token.service";
import { User } from "src/user/core/entities/user.entity";

export class LoginService implements ILoginService {
  constructor(
    @Inject(BCRYPT_SERVICE)
    private readonly bcryptService: IBcryptService,
    private readonly authTokenService: AuthTokenService,
    @Inject(CUSTOM_LOCAL_AUTH_REPOSITORY)
    private readonly localAuthProviderRepository: ILocalAuthProiderRepository,
  ) {}

  async login(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string; user: User }> {
    const payload = { id: user.id, email: user.email };

    const { accessToken, refreshToken } =
      await this.authTokenService.generateAuthTokens(payload);

    return { user, accessToken, refreshToken };
  }

  async validateUserForLocalStrategy(
    email: string,
    password: string,
  ): Promise<User> {
    const localAuth =
      await this.localAuthProviderRepository.expectOneByEmail(email);

    const isPasswordValid = await this.bcryptService.compare(
      password,
      localAuth.password,
    );

    if (!isPasswordValid) throw new NotFoundException();

    return localAuth.user;
  }
}
