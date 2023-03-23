import { MigrationInterface, QueryRunner } from "typeorm";

export class emailConstraint1679527771094 implements MigrationInterface {
    name = 'emailConstraint1679527771094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "UQ_752866c5247ddd34fd05559537d"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "UQ_12f357a02dc1660307afb24a708"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "UQ_12f357a02dc1660307afb24a708" UNIQUE ("secondaryEmail")`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email")`);
    }

}
