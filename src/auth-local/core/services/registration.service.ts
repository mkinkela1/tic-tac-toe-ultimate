import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { ConflictException } from "@nestjs/common/exceptions/conflict.exception";
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception";
import "reflect-metadata";
import {
  BCRYPT_SERVICE,
  CUSTOM_LOCAL_AUTH_REPOSITORY,
} from "src/auth-local/core/constants/constants";
import { LocalAuthProvider } from "src/auth-local/core/entities/local-auth-provider.entity";
import { ILocalAuthProiderRepository } from "src/auth-local/core/ports/inbound/ILocalAuthProviderRepository";
import { IRegistrationService } from "src/auth-local/core/ports/inbound/IRegistrationService";
import { IBcryptService } from "src/auth-local/core/ports/outbound/IBcryptService";
import { CUSTOM_USER_REPOSITORY } from "src/user/core/constants/constants";
import { IUserRepository } from "src/user/core/ports/inbound/IUserRepository";

@Injectable()
export class RegistrationService implements IRegistrationService {
  constructor(
    @Inject(BCRYPT_SERVICE)
    private readonly bcryptService: IBcryptService,
    @Inject(CUSTOM_LOCAL_AUTH_REPOSITORY)
    private readonly authProviderRepository: ILocalAuthProiderRepository,
    @Inject(CUSTOM_USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async registerUser({
    email,
    firstName,
    lastName,
    password,
  }): Promise<LocalAuthProvider> {
    const salt = await this.bcryptService.salt();
    const hashedPassword = await this.bcryptService.hash(password, salt);

    const user = await this.userRepository.createUser({
      email,
      firstName,
      lastName,
    });

    try {
      const savedUser = await this.authProviderRepository.registerUser(
        user,
        hashedPassword,
      );

      return savedUser;
    } catch (e) {
      console.log(e);
      if (e.code === "23505") throw new ConflictException();
      throw new InternalServerErrorException();
    }
  }
}
