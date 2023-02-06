import CreateRentalController from '@modules/rentals/useCases/createRental/CreateRentalController';
import ListRentalsByUserController from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';
import ReturnCarController from '@modules/rentals/useCases/returnCar/ReturnCarController';
import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

export const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const returnCarController = new ReturnCarController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post(
  '/create',
  ensureAuthenticated,
  createRentalController.handle
);

rentalRoutes.post(
  '/return/:id',
  ensureAuthenticated,
  returnCarController.handle
);

rentalRoutes.post(
  '/list',
  ensureAuthenticated,
  listRentalsByUserController.handle
);
