import { Request, Response } from 'express';

import { errorHandler } from '~/utils/errorHandler';

import { Video } from '../Video.model';

export const readMainVideosController = async (req: Request, res: Response) => {
  try {
    const video = await Video.findOne({ isMain: true });

    const result = {
      embedId: video?.embedId,
      title: video?.title,
      autoplay: video?.autoplay,
      mute: video?.mute,
    };

    return res.status(200).json(result);
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'Getting main video error');
    return res.status(statusCode).json({ message });
  }
};
