import { Request, Response } from 'express';

import { errorHandler } from '~/utils/errorHandler';

import { MainPicture } from '../MainPicture.model';

export const readMainPicturesController = async (req: Request, res: Response) => {
  const userId = req.body?.user?.userId;
  try {
    const mainPictures = await MainPicture.find({
      order: [1, 2, 3],
    }).populate('author');

    if (Array.isArray(mainPictures) && mainPictures.length > 0) {
      mainPictures?.sort((a, b) => a.order - b.order);
    }

    if (userId) {
      return res.status(200).json(mainPictures);
    } else {
      const mainPicturesFE = mainPictures?.map((mp) => {
        return {
          src: mp.src,
          order: mp.order,
          tab: mp.tab,
        };
      });
      return res.status(200).json(mainPicturesFE);
    }
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'getting all main pictures error');
    return res.status(statusCode).json({ message });
  }
};
