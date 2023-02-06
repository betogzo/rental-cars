import { Request, Response } from 'express';
import { container, injectable } from 'tsyringe';
import ResetPasswordUseCase from './ResetPasswordUseCase';

export default class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;

    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);

    await resetPasswordUseCase.execute({ token: String(token), password });

    return response.status(200).send();
  }
}
