import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../../repositories/IUsersRepository';
import { deleteFile } from '../../../../shared/utils/file';

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
export default class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  async execute({ userId, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    //first check if user already has an avatar, and if it does, delete it
    if (user.avatar) await deleteFile(`./tmp/avatar/${user.avatar}`);

    user.avatar = avatarFile;

    await this.usersRepository.create(user);
  }
}
