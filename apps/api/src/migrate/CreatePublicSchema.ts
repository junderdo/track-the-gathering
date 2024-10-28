import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePublicSchema implements MigrationInterface {
  // TODO: This timestamp determines order of migration execution --
  public name = this.constructor.name + `${Date.now() - 20 * 1000}`;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS public`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA IF EXISTS public CASCADE`);
  }
}
