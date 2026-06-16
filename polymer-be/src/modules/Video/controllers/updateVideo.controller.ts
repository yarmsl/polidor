import { Request, Response } from 'express';

import { Project } from '~/modules/Project';

import { Video } from '../Video.model';

export const updateVideoController = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;
    const { title, embedId, autoplay, mute, isMain, projects } = req.body;

    if (Array.isArray(projects)) {
      await Project.updateMany({ videos: videoId }, { $pull: { videos: videoId } });

      if (projects.length)
        await Project.updateMany({ _id: { $in: projects } }, { $addToSet: { videos: videoId } });
    }

    const editedVideo = await Video.findByIdAndUpdate(
      videoId,
      { title, embedId, autoplay, mute, isMain, projects },
      { new: true },
    );

    res.status(200).json(editedVideo);
    return;
  } catch (e) {
    res.status(500).json({ message: 'editing video error' });
    return;
  }
};
