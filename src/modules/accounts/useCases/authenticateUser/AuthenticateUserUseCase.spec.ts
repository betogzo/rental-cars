import AppError from '@shared/errors/AppError';
import ICreateUsersDTO from '../../dtos/ICreateUserDTO';
import UsersRepositoryInMemory from '../../repositories/inMemory/UsersRepositoryInMemory';
import CreateUserUseCase from '../createUser/CreateUserUseCase';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  /////////////////////////////////
  const user: ICreateUsersDTO = {
    name: 'Fake User',
    email: 'user@fake.com',
    password: 'fakepass',
    drivers_licence: 'IDONTHAVEONE',
  };
  /////////////////////////////////

  it('should be able to correctly authenticate an user', async () => {
    await createUserUseCase.execute(user);

    const token = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(token).toHaveProperty('token');
  });

  it('should not be able to authenticate an user when the password is wrong', () => {
    expect(async () => {
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'invalidpassword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an unregistered user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'fakefakefakefake@fake.fake',
        password: 'nottrue',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
