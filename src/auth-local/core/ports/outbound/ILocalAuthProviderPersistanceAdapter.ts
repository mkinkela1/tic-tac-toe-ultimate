import { PgLocalAuthProvider } from "src/auth-local/infrastructure/postgres/pg-local-auth-provider.entity";
import { User } from "src/user/core/entities/user.entity";
import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";

export interface ILocalAuthProviderPersistanceAdapter {
  findOneBy(
    condition: Partial<
      | FindOptionsWhere<PgLocalAuthProvider>
      | FindOptionsWhere<PgLocalAuthProvider>[]
    >,
  ): Promise<PgLocalAuthProvider>;
  save(
    user: Partial<User>,
    hashedPassword: string,
  ): Promise<PgLocalAuthProvider>;
}
