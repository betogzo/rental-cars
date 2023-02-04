import { Router } from 'express';
import multer from 'multer';
import CreateCategoryController from '@modules/cars/useCases/createCategory/CreateCategoryController';
import ImportCategoriesController from '@modules/cars/useCases/importCategory/ImportCategoriesController';
import ListCategoriesController from '@modules/cars/useCases/listCategories/listCategoriesController';
import ensureAuthenticated from '@middlewares/ensureAuthenticated';
export const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoriesController = new ImportCategoriesController();

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  createCategoryController.handle
);
categoriesRoutes.get('/', ensureAuthenticated, listCategoriesController.handle);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoriesController.handle
);
