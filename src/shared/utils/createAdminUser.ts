// import TypeORMConnection from '@shared/infra/typeorm/TypeORMConfig';
import { dataSource } from '@shared/infra/typeorm/TypeORMConfig';
import { v4 as uuid } from 'uuid';
import { hash } from 'bcryptjs';

async function createAdminUser() {
  dataSource
    .initialize()
    .then(() => console.log('[OK] Data source (POSTGRES) connected.\n\n'))
    .catch((error) =>
      console.error('[ERROR] Data source (POSTGRES) NOT connected.')
    );

  const id = uuid();
  const password = await hash('admin', 4);

  await dataSource.query(
    `INSERT INTO USERS (id, name, email, password, "isAdmin")
     VALUES ('${id}', 'admin', 'admin@rentalcars.com', '${password}', true)`
  );
}

createAdminUser();
