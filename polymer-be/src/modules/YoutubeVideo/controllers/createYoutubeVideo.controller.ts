import { Request, Response } from 'express';

import { Project } from '~/modules/Project';
import { User } from '~/modules/User';
import { errorHandler } from '~/utils/errorHandler';

import { YoutubeVideo } from '../YoutubeVideo.model';

export const createYoutubeVideoController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user;

    const { title, embedId, autoplay, mute, projects } = req.body;

    console.log(title, embedId, autoplay, mute, projects);

    const video = new YoutubeVideo({
      author: userId,
      title,
      embedId,
      autoplay,
      mute,
      projects,
    });
    await video.save();
    await User.findByIdAndUpdate(req.body.user.userId, {
      $push: { youtubeVideos: video._id },
    });

    if (Array.isArray(projects) && projects?.length)
      await Project.updateMany(
        { _id: { $in: projects } },
        {
          $push: { youtubeVideo: video._id },
        },
      );

    res.status(201).json(video);
    return;
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'Create Youtube video error');
    return res.status(statusCode).json({ message });
  }
};
