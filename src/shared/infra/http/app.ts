import express, { NextFunction, Response, Request } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import { router } from './routes';
import { dataSource } from '../typeorm/TypeORMConfig';
import '../../container';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../swagger.json';
import * as dotenv from 'dotenv';
import AppError from '@shared/errors/AppError';

dotenv.config();

dataSource
  .initialize()
  .then(() => console.log('[OK] Data source (POSTGRES) connected.\n\n'))
  .catch((error) =>
    console.error('[ERROR] Data source (POSTGRES) NOT connected.')
  );

export const app = express();

app.use(express.json());

app.use(router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError)
      return response.status(err.statusCode).json({ message: err.message });
    else
      return response.status(500).json({
        message: `Internal Server Error - reason: ${
          err.message ? err.message : 'unknown error'
        }`,
      });
  }
);

app.all('*', (request, response) => response.status(404).send());
