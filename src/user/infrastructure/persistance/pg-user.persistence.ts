import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { TYPEORM_USER_REPOSITORY } from "src/user/core/constants/constants";
import { User } from "src/user/core/entities/user.entity";
import { IUserPersistenceAdapter } from "src/user/core/ports/outbound/IUserPersistenceAdapter";
import { PgUser } from "src/user/infrastructure/persistance/pg-user.entity";
import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import { Repository } from "typeorm/repository/Repository";

export class PgUserPersistence implements IUserPersistenceAdapter {
  constructor(
    @Inject(TYPEORM_USER_REPOSITORY)
    private readonly userRepository: Repository<PgUser>,
  ) {}

  create(user: User): PgUser {
    return this.userRepository.create({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }

  async findOneBy(
    condition: FindOptionsWhere<PgUser> | FindOptionsWhere<PgUser>[],
  ): Promise<PgUser> {
    return this.userRepository.findOneBy(condition);
  }

  save(user: PgUser): Promise<PgUser> {
    return this.userRepository.save(user);
  }
}
