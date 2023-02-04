import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import CarsRepositoryInMemory from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';
import ListAvailableCarsUseCase from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListAvailableCarsUseCase;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const fakeCar = await carsRepositoryInMemory.create({
      name: 'Fake Car',
      description: 'Fake Car Description',
      daily_rate: 179,
      licence_plate: 'ANV-2504',
      fine_amount: 79,
      brand: 'Fakeswagen',
      category_id: 'fake_category',
    });

    const cars = await listCarsUseCase.execute({});

    // cars.push({
    //   id: '1',
    //   name: 'Fake Car',
    //   description: 'Fake Car Description',
    //   daily_rate: 179,
    //   licence_plate: 'ANV-2504',
    //   fine_amount: 79,
    //   available: false,
    //   brand: 'Fakeswagen',
    //   category: new Category(),
    //   category_id: 'ddd',
    //   created_at: new Date(),
    // });

    // expect(cars.length).toEqual(1);
  });

  it('should be able to list all available cars by brand', async () => {
    const fakeCar = await carsRepositoryInMemory.create({
      name: 'Fake Car',
      description: 'Fake Car Description',
      daily_rate: 179,
      licence_plate: 'ANV-2504',
      fine_amount: 79,
      brand: 'Fakeswagen',
      category_id: 'fake_category',
    });

    const cars = await listCarsUseCase.execute({ brand: 'Fakeswagen' });

    expect(cars).toEqual([fakeCar]);
  });

  it('should be able to list all available cars by name', async () => {
    const fakeCar = await carsRepositoryInMemory.create({
      name: 'Fake Car',
      description: 'Fake Car Description',
      daily_rate: 179,
      licence_plate: 'ANV-2504',
      fine_amount: 79,
      brand: 'Fakeswagen',
      category_id: 'fake_category',
    });

    const cars = await listCarsUseCase.execute({ name: 'Fake Car' });

    expect(cars).toEqual([fakeCar]);
  });

  it('should be able to list all available cars by category_id', async () => {
    const fakeCar = await carsRepositoryInMemory.create({
      name: 'Fake Car',
      description: 'Fake Car Description',
      daily_rate: 179,
      licence_plate: 'ANV-2504',
      fine_amount: 79,
      brand: 'Fakeswagen',
      category_id: 'fake_category',
    });

    const cars = await listCarsUseCase.execute({
      category_id: 'fake_category',
    });

    expect(cars).toEqual([fakeCar]);
  });
});
