import { container } from 'tsyringe';
import UploadCarImagesUseCase from './UploadCarImagesUseCase';
import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';

interface IFiles {
  filename: string;
}

export default class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { car_id } = request.params;
    const images = request.files as IFiles[];

    if (!images)
      throw new AppError(
        'No file was sent in your request. You must upload at least one valid image',
        400
      );

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    const images_names = images.map((img) => img.filename);

    await uploadCarImagesUseCase.execute({
      car_id,
      images_names,
    });

    return response.status(201).send();
  }
}
