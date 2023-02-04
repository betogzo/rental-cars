import RentalsRepositoryInMemory from '@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory';
import AppError from '@shared/errors/AppError';
import CreateRentalUseCase from './CreateRentalUseCase';
import dayjs from 'dayjs';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

let oneDayRental = dayjs().add(1, 'day').add(10, 'seconds').toDate();

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: 'fake_user_id',
      car_id: 'fake_car_id',
      expected_return_date: oneDayRental,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to book a new rental for a user that already has one', () => {
    expect(async () => {
      const rental = await createRentalUseCase.execute({
        user_id: 'fake_user_id',
        car_id: 'fake_car_id',
        expected_return_date: oneDayRental,
      });

      const rental2 = await createRentalUseCase.execute({
        user_id: 'fake_user_id',
        car_id: 'fake_car_id2',
        expected_return_date: oneDayRental,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to book a new rental for a car that is already rented', () => {
    expect(async () => {
      const rental = await createRentalUseCase.execute({
        user_id: 'fake_user_id1',
        car_id: 'fake_car_id',
        expected_return_date: dayjs().add(3, 'hours').toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
