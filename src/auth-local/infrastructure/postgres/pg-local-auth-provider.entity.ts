import { LocalAuthProvider } from "src/auth-local/core/entities/local-auth-provider.entity";
import { Provider } from "src/auth/core/entities/auth-provider.entity";
import { PgAuthProvider } from "src/auth/infrastructure/postgres/pg-auth-provider.entity";
import { Column } from "typeorm/decorator/columns/Column";
import { ChildEntity } from "typeorm/decorator/entity/ChildEntity";

@ChildEntity()
export class PgLocalAuthProvider extends PgAuthProvider {
  @Column({ type: "varchar", name: "password" })
  password: string;

  toPersistence(userId: string, hashedPassword: string): PgLocalAuthProvider {
    this.userId = userId;
    this.provider = Provider.EMAIL_PASSWORD;
    this.password = hashedPassword;
    return this;
  }

  toEntity(): LocalAuthProvider {
    return {
      userId: this.userId,
      // @ts-expect-error - This is a bug in the code
      user: this.user,
      provider: Provider.EMAIL_PASSWORD,
      password: this.password,
    };
  }
}
