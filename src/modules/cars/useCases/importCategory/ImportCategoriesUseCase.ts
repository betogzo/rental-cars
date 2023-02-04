import fs from 'node:fs';
import { parse as csvParse } from 'csv-parse';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { injectable, inject } from 'tsyringe';

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
export default class ImportCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;

      const categoryAlreadyExists = await this.categoriesRepository.findByName(
        name
      );

      if (!categoryAlreadyExists)
        await this.categoriesRepository.create({ name, description });
    });
  }

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];

      const stream = fs.createReadStream(file.path);

      const parseFile = csvParse({ delimiter: ',' });

      stream.pipe(parseFile);

      parseFile
        .on('data', async (line) => {
          const [name, description] = line;

          categories.push({ name, description });
        })
        .on('end', () => {
          fs.promises.unlink(file.path); //apagando o arquivo temporario
          resolve(categories);
        })
        .on('error', (err) => reject(err));
    });
  }
}
