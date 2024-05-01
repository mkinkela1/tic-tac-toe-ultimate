import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { PostgresModule } from "src/main/infrastructure/persistance/postgres/modules/postgres.module";
import { PgUserPersistence } from "src/user/infrastructure/persistance/pg-user.persistence";

@Module({
  imports: [
    TypeOrmModule.forFeature([PgUserPersistence]),
    PostgresModule,
    ConfigModule,
  ],
  controllers: [],
  exports: [],
  providers: [PgUserPersistence, PostgresModule],
})
export class UserModule {}
