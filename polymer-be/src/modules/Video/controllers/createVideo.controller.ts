import { Request, Response } from 'express';

import { Project } from '~/modules/Project';
import { User } from '~/modules/User';
import { errorHandler } from '~/utils/errorHandler';

import { Video } from '../Video.model';

export const createVideoController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user;

    const { title, embedId, autoplay, mute, projects, isMain } = req.body;

    const video = new Video({
      author: userId,
      title,
      embedId,
      isMain,
      autoplay,
      mute,
      projects,
    });

    await User.findByIdAndUpdate(req.body.user.userId, {
      $push: { videos: video._id },
    });

    if (isMain) {
      await Video.updateMany({ isMain: true }, { isMain: false });
    }

    if (Array.isArray(projects) && projects?.length) {
      await Project.updateMany(
        { _id: { $in: projects } },
        {
          video: video._id,
        },
      );

      await Video.updateMany(
        { projects: { $in: projects } },
        {
          $pullAll: { projects },
        },
      );
    }
    await video.save();

    return res.status(201).json(video);
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'Create video error');
    return res.status(statusCode).json({ message });
  }
};
