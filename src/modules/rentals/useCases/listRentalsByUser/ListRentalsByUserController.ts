import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListRentalsByUserUseCase from './ListRentalsByUserUseCase';

export default class ListRentalsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const listRentalsByUserId = container.resolve(ListRentalsByUserUseCase);

    const rentals = await listRentalsByUserId.execute(user_id);

    if (rentals.length === 0) return response.status(204).send();

    return response.status(200).json({ rentals });
  }
}
