import { Specification } from '../../infra/typeorm/entities/Specification';
import { injectable, inject } from 'tsyringe';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

@injectable()
export default class ListSpecificationsUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(): Promise<Specification[]> {
    const specifications = await this.specificationsRepository.list();
    return specifications;
  }
}
