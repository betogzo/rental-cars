import CarsRepositoryInMemory from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';
import SpecificationsRepositoryInMemory from '@modules/cars/repositories/inMemory/SpecificationsRepositoryInMemory';
import AppError from '@shared/errors/AppError';
import CreateCarSpecificationUseCase from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it('should not be able to add a new specification to a non-existent car', async () => {
    const car_id = '1234';
    const specifications_id = ['54321'];

    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a new specification to a car', async () => {
    const fakeCar = await carsRepositoryInMemory.create({
      name: 'Fake Car',
      description: 'Fake Car Description',
      daily_rate: 179,
      licence_plate: 'ANV-2504',
      fine_amount: 79,
      brand: 'Fakeswagen',
      category_id: '5001dd20-1d7c-499b-88dd-73654e9b48c5',
    });

    const specifications_id = ['54321'];

    createCarSpecificationUseCase.execute({
      car_id: fakeCar.id,
      specifications_id,
    });
  });
});
