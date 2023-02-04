import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import ICarsImagesRepository from '@modules/cars/repositories/ICarsImagesRepository';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  car_id: string;
  images_names: string[];
}

@injectable()
export default class UploadCarImagesUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository
  ) {}

  async execute({ car_id, images_names }: IRequest): Promise<CarImage> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) throw new AppError('Car not registered in our database', 400);

    images_names.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
    });

    return;
  }
}
