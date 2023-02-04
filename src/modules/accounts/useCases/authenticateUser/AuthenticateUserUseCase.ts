import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../../repositories/IUsersRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';

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
}

@injectable()
export default class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  private loginFailed() {
    throw new AppError('Email or password incorrect!', 401);
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    //does the user even exist?
    const user = await this.usersRepository.findByEmail(email);

    if (!user) this.loginFailed();

    //is the password correct at least?
    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) this.loginFailed();

    //ok, send the guy a token
    const token = sign({}, process.env.APP_SECRET_KEY, {
      subject: user.id, //necessary to get the user when he logs in
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    });

    const userBasicInfo = {
      name: user.name,
      email: user.email,
    };

    return { user: userBasicInfo, token };
  }
}
