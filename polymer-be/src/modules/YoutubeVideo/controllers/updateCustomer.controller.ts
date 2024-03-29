import { Request, Response } from 'express';

import { Project } from '~/modules/Project';

import { YoutubeVideo } from '../YoutubeVideo.model';

export const updateYoutubeVideoController = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;
    const { title, embedId, autoplay, mute, isMain, projects } = req.body;

    if (isMain) {
      await YoutubeVideo.updateMany({ isMain: true }, { isMain: false });
    }

    if (Array.isArray(projects)) {
      await Project.updateMany({ youtubeVideo: videoId }, { youtubeVideo: null });
      if (projects.length)
        await Project.updateMany({ _id: { $in: projects } }, { youtubeVideo: videoId });
      await YoutubeVideo.updateMany(
        { projects: { $in: projects } },
        {
          $pullAll: { projects },
        },
      );
    }

    const editedVideo = await YoutubeVideo.findByIdAndUpdate(
      videoId,
      { title, embedId, autoplay, mute, isMain, projects },
      { new: true },
    );
    res.status(200).json(editedVideo);
    return;
  } catch (e) {
    res.status(500).json({ message: 'editing Yotube video error' });
    return;
  }
};
