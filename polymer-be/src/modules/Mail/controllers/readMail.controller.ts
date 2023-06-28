import { Request, Response } from 'express';

import { HttpError, errorHandler } from '~/utils/errorHandler';

import { Mail } from '../Mail.model';

export const readMailController = async (req: Request, res: Response) => {
  try {
    const mail = await Mail.findOne();

    if (!mail) throw new HttpError('Почта не добавлена', 404);
    return res.status(200).json({
      email: mail.email,
      feedback: mail.feedback,
      provider: mail.provider,
    });
  } catch (e) {
    const { message, statusCode } = errorHandler(e, 'Ошибка получения');

    return res.status(statusCode).json({ message });
  }
};
