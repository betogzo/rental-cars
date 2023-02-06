import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import Car from '@modules/cars/infra/typeorm/entities/Car';
import ICarsRepository from '../ICarsRepository';

export default class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create(carData: ICreateCarDTO): Promise<Car> {
    const {
      name,
      description,
      daily_rate,
      licence_plate,
      fine_amount,
      brand,
      category_id,
    } = carData;

    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      licence_plate,
      fine_amount,
      brand,
      category_id,
    });

    this.cars.push(car);
    return car;
  }

  async findByLicencePlate(licence_plate: string): Promise<Car> {
    const car = this.cars.find((c) => c.licence_plate === licence_plate);
    return car;
  }

  async list(): Promise<Car[]> {
    return this.cars;
  }

  async listAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[]> {
    const cars = this.cars.filter((c) => {
      if (
        c.available === true ||
        (brand && c.brand === brand) ||
        (name && c.name === name) ||
        (category_id && c.category_id === category_id)
      ) {
        return c;
      }
      return null;
    });

    return cars;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }

  async updateAvailability(id: string, isAvailable: boolean): Promise<void> {
    const car = this.cars.findIndex((c) => c.id === id);
    this.cars[car].available = isAvailable;
  }
}
