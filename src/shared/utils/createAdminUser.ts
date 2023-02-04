// import TypeORMConnection from '@shared/infra/typeorm/TypeORMConfig';
import { typeORMConnect } from '@shared/infra/typeorm/TypeORMConfig';
import { dataSource } from '@shared/infra/typeorm/TypeORMConfig';
import { v4 as uuid } from 'uuid';
import { hash } from 'bcryptjs';

async function createAdminUser() {
  await typeORMConnect();
  const id = uuid();
  const password = await hash('admin', 4);

  await dataSource.query(
    `INSERT INTO USERS (id, name, email, password, "isAdmin")
     VALUES (uuid_generate_v4(), 'admin', 'admin@rentalcars.com', '${password}', true)`
  );
}

createAdminUser();
