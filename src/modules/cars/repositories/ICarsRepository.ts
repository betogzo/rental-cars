import ICreateCarDTO from '../dtos/ICreateCarDTO';
import Car from '../infra/typeorm/entities/Car';

export default interface ICarsRepository {
  create(carData: ICreateCarDTO): Promise<Car>;
  findByLicencePlate(licence_plate: string): Promise<Car>;
  list(): Promise<Car[]>;
  listAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[]>;
  findById(car_id: string): Promise<Car>;
  updateAvailability(id: string, isAvailable: boolean): Promise<void>;
}
