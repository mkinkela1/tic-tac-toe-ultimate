import { Provider } from "@nestjs/common/interfaces/modules/provider.interface";
import { DATA_SOURCE } from "src/main/core/constants/constants";
import {
  CUSTOM_USER_REPOSITORY,
  TYPEORM_USER_REPOSITORY,
  USER_PERSISTANCE_ADAPTER,
} from "src/user/core/constants/constants";
import { UserRepository } from "src/user/core/repositories/user.repository";
import { PgUser } from "src/user/infrastructure/persistance/pg-user.entity";
import { PgUserPersistence } from "src/user/infrastructure/persistance/pg-user.persistence";
import { DataSource } from "typeorm/data-source/DataSource";

export const pgUserProviders: Provider[] = [
  {
    provide: CUSTOM_USER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: USER_PERSISTANCE_ADAPTER,
    useClass: PgUserPersistence,
  },
  {
    provide: TYPEORM_USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PgUser),
    inject: [DATA_SOURCE],
  },
];
