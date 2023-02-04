import { Category } from '../../infra/typeorm/entities/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();
    return categories;
  }
}
