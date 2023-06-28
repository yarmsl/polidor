import { existsSync, unlinkSync } from 'fs';

import { Request, Response } from 'express';

import { User } from '~/modules/User';
import { errorHandler } from '~/utils/errorHandler';

import { PresentationFile } from '../PresentationFile.model';

export const deletePresentationFileController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user;
    const oldFile = await PresentationFile.find();
    if (Array.isArray(oldFile) && oldFile.length > 0) {
      await PresentationFile.findByIdAndDelete(oldFile[0]._id);
      await User.findByIdAndUpdate(userId, {
        presentationFile: undefined,
      });
      if (existsSync(oldFile[0].file)) {
        unlinkSync(oldFile[0].file);
      }
    }

    return res.status(200).json({ message: 'Файл успешно удален' });
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'Ошибка при удалении файла');
    return res.status(statusCode).json({ message });
  }
};
