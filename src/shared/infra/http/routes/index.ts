import { Router } from 'express';
import { categoriesRoutes } from './categories.routes';
import { specificationRoutes } from './specifications.routes';
import { userRoutes } from './users.routes';
import { carsRoutes } from './cars.routes';
import { rentalRoutes } from './rental.routes';
import { passwordForgotRoutes } from './forgot.routes';

export const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationRoutes);
router.use('/users', userRoutes);
router.use('/forgot', passwordForgotRoutes);
router.use('/cars', carsRoutes);
router.use('/rentals', rentalRoutes);
