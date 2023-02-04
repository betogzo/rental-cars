import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';
import { injectable, inject } from 'tsyringe';
import SpecificationsRepository from '../../infra/typeorm/repositories/SpecificationsRepository';
import AppError from '@shared/errors/AppError';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export default class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(name);

    if (specificationAlreadyExists)
      throw new AppError('Specification already exists!');

    const specification = await this.specificationRepository.create({
      name,
      description,
    });

    return specification;
  }
}
