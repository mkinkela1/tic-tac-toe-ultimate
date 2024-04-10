import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsersTable1712062390538 implements MigrationInterface {
    name = 'AddUsersTable1712062390538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."auth_provider_provider_enum" AS ENUM('email_password', 'google')`);
        await queryRunner.query(`CREATE TABLE "auth_provider" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "updated_at" TIMESTAMP, "created_at" TIMESTAMP, "comment" text, "is_deleted" boolean NOT NULL DEFAULT false, "deleted_at" date, "userId" uuid NOT NULL, "provider" "public"."auth_provider_provider_enum" NOT NULL DEFAULT 'email_password', "password" character varying, "type" character varying NOT NULL, CONSTRAINT "UQ_e238f02b7538f33d6774bc18243" UNIQUE ("userId", "provider"), CONSTRAINT "PK_0a6e6348fe38ba49160eb903c95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fcacab2508e4f4ab3bf230fca8" ON "auth_provider" ("type") `);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "updated_at" TIMESTAMP, "created_at" TIMESTAMP, "comment" text, "is_deleted" boolean NOT NULL DEFAULT false, "deleted_at" date, "email" character varying NOT NULL, "first_name" text, "last_name" text, "avatar_url" text, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`ALTER TABLE "auth_provider" ADD CONSTRAINT "FK_d9255ec09fddab3e47e84fd2a07" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth_provider" DROP CONSTRAINT "FK_d9255ec09fddab3e47e84fd2a07"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fcacab2508e4f4ab3bf230fca8"`);
        await queryRunner.query(`DROP TABLE "auth_provider"`);
        await queryRunner.query(`DROP TYPE "public"."auth_provider_provider_enum"`);
    }

}
