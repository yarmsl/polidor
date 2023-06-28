import { Request, Response } from 'express';

import { errorHandler, notFoundError } from '~/utils/errorHandler';

import { PresentationFile } from '../PresentationFile.model';

export const readFileController = async (req: Request, res: Response) => {
  const userId = req.body?.user?.userId;
  try {
    const file = await PresentationFile.findOne();
    if (file) {
      if (userId) {
        return res.status(200).json(file);
      } else {
        return res.download(`${file.file}`);
      }
    } else {
      throw notFoundError('Файл отсутствует');
    }
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'Ошибка получения файла');
    return res.status(statusCode).json({ message });
  }
};
