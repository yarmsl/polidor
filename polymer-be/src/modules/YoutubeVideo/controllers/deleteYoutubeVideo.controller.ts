import { Request, Response } from 'express';

import { Project } from '~/modules/Project';
import { User } from '~/modules/User';
import { errorHandler, notFoundError } from '~/utils/errorHandler';

import { YoutubeVideo } from '../YoutubeVideo.model';

export const deleteYoutubeVideoController = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;
    const removingVideo = await YoutubeVideo.findById(videoId);
    if (removingVideo) {
      await User.findByIdAndUpdate(removingVideo.author, {
        $pull: { youtubeVideos: removingVideo._id },
      });

      await Project.updateMany({ youtubeVideo: removingVideo._id }, { youtubeVideo: null });

      await removingVideo.delete();
      return res.status(200).json({ message: 'Yotube video successfully removed' });
    } else {
      throw notFoundError('Youtube video not found');
    }
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'Removing Youtube video error');
    return res.status(statusCode).json({ message });
  }
};
