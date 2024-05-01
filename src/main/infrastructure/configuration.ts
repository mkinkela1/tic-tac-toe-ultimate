export const configuration = () => ({
  port: parseInt(process.env.PORT) || 3000,
  mode: process.env.NODE_ENV || "development",
  typeOrm: {
    type: "postgres" as const,

    host: process.env.POSTGRES_HOST || "localhost",
    port: parseInt(process.env.POSTGRES_PORT || "5432"),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,

    migrationsTableName: "migrations",

    entities: [__dirname + "/../../**/*.entity{.ts,.js}"],
    migrations: [
      __dirname + "/persistance/postgres/pg_migrations/**/*{.ts,.js}",
    ],

    ssl: process.env.NODE_ENV === "production",
    logging: true,
    synchronize: false,
  },
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  },
});
