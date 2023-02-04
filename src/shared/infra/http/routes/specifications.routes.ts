import { Router } from 'express';
import CreateSpecificationController from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import ListSpecificationsController from '@modules/cars/useCases/listSpecifications/ListSpecificationsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import isUserAdmin from '../middlewares/isUserAdmin';

export const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationRoutes.post(
  '/',
  ensureAuthenticated,
  isUserAdmin,
  createSpecificationController.handle
);
specificationRoutes.get(
  '/',
  ensureAuthenticated,
  listSpecificationsController.handle
);
