import { Module } from "@nestjs/common";
import { pgLocalAuthProviderProviders } from "src/auth-local/infrastructure/postgres/pg-local-auth-provider.providers";
import { postgresProviders } from "src/main/infrastructure/persistance/postgres/providers/postgres.providers";
import { pgUserProviders } from "src/user/infrastructure/persistance/pg-user.providers";

@Module({
  providers: [
    ...postgresProviders,
    ...pgUserProviders,
    ...pgLocalAuthProviderProviders,
  ],
  exports: [
    ...postgresProviders,
    ...pgUserProviders,
    ...pgLocalAuthProviderProviders,
  ],
})
export class PostgresModule {}
