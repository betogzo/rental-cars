import CarsRepositoryInMemory from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';
import AppError from '@shared/errors/AppError';
import CreateCarUseCase from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    await createCarUseCase.execute({
      name: 'Fake Car',
      description: 'Fake Car Description',
      daily_rate: 179,
      licence_plate: 'ANV-2504',
      fine_amount: 79,
      brand: 'Fakeswagen',
      category_id: '5001dd20-1d7c-499b-88dd-73654e9b48c5',
    });
  });

  it('should not let user create duplicate cars (same licence plate)', async () => {
    expect(async () => {
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
      await createCarUseCase.execute(fakeCar);
    }).rejects.toBeInstanceOf(AppError);
  });
});
