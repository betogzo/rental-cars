import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../../repositories/IUsersRepository';
import ICreateUsersDTO from '../../dtos/ICreateUserDTO';

interface IRequest {
  name: string;
  email: string;
  password: string;
  drivers_licence: string;
}

@injectable()
export default class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    password,
    email,
    drivers_licence,
  }: ICreateUsersDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists)
      throw new AppError('Email already registered in our database!', 400);

    const encryptedPassword = await hash(password, 8);

    await this.usersRepository.create({
      name,
      password: encryptedPassword,
      email,
      drivers_licence,
    });
  }
}
