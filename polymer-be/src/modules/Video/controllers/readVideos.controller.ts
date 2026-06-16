import { Request, Response } from 'express';

import { errorHandler } from '~/utils/errorHandler';

import { Video } from '../Video.model';

export const readVideosController = async (req: Request, res: Response) => {
  const userId = req.body?.user?.userId;

  try {
    const videos = await Video.find().populate(['author', 'projects']);
    if (userId) return res.status(200).json(videos);
    else {
      const videosFE = videos?.map(({ embedId, title, projects, autoplay, mute }) => ({
        embedId,
        title,
        projects,
        autoplay,
        mute,
      }));

      return res.status(200).json(videosFE);
    }
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'Getting all videos error');
    return res.status(statusCode).json({ message });
  }
};
