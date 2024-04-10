import { IsDate } from "class-validator";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

export abstract class BaseGlobalEntity {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string;

  @BeforeInsert()
  private addId() {
    this.id = crypto.randomUUID();
  }

  @Column({ name: "updated_at", nullable: true })
  @IsDate()
  updatedAt?: Date;

  @BeforeUpdate()
  private setUpdatedAt() {
    this.updatedAt = new Date();
  }

  @Column({ name: "created_at", nullable: true })
  @IsDate()
  createdAt: Date;

  @BeforeInsert()
  private getDateTime() {
    this.createdAt = new Date();
  }

  @Column({ type: "text", nullable: true, name: "comment" })
  comment?: string;

  @Column({ type: "boolean", default: false, name: "is_deleted" })
  isDeleted: boolean;

  @Column({ type: "date", nullable: true, name: "deleted_at" })
  @IsDate()
  deletedAt?: Date;
}
