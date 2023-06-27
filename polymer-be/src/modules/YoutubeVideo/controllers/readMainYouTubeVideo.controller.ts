import { Request, Response } from 'express';

import { errorHandler } from '~/utils/errorHandler';

import { YoutubeVideo } from '../YoutubeVideo.model';

export const readMainYouTubeVideosController = async (req: Request, res: Response) => {
  try {
    const video = await YoutubeVideo.findOne({ isMain: true });

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
