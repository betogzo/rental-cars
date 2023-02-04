import CarsRepositoryInMemory from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';
import AppError from '@shared/errors/AppError';
import CreateCarUseCase from '../createCar/CreateCarUseCase';
import FindCarByPlateUseCase from './FindCarByPlateUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let findCarByPlateUseCase: FindCarByPlateUseCase;
let createCarUseCase: CreateCarUseCase;

describe('Find car by plate', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    findCarByPlateUseCase = new FindCarByPlateUseCase(carsRepositoryInMemory);
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to retrieve an existing car', async () => {
    const fakeCar = {
      name: 'Fake Car',
      description: 'Fake Car Description',
      daily_rate: 179,
      licence_plate: 'ANV-2504',
      fine_amount: 79,
      brand: 'Fakeswagen',
      category_id: '5001dd20-1d7c-499b-88dd-73654e9b48c5',
    };

    await createCarUseCase.execute(fakeCar);

    const car = await findCarByPlateUseCase.execute(fakeCar.licence_plate);

    expect(car).toHaveProperty('id');
  });

  it('should return an error if car doesnt exists on database', () => {
    expect(async () => {
      await findCarByPlateUseCase.execute('FAKEFAKEFAKE-0000');
    }).rejects.toBeInstanceOf(AppError);
  });
});
