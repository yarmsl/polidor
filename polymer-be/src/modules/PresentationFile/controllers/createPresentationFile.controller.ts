import { existsSync, unlinkSync } from 'fs';

import { Request, Response } from 'express';

import { User } from '~/modules/User';
import { errorHandler } from '~/utils/errorHandler';

import { PresentationFile } from '../PresentationFile.model';

export const createPresentationFileController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user;
    const file = req.file != null ? req.file.path : '';

    const oldFile = await PresentationFile.find();
    if (Array.isArray(oldFile) && oldFile.length > 0) {
      await PresentationFile.findByIdAndDelete(oldFile[0]._id);
      if (existsSync(oldFile[0].file)) {
        unlinkSync(oldFile[0].file);
      }
    }
    const newFile = new PresentationFile({ author: userId, file });

    await newFile.save();
    await User.findByIdAndUpdate(userId, {
      presentationFile: newFile._id,
    });
    return res.status(201).json({ message: 'Файл успешно загружен' });
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'Ошибка загрузки файла');
    return res.status(statusCode).json({ message });
  }
};
