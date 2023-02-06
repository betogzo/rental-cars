import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ReturnCarUseCase from './ReturnCarUseCase';

export default class ReturnCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const returnCarUseCase = container.resolve(ReturnCarUseCase);

    const { id: rental_id } = request.params;
    const { id: user_id } = request.user;

    const rental = await returnCarUseCase.execute({ rental_id, user_id });

    console.log(rental);

    return response.status(200).json({ rental });
  }
}
