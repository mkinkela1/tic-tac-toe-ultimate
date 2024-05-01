import { config } from "dotenv";
import { DATA_SOURCE } from "src/main/core/constants/constants";
import { configuration } from "src/main/infrastructure/configuration";
import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

config();

const typeorm: PostgresConnectionOptions = configuration().typeOrm;

const dataSource = new DataSource(typeorm);
dataSource.initialize();

export const postgresProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: () => dataSource,
  },
];

export { dataSource };
