import { Router } from 'express';
import multer from 'multer';

import CreateUserController from '@modules/accounts/useCases/createUser/CreateUserController';
import AuthenticateUserController from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import UpdateUserAvatarController from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import ensureAuthenticated from '@middlewares/ensureAuthenticated';

import uploadConfig from '@config/upload';
const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

export const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRoutes.post('/signup', createUserController.handle);
userRoutes.post('/signin', authenticateUserController.handle);
userRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
);
