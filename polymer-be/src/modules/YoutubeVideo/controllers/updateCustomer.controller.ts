import { Request, Response } from 'express';

import { Project } from '~/modules/Project';

import { YoutubeVideo } from '../YoutubeVideo.model';

export const updateYoutubeVideoController = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;
    const { title, embedId, autoplay, mute, isMain, projects } = req.body;

    if (isMain) {
      const mainVideo = await YoutubeVideo.findOne({ isMain: true });
      if (mainVideo && mainVideo._id !== videoId) await mainVideo.update({ isMain: false });
    }

    if (Array.isArray(projects)) {
      await Project.updateMany({ youtubeVideo: videoId }, { $pull: { youtubeVideo: videoId } });
      if (projects.length)
        await Project.updateMany({ _id: { $in: projects } }, { $push: { youtubeVideo: videoId } });
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
