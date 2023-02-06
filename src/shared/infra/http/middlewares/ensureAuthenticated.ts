import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { auth } from '@config/auth';

interface IPayload {
  sub: string;
}

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('Authentication token missing!', 401);

  const token = authHeader.replace('Bearer ', '');

  try {
    //verifying token and capturing user id
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

    //does user exists?
    const usersRepository = new UsersRepository();

    //check src/@types/express for more info about the code above
    request.user = {
      id: user_id,
    };

    //ok, you can go
    return next();
  } catch (error) {
    throw new AppError('Invalid token!', 401);
  }
}
