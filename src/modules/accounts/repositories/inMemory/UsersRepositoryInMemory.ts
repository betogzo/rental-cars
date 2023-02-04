import ICreateUsersDTO from '../../dtos/ICreateUserDTO';
import { User } from '../../infra/typeorm/entities/User';
import IUsersRepository from '../IUsersRepository';

export default class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async create(userData: ICreateUsersDTO): Promise<void> {
    let user = new User();
    Object.assign(user, userData);
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((u) => u.email === email);
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((u) => u.id === id);
    return user;
  }
}
