import { config } from "dotenv";
import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";

config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue("PORT", true);
  }

  public isProduction() {
    const mode = this.getValue("MODE", false);
    return mode != "development";
  }

  public getTypeOrmConfig(): DataSourceOptions {
    return {
      type: "postgres",

      host: this.getValue("POSTGRES_HOST"),
      port: parseInt(this.getValue("POSTGRES_PORT")),
      username: this.getValue("POSTGRES_USER"),
      password: this.getValue("POSTGRES_PASSWORD"),
      database: this.getValue("POSTGRES_DB"),

      migrationsTableName: "migrations",

      entities: [__dirname + "/../../../../../**/*.entity{.ts,.js}"],
      migrations: [
        __dirname +
          "/../../../../../main/infrastructure/persistance/postgres/pg_migrations/**/*{.ts,.js}",
      ],

      ssl: this.isProduction(),
      logging: true,
      synchronize: false,
    };
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }
}

const configService = new ConfigService(process.env).ensureValues([
  "PORT",
  "POSTGRES_HOST",
  "POSTGRES_PORT",
  "POSTGRES_USER",
  "POSTGRES_PASSWORD",
  "POSTGRES_DB",
]);

export { configService };
