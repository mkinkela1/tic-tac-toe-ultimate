import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { PostgresModule } from "src/main/infrastructure/persistance/postgres/modules/postgres.module";
import { PgUserPersistence } from "src/user/infrastructure/persistance/pg-user.persistence";

@Module({
  imports: [TypeOrmModule.forFeature([PgUserPersistence]), PostgresModule],
  controllers: [],
  exports: [],
  providers: [PgUserPersistence, PostgresModule],
})
export class UserModule {}
