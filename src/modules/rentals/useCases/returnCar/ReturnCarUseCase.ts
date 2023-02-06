import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import IDateProvider from '@shared/container/providers/dateProvider/IDateProvider';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  rental_id: string;
  user_id: string;
}

@injectable()
export default class ReturnCarUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ rental_id, user_id }: IRequest) {
    const rental = await this.rentalsRepository.findById(rental_id);
    const car = await this.carsRepository.findById(rental.car_id);

    //TO-DO: check business rule. apparently user is paying fine even returning the car earlier than expected

    let total = 0;

    if (!rental) throw new AppError('Rental not found.');

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.diffInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );

    if (daily <= 0) daily = 1; //less than 1 day counts as 1 day

    const delay = this.dateProvider.diffInDays(
      dateNow,
      rental.expected_return_date
    );

    //calculating the fine if there was a delay in returning the car
    if (delay > 0) {
      const fine = delay * car.fine_amount;
      total = fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailability(car.id, true);

    return rental;
  }
}
