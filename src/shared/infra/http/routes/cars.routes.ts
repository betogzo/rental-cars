import CreateCarController from '@modules/cars/useCases/createCar/CreateCarController';
import FindCarByPlateController from '@modules/cars/useCases/findCarByPlate/FindCarByPlateController';
import ListAvailableCarsController from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import UploadCarImagesController from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';
import { Router } from 'express';
import multer from 'multer';
import checkValidUUID from '../middlewares/checkValidUUID';
import uploadConfig from '../../../../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import isUserAdmin from '../middlewares/isUserAdmin';

export const carsRoutes = Router();

const createCarController = new CreateCarController();
const findCarByPlateController = new FindCarByPlateController();
const listAvailableCarsController = new ListAvailableCarsController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload('./tmp/cars_images'));

carsRoutes.post(
  '/',
  ensureAuthenticated,
  isUserAdmin,
  createCarController.handle
);

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.get('/plate/:licence_plate', findCarByPlateController.handle);

carsRoutes.post(
  '/images/:car_id',
  ensureAuthenticated,
  isUserAdmin,
  checkValidUUID,
  upload.array('images'),
  uploadCarImagesController.handle
);
