import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import ICreateRentalDTO from '../dtos/ICreateRentalDTO';
import Rental from '../infra/typeorm/entities/Rental';

export default interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  findById(rental_id: string): Promise<Rental>;
  create(data: ICreateRentalDTO): Promise<Rental>;
  listRentalsByUserId(user_id: string): Promise<Rental[]>;
}
