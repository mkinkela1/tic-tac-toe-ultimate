import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { LOCAL_AUTH_PERSISTANCE_ADAPTER } from "src/auth-local/core/constants/constants";
import { LocalAuthProvider } from "src/auth-local/core/entities/local-auth-provider.entity";
import { ILocalAuthProiderRepository } from "src/auth-local/core/ports/inbound/ILocalAuthProviderRepository";
import { ILocalAuthProviderPersistanceAdapter } from "src/auth-local/core/ports/outbound/ILocalAuthProviderPersistanceAdapter";
import { Provider } from "src/auth/core/entities/auth-provider.entity";
import { User } from "src/user/core/entities/user.entity";

export class LocalAuthProviderRepository
  implements ILocalAuthProiderRepository
{
  constructor(
    @Inject(LOCAL_AUTH_PERSISTANCE_ADAPTER)
    private readonly persistence: ILocalAuthProviderPersistanceAdapter,
  ) {}

  async expectOneByEmail(email: string): Promise<LocalAuthProvider> {
    const localAuthProvider = await this.persistence.findOneBy({
      user: { email },
      provider: Provider.EMAIL_PASSWORD,
    });

    if (!localAuthProvider) {
      throw new NotFoundException("LocalAuthProvider not found");
    }

    return localAuthProvider.toEntity();
  }

  async registerUser(
    user: Partial<User>,
    hashedPassword: string,
  ): Promise<LocalAuthProvider> {
    await this.persistence.save(user, hashedPassword);

    const registeredUser = await this.expectOneByEmail(user.email);

    return registeredUser;
  }
}
