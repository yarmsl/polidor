import { Request, Response } from 'express';

import { errorHandler } from '~/utils/errorHandler';

import { Video } from '../Video.model';

export const readMainVideosController = async (req: Request, res: Response) => {
  try {
    const videos = await Video.find({ isMain: true });

    const result = videos?.map(({ embedId, title, autoplay, mute }) => ({
      embedId,
      title,
      autoplay,
      mute,
    }));

    return res.status(200).json(result);
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'Getting main videos error');
    return res.status(statusCode).json({ message });
  }
};
