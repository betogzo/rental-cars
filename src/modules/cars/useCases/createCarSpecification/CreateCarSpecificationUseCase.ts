import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

export default class CreateCarSpecificationUseCase {
  constructor(
    private carsRepository: ICarsRepository,
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists)
      throw new AppError('Car not registered in our database', 400);

    const specifications = await this.specificationsRepository.findById(
      specifications_id
    );

    carExists.specifications = specifications;

    await this.carsRepository.create(carExists);
  }
}
