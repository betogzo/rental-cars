import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import { dataSource } from '@shared/infra/typeorm/TypeORMConfig';
import { Repository } from 'typeorm';
import Rental from '../entities/Rental';

export default class RentalRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = dataSource.getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ where: { car_id } });
    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ where: { user_id } });
    return rental;
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    await this.repository.save(rental);

    return rental;
  }
}
