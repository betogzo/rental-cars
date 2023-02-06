import { DataSource, PrimaryColumnCannotBeNullableError } from 'typeorm';
import 'reflect-metadata';

import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import Car from '@modules/cars/infra/typeorm/entities/Car';
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import Rental from '@modules/rentals/infra/typeorm/entities/Rental';
import UserToken from '@modules/accounts/infra/typeorm/entities/UserToken';

export const dataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  database:
    process.env.NODE_ENV === 'test' ? 'rentalcars_test' : 'rentalcarsdb',
  host: process.env.NODE_ENV === 'test' ? 'localhost' : 'database',
  username: 'docker',
  password: '1234',
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  entities: [Category, Specification, User, Car, CarImage, Rental, UserToken],
});


// npx typeorm migration:create ./src/shared/infra/typeorm/migrations/<nome_da_migration_sem_extensao>
