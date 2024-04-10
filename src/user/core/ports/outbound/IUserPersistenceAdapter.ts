import { User } from "src/user/core/entities/user.entity";
import { PgUser } from "src/user/infrastructure/persistance/pg-user.entity";
import { FindOptionsWhere } from "typeorm";

export interface IUserPersistenceAdapter {
  create(user: Partial<User>): PgUser;
  findOneBy(
    condition: FindOptionsWhere<PgUser> | FindOptionsWhere<PgUser>[],
  ): Promise<PgUser>;
  save(user: PgUser): Promise<PgUser>;
}
