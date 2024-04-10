import { Provider } from "@nestjs/common/interfaces/modules/provider.interface";
import {
  CUSTOM_LOCAL_AUTH_REPOSITORY,
  LOCAL_AUTH_PERSISTANCE_ADAPTER,
  TYPEORM_LOCAL_AUTH_REPOSITORY,
} from "src/auth-local/core/constants/constants";
import { LocalAuthProviderRepository } from "src/auth-local/core/repositories/local-auth-provider.repository";
import { PgLocalAuthProvider } from "src/auth-local/infrastructure/postgres/pg-local-auth-provider.entity";
import { PgLocalAuthProviderPersistence } from "src/auth-local/infrastructure/postgres/pg-local-auth-provider.repository";
import { DATA_SOURCE } from "src/main/core/constants/constants";
import { DataSource } from "typeorm/data-source/DataSource";

export const pgLocalAuthProviderProviders: Provider[] = [
  {
    provide: LOCAL_AUTH_PERSISTANCE_ADAPTER,
    useClass: PgLocalAuthProviderPersistence,
  },
  {
    provide: CUSTOM_LOCAL_AUTH_REPOSITORY,
    useClass: LocalAuthProviderRepository,
  },
  {
    provide: TYPEORM_LOCAL_AUTH_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PgLocalAuthProvider),
    inject: [DATA_SOURCE],
  },
];
