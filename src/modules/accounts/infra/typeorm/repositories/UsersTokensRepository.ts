import ICreateUsersTokensDTO from '@modules/accounts/dtos/ICreateUsersTokensDTO';
import IUsersTokensRepository from '@modules/accounts/repositories/IUsersTokensRepository';
import { dataSource } from '@shared/infra/typeorm/TypeORMConfig';
import { Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

export default class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = dataSource.getRepository(UserToken);
  }
  async create({
    user_id,
    expiration_date,
    refresh_token,
  }: ICreateUsersTokensDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      user_id,
      expiration_date,
      refresh_token,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    const userTokens = await this.repository.findOne({
      where: { user_id, refresh_token },
    });
    return userTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByRefreshToken(token: string): Promise<UserToken> {
    const userToken = await this.repository.findOne({
      where: { refresh_token: token },
    });

    return userToken;
  }
}
