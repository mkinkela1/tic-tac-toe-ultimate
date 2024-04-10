import { NotFoundException } from "@nestjs/common";
import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { USER_PERSISTANCE_ADAPTER } from "src/user/core/constants/constants";
import { User } from "src/user/core/entities/user.entity";
import { IUserRepository } from "src/user/core/ports/inbound/IUserRepository";
import { IUserPersistenceAdapter } from "src/user/core/ports/outbound/IUserPersistenceAdapter";

export class UserRepository implements IUserRepository {
  constructor(
    @Inject(USER_PERSISTANCE_ADAPTER)
    private readonly persistence: IUserPersistenceAdapter,
  ) {}

  async createUser({
    email,
    firstName,
    lastName,
  }: Partial<User>): Promise<User> {
    return this.persistence.create({ email, firstName, lastName }).toEntity();
  }

  async expectOneByEmail(email: string): Promise<User> {
    const user = await this.persistence.findOneBy({ email });

    if (!user) throw new NotFoundException();

    return user.toEntity();
  }
}
