import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { TYPEORM_LOCAL_AUTH_REPOSITORY } from "src/auth-local/core/constants/constants";
import { ILocalAuthProviderPersistanceAdapter } from "src/auth-local/core/ports/outbound/ILocalAuthProviderPersistanceAdapter";
import { PgLocalAuthProvider } from "src/auth-local/infrastructure/postgres/pg-local-auth-provider.entity";
import { dataSource } from "src/main/infrastructure/persistance/postgres/providers/postgres.providers";
import { User } from "src/user/core/entities/user.entity";
import { PgUser } from "src/user/infrastructure/persistance/pg-user.entity";
import { EntityManager } from "typeorm/entity-manager/EntityManager";
import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";
import { Repository } from "typeorm/repository/Repository";

@Injectable()
export class PgLocalAuthProviderPersistence
  implements ILocalAuthProviderPersistanceAdapter
{
  constructor(
    @Inject(TYPEORM_LOCAL_AUTH_REPOSITORY)
    private readonly localAuthRepository: Repository<PgLocalAuthProvider>,
  ) {}
  async findOneBy(
    condition: Partial<
      | FindOptionsWhere<PgLocalAuthProvider>
      | FindOptionsWhere<PgLocalAuthProvider>[]
    >,
  ): Promise<PgLocalAuthProvider> {
    return await this.localAuthRepository.findOne({
      where: { ...condition },
    });
  }

  async save(
    user: Partial<User>,
    hashedPassword: string,
  ): Promise<PgLocalAuthProvider> {
    return await dataSource.transaction(
      async (entityManager: EntityManager) =>
        await this.insertUserWithLocalAuth(entityManager, user, hashedPassword),
    );
  }

  private async insertUserWithLocalAuth(
    entityManager: EntityManager,
    user: Partial<User>,
    hashedPassword: string,
  ): Promise<PgLocalAuthProvider> {
    let pgUser = await entityManager.findOne(PgUser, {
      where: { email: user.email },
    });

    if (!pgUser) {
      pgUser = await entityManager.save(new PgUser().toPersistence(user));
    }

    const pgLocalAuthProvider = new PgLocalAuthProvider().toPersistence(
      pgUser.id,
      hashedPassword,
    );
    const registeredUser = await entityManager.save(pgLocalAuthProvider);

    return registeredUser;
  }
}
