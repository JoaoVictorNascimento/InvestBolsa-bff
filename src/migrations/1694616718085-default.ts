import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1694616718085 implements MigrationInterface {
    name = 'Default1694616718085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallets" ALTER COLUMN "balance" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wallets" ALTER COLUMN "patrimony" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wallets" ALTER COLUMN "invested" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallets" ALTER COLUMN "invested" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wallets" ALTER COLUMN "patrimony" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wallets" ALTER COLUMN "balance" SET NOT NULL`);
    }

}
