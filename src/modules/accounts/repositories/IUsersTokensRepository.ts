import ICreateUsersTokensDTO from '../dtos/ICreateUsersTokensDTO';
import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUsersTokensRepository {
  create({
    user_id,
    expiration_date,
    refresh_token,
  }: ICreateUsersTokensDTO): Promise<UserToken>;

  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken>;

  deleteById(id: string): Promise<void>;

  findByRefreshToken(token: string): Promise<UserToken>;
}
