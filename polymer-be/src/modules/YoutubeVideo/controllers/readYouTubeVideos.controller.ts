import { Request, Response } from 'express';

import { errorHandler } from '~/utils/errorHandler';

import { YoutubeVideo } from '../YoutubeVideo.model';

export const readYouTubeVideosController = async (req: Request, res: Response) => {
  try {
    const videos = await YoutubeVideo.find().populate(['author', 'projects']);

    return res.status(200).json(videos);
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'Getting all youtube videos error');
    return res.status(statusCode).json({ message });
  }
};
