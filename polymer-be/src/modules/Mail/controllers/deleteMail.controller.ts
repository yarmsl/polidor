import { Request, Response } from 'express';

import { errorHandler } from '~/utils/errorHandler';

import { Mail } from '../Mail.model';

export const deleteMailController = async (req: Request, res: Response) => {
  try {
    await Mail.findOneAndDelete();

    return res.status(200).json({ message: 'Почта успешно удалена' });
  } catch (e) {
    const { message, statusCode } = errorHandler(e, 'Ошибка удаления почты');

    return res.status(statusCode).json({ message });
  }
};
