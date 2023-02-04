import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

export default class SpecificationsRepositoryInMemory
  implements ISpecificationsRepository
{
  private specifications: Specification[] = [];

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((s) => s.name === name);
  }

  async list(): Promise<Specification[]> {
    return this.specifications;
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, { name, description });

    this.specifications.push(specification);

    return specification;
  }

  async findById(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter((s) => {
      ids.includes(s.id);
    });

    return allSpecifications;
  }
}
