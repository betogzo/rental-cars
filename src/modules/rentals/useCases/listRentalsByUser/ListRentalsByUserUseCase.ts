import Rental from '@modules/rentals/infra/typeorm/entities/Rental';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalsRepository') private rentalsRepository: IRentalsRepository
  ) {}

  async execute(user_id: string): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.listRentalsByUserId(user_id);
    return rentals;
  }
}
