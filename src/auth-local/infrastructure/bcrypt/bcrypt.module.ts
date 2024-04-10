import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { BCRYPT_SERVICE } from "src/auth-local/core/constants/constants";
import { BcryptService } from "src/auth-local/infrastructure/bcrypt/bcrypt.service";

@Module({
  providers: [{ provide: BCRYPT_SERVICE, useClass: BcryptService }],
  exports: [{ provide: BCRYPT_SERVICE, useClass: BcryptService }],
})
export class BcryptModule {}
