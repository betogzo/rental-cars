import { NextFunction, Request, Response } from 'express';
import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';

export default async function isUserAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(request.user.id);

  if (!user) throw new AppError('Invalid session, please login properly', 401);

  if (!user.isAdmin)
    throw new AppError('You must be an admin to perform this action!', 401);

  return next();
}
