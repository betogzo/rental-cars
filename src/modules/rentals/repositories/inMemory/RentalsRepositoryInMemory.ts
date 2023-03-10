import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO';
import Rental from '@modules/rentals/infra/typeorm/entities/Rental';
import IRentalsRepository from '../IRentalsRepository';

export default class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[] = [];

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find((r) => r.car_id === car_id && !r.end_date);
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find((u) => u.user_id === user_id && !u.end_date);
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      user_id,
      car_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findById(rental_id: string): Promise<Rental> {
    return this.rentals.find((r) => r.id === rental_id);
  }

  async listRentalsByUserId(user_id: string): Promise<Rental[]> {
    const rentals = this.rentals.filter((r) => r.user_id === user_id);
    return rentals;
  }
}
