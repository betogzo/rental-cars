import { DataSource } from 'typeorm';
import 'reflect-metadata';

import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import Car from '@modules/cars/infra/typeorm/entities/Car';
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import Rental from '@modules/rentals/infra/typeorm/entities/Rental';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'database',
  port: 5432,
  username: 'docker',
  password: '1234',
  database: 'rentalcarsdb',
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  entities: [Category, Specification, User, Car, CarImage, Rental],
});

export async function typeORMConnect() {
  await dataSource
    .initialize()
    .then(() => {
      console.log('##    Data Source (POSTGRESQL) initialized.    ##');
      console.log('#################################################');
    })
    .catch((error) =>
      console.error('Error during Data Source initialization:', error)
    );
}

// npx typeorm migration:create ./src/shared/infra/typeorm/migrations/<nome_da_migration_sem_extensao>
