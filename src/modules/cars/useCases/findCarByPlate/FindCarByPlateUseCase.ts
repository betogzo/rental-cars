import Car from '@modules/cars/infra/typeorm/entities/Car';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class FindCarByPlateUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute(licence_plate: string): Promise<Car> {
    const car = await this.carsRepository.findByLicencePlate(licence_plate);

    if (!car) throw new AppError('Car not found', 404);

    return car;
  }
}
