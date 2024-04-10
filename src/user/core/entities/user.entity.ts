import { AuthProvider } from "src/auth/core/entities/auth-provider.entity";
import { BaseGlobalEntity } from "src/main/infrastructure/persistance/postgres/entities/base.global-entity";

export class User extends BaseGlobalEntity {
  public email: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public avatar: string;
  public role: string;
  public authProviders: AuthProvider[];

  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }
}
