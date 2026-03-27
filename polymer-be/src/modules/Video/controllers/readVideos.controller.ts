import { Request, Response } from 'express';

import { errorHandler } from '~/utils/errorHandler';

import { Video } from '../Video.model';

export const readVideosController = async (req: Request, res: Response) => {
  try {
    const videos = await Video.find().populate(['author', 'projects']);

    return res.status(200).json(videos);
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'Getting all videos error');
    return res.status(statusCode).json({ message });
  }
};
