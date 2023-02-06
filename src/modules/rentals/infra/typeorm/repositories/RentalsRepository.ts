import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import { dataSource } from '@shared/infra/typeorm/TypeORMConfig';
import { IsNull, Repository } from 'typeorm';
import Rental from '../entities/Rental';

export default class RentalRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = dataSource.getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { car_id, end_date: IsNull() },
    });
    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { user_id, end_date: IsNull() },
    });
    return rental;
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
    id, //optional. only for returning same as end_date and total
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      id,
      end_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findById(rental_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ where: { id: rental_id } });
    return rental;
  }

  async listRentalsByUserId(user_id: string): Promise<Rental[]> {
    const rentalsQuery = await this.repository.find({
      where: { user_id },
      relations: ['car'],
    });

    return rentalsQuery;
  }
}
