import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../../repositories/IUsersRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import { auth } from '@config/auth';
import IUsersTokensRepository from '@modules/accounts/repositories/IUsersTokensRepository';
import IDateProvider from '@shared/container/providers/dateProvider/IDateProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
export default class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('DateProvider') private dateProvider: IDateProvider,
    @inject('UsersTokensRepository')
    private usersTokensRepository?: IUsersTokensRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('Email or password incorrect!', 401);

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect)
      throw new AppError('Email or password incorrect!', 401);

    const token = sign({}, auth.secret_token, {
      subject: user.id, //necessary to get the user when he logs in
      expiresIn: auth.jwt_expiration_time,
    });

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user.id,
      expiresIn: auth.refresh_token_exp_time,
    });

    const refresh_token_expiration = this.dateProvider.addDays(
      auth.refresh_token_exp_days
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      expiration_date: refresh_token_expiration,
      refresh_token,
    });

    const userBasicInfo = {
      name: user.name,
      email: user.email,
    };

    return { user: userBasicInfo, token, refresh_token };
  }
}
