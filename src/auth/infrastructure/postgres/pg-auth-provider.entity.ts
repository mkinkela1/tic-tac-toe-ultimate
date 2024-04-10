import { Provider } from "src/auth/core/entities/auth-provider.entity";
import { BaseGlobalEntity } from "src/main/infrastructure/persistance/postgres/entities/base.global-entity";
import { PgUser } from "src/user/infrastructure/persistance/pg-user.entity";
import { Column } from "typeorm/decorator/columns/Column";
import { Entity } from "typeorm/decorator/entity/Entity";
import { TableInheritance } from "typeorm/decorator/entity/TableInheritance";
import { JoinColumn } from "typeorm/decorator/relations/JoinColumn";
import { ManyToOne } from "typeorm/decorator/relations/ManyToOne";
import { Unique } from "typeorm/decorator/Unique";

@Entity({ name: "auth_provider" })
@TableInheritance({ column: { type: "varchar", name: "type" } })
@Unique(["userId", "provider"])
export class PgAuthProvider extends BaseGlobalEntity {
  @Column()
  userId: string;

  @ManyToOne(() => PgUser, (user: PgUser) => user.authProviders, {
    eager: true,
  })
  @JoinColumn({ name: "userId" })
  user: PgUser;

  @Column({
    type: "enum",
    enum: Provider,
    nullable: false,
    name: "provider",
    default: Provider.EMAIL_PASSWORD,
  })
  provider: Provider;
}
