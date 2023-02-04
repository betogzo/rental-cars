import { Request, Response } from 'express';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';
import { container } from 'tsyringe';

export default class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const token = await authenticateUserUseCase.execute({ email, password });

    return response.status(200).json({ token });
  }
}
