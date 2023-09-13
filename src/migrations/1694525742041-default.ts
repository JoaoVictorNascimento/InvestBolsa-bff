import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1694525742041 implements MigrationInterface {
    name = 'Default1694525742041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "wallets" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "balance" double precision NOT NULL, "patrimony" double precision NOT NULL, "invested" double precision NOT NULL, CONSTRAINT "PK_8402e5df5a30a229380e83e4f7e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "wallets"`);
    }

}
