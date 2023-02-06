import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import { dataSource } from '@shared/infra/typeorm/TypeORMConfig';
import { Repository } from 'typeorm';
import Car from '../entities/Car';

export default class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = dataSource.getRepository(Car);
  }

  async listAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });

    //LOWER = making queries case insensitive
    if (brand) carsQuery.andWhere('LOWER(c.brand) = LOWER(:brand)', { brand });

    if (name) carsQuery.andWhere('LOWER(c.name) = LOWER(:name)', { name });

    if (category_id)
      carsQuery.andWhere('LOWER(c.category_id) = LOWER(:category_id)', {
        category_id,
      });

    const cars = await carsQuery.getMany();
    return cars;
  }

  async list(): Promise<Car[]> {
    const cars = this.repository.find();
    return cars;
  }

  async create(carData: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(carData);
    await this.repository.save(car);
    return car;
  }

  async findByLicencePlate(licence_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ where: { licence_plate } });
    return car;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne({ where: { id } });
    return car;
  }

  async updateAvailability(id: string, isAvailable: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available: isAvailable })
      .where({ id })
      .setParameters({ id })
      .execute();
  }
}
