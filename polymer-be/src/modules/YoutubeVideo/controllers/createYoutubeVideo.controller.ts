import { Request, Response } from 'express';

import { Project } from '~/modules/Project';
import { User } from '~/modules/User';
import { errorHandler } from '~/utils/errorHandler';

import { YoutubeVideo } from '../YoutubeVideo.model';

export const createYoutubeVideoController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user;

    const { title, embedId, autoplay, mute, projects, isMain } = req.body;

    const video = new YoutubeVideo({
      author: userId,
      title,
      embedId,
      isMain,
      autoplay,
      mute,
      projects,
    });

    await User.findByIdAndUpdate(req.body.user.userId, {
      $push: { youtubeVideos: video._id },
    });

    if (isMain) {
      await YoutubeVideo.updateMany({ isMain: true }, { isMain: false });
    }

    if (Array.isArray(projects) && projects?.length) {
      await Project.updateMany(
        { _id: { $in: projects } },
        {
          youtubeVideo: video._id,
        },
      );

      await YoutubeVideo.updateMany(
        { projects: { $in: projects } },
        {
          $pullAll: { projects },
        },
      );
    }
    await video.save();

    return res.status(201).json(video);
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'Create Youtube video error');
    return res.status(statusCode).json({ message });
  }
};
