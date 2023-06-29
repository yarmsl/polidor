import { Request, Response } from 'express';

import { Project } from '~/modules/Project';
import { User } from '~/modules/User';
import { errorHandler, notFoundError } from '~/utils/errorHandler';

import { Tag } from '../Tag.model';

export const deleteTagController = async (req: Request, res: Response) => {
  try {
    const { tagId } = req.params;
    const removingTag = await Tag.findById(tagId);

    if (removingTag) {
      await User.findByIdAndUpdate(removingTag.author, {
        $pull: { tags: removingTag._id },
      });

      await Project.updateMany(
        { tags: { $eq: removingTag._id } },
        { $pull: { tags: removingTag._id } },
      );

      await removingTag.delete();

      return res.status(200).json({ message: 'Тег успешно удален' });
    } else {
      throw notFoundError();
    }
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'Ошибка удаления тега');
    return res.status(statusCode).json({ message });
  }
};
