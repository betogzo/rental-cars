import AppError from '@shared/errors/AppError';
import CategoriesRepositoryInMemory from '../../repositories/inMemory/CategoriesRepositoryInMemory';
import CreateCategoryUseCase from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoryRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoryRepositoryInMemory
    );
  });

  it('should be able to create a new category', async () => {
    const fakeCategory = { name: 'Fake Category', description: 'Im fake af.' };

    await createCategoryUseCase.execute(fakeCategory);
    const didItWork = await categoryRepositoryInMemory.findByName(
      fakeCategory.name
    );

    expect(didItWork).toHaveProperty('id');
  });

  it('should not be able to create duplicate categories (same name)', async () => {
    expect(async () => {
      const fakeCategory = {
        name: 'Fake Category',
        description: 'Im fake af.',
      };

      await createCategoryUseCase.execute(fakeCategory);
      await createCategoryUseCase.execute(fakeCategory);
    }).rejects.toBeInstanceOf(AppError);
  });
});
