import { Request, Response } from 'express';

import { Project } from '~/modules/Project';
import { User } from '~/modules/User';
import { errorHandler, notFoundError } from '~/utils/errorHandler';

import { Video } from '../Video.model';

export const deleteVideoController = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;
    const removingVideo = await Video.findById(videoId);
    if (removingVideo) {
      await User.findByIdAndUpdate(removingVideo.author, {
        $pull: { youtubeVideos: removingVideo._id },
      });

      await Project.updateMany({ youtubeVideo: removingVideo._id }, { video: null });

      await removingVideo.delete();
      return res.status(200).json({ message: 'video successfully removed' });
    } else {
      throw notFoundError('video not found');
    }
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'Removing video error');
    return res.status(statusCode).json({ message });
  }
};
