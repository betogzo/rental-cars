import { Request, Response } from 'express';
import ListAvailableCarsUseCase from './ListAvailableCarsUseCase';
import { container } from 'tsyringe';

export default class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, name, category_id } = request.query;

    const listCarsUseCase = container.resolve(ListAvailableCarsUseCase);

    const cars = await listCarsUseCase.execute({
      brand: brand as string,
      name: name as string,
      category_id: category_id as string,
    });

    return response.status(200).json({ cars });
  }
}
