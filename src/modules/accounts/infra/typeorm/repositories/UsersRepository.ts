import IUsersRepository from '../../../repositories/IUsersRepository';
import ICreateUsersDTO from '../../../dtos/ICreateUserDTO';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { dataSource } from '@shared/infra/typeorm/TypeORMConfig';

export default class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }
  async findById(id: string): Promise<User> {
    return await this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ where: { email } });
  }

  async create(userData: ICreateUsersDTO): Promise<void> {
    const user = this.repository.create(userData);
    await this.repository.save(user);
  }
}
