import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import Rental from '@modules/rentals/infra/typeorm/entities/Rental';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import IDateProvider from '@shared/container/providers/dateProvider/IDateProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
export default class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DateProvider')
    private dateProvider?: IDateProvider
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const isCarUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (isCarUnavailable)
      throw new AppError(
        'The vehicle you selected is not available at this moment.'
      );

    const userAlreadyHasRental =
      await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (userAlreadyHasRental)
      throw new AppError('User already has an open rental.');

    //a rental must last at least 24 hours
    const validateRentalTime = this.dateProvider.diffInHours(
      this.dateProvider.dateNow(),
      expected_return_date
    );

    if (validateRentalTime < 24)
      throw new AppError('Rental must last at least 24 hours.');

    this.carsRepository.updateAvailability(car_id, false);

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}
