import { config } from "dotenv";
import { DATA_SOURCE } from "src/main/core/constants/constants";
import { configService } from "src/main/infrastructure/persistance/postgres/service/config.service";
import { DataSource } from "typeorm";

config();

const dataSource = new DataSource(configService.getTypeOrmConfig());
dataSource.initialize();

export const postgresProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: () => dataSource,
  },
];

export { dataSource };
