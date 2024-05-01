import { AuthProvider } from "src/auth/core/entities/auth-provider.entity";
import { PgAuthProvider } from "src/auth/infrastructure/postgres/pg-auth-provider.entity";
import { BaseGlobalEntity } from "src/main/infrastructure/persistance/postgres/entities/base.global-entity";
import { User } from "src/user/core/entities/user.entity";
import { Column } from "typeorm/decorator/columns/Column";
import { Entity } from "typeorm/decorator/entity/Entity";
import { Index } from "typeorm/decorator/Index";
import { OneToMany } from "typeorm/decorator/relations/OneToMany";

@Entity({ name: "user" })
export class PgUser extends BaseGlobalEntity {
  @Column({
    type: "varchar",
    nullable: false,
    name: "email",
  })
  @Index({ unique: true })
  email: string;

  @Column({ type: "text", nullable: true, name: "first_name" })
  firstName: string;

  @Column({ type: "text", nullable: true, name: "last_name" })
  lastName: string;

  @Column({ type: "text", nullable: true, name: "avatar_url" })
  avatarUrl: string;

  @OneToMany(
    () => PgAuthProvider,
    (authProvider: PgAuthProvider) => authProvider.user,
  )
  authProviders: AuthProvider[];

  toPersistence(user: Partial<User>): this {
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;

    return this;
  }

  toEntity(): User {
    return new User({
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      authProviders: this.authProviders,
    });
  }
}
