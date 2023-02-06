import ResetPasswordController from '@modules/accounts/useCases/resetPassword/ResetPasswordController';
import SendForgotPasswordMailController from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';
import { Router } from 'express';

export const passwordForgotRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

passwordForgotRoutes.post('/', sendForgotPasswordMailController.handle);
passwordForgotRoutes.post('/reset', resetPasswordController.handle);
