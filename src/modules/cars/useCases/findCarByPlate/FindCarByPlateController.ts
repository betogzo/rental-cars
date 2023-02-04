import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindCarByPlateUseCase from './FindCarByPlateUseCase';

export default class FindCarByPlateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { licence_plate } = request.params;

    const findCarByPlateUseCase = container.resolve(FindCarByPlateUseCase);

    const car = await findCarByPlateUseCase.execute(licence_plate);

    return response.status(200).json({ car });
  }
}
