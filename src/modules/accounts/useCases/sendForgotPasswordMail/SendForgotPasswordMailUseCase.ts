import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import IUsersTokensRepository from '@modules/accounts/repositories/IUsersTokensRepository';
import IDateProvider from '@shared/container/providers/dateProvider/IDateProvider';
import IMailProvider from '@shared/container/providers/mailProvider/IMailProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import { resolve } from 'node:path';

@injectable()
export default class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider') private dateProvider: IDateProvider,
    @inject('MailProvider') private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('Email not registered in our database');

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs'
    );

    const token = uuid();

    const vars = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_LINK}${token}`,
    };

    const expiration_date = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expiration_date,
    });

    await this.mailProvider.sendMail(
      email,
      'Password recovery',
      vars,
      templatePath
    );
  }
}
