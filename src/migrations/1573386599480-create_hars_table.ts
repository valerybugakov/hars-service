import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateHarsTable1573386599480 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            "CREATE TYPE \"hars_method_enum\" AS ENUM('GET', 'POST', 'PUT', 'DELETE')",
            undefined,
        );
        await queryRunner.query(
            'CREATE TABLE "hars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "entry" jsonb NOT NULL, "method" "hars_method_enum" NOT NULL DEFAULT \'GET\', "url" character varying, CONSTRAINT "PK_f48faefcfa91929e611d466b3c1" PRIMARY KEY ("id"))',
            undefined,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE "hars"', undefined);
        await queryRunner.query('DROP TYPE "hars_method_enum"', undefined);
    }
}
