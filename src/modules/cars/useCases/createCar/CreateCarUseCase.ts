import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  licence_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
export default class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    licence_plate,
    fine_amount,
    brand,
    category_id,
  }: IRequest): Promise<void> {
    const carAlreadyExists = await this.carsRepository.findByLicencePlate(
      licence_plate
    );

    if (carAlreadyExists)
      throw new AppError('Car already registered on our database');

    await this.carsRepository.create({
      name,
      description,
      daily_rate,
      licence_plate,
      fine_amount,
      brand,
      category_id,
    });
  }
}
