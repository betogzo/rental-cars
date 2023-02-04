import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1675001517816 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'name', type: 'varchar' },
          { name: 'username', type: 'varchar', isUnique: true },
          { name: 'password', type: 'varchar' },
          { name: 'email', type: 'varchar', isUnique: true },
          { name: 'drivers_licence', type: 'varchar', isNullable: true },
          { name: 'isAdmin', type: 'boolean', default: false },
          { name: 'created_at', type: 'timestamp', default: 'current_timestamp' },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
