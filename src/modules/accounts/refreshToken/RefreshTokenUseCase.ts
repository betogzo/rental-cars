import { auth } from '@config/auth';
import IDateProvider from '@shared/container/providers/dateProvider/IDateProvider';
import AppError from '@shared/errors/AppError';
import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import IUsersTokensRepository from '../repositories/IUsersTokensRepository';

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
export default class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}
  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;

    const user_id = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) throw new AppError("Refresh token doesn't exits", 401);

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.refresh_token_exp_time,
    });

    const expiration_date = this.dateProvider.addDays(
      auth.refresh_token_exp_days
    );

    await this.usersTokensRepository.create({
      user_id,
      expiration_date,
      refresh_token,
    });

    const new_token = sign({}, auth.secret_token, {
      subject: user_id, //necessary to get the user when he logs in
      expiresIn: auth.jwt_expiration_time,
    });

    return { token: new_token, refresh_token };
  }
}
