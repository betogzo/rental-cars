import { Request, Response } from 'express';
import ImportCategoryUseCase from './ImportCategoriesUseCase';
import { container } from 'tsyringe';

export default class ImportCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    await importCategoryUseCase.execute(file);

    return response.status(201).send();
  }
}
