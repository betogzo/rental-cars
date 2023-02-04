import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'uuid';

export default function checkValidUUID(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const car_id = request.params.car_id ? request.params.car_id : null;
  const id = request.params.id ? request.params.id : null;

  if (!validate(car_id) && !validate(id))
    throw new AppError('The ID you provided is not a valid UUID', 400);

  return next();
}
