import ICreateUsersDTO from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  create(userData: ICreateUsersDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
