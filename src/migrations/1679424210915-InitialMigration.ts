import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1679424210915 implements MigrationInterface {
    name = 'InitialMigration1679424210915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(50) NOT NULL, "secondaryEmail" character varying(50), "password" character varying(120) NOT NULL, "profileImg" character varying(200), "fullName" character varying(50) NOT NULL, "phone" character varying(20) NOT NULL, "secondaryPhone" character varying(15), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_a3dc8508ef79ec6c52402a5ea4b" UNIQUE ("secondaryEmail"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
