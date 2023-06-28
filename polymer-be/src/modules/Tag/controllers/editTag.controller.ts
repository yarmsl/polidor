import { Request, Response } from 'express';

import { Project } from '~/modules/Project';
import { errorHandler, existsError } from '~/utils/errorHandler';

import { Tag } from '../Tag.model';

export const editTagController = async (req: Request, res: Response) => {
  try {
    const { tagId } = req.params;
    const { name, slug, order, projects } = req.body;

    const checkExistName = await Tag.findOne({ name });
    if (checkExistName) existsError();

    const checkExistSlug = await Tag.findOne({ slug });
    if (checkExistSlug) existsError();

    if (Array.isArray(projects)) {
      await Project.updateMany({ tags: tagId }, { $pull: { tags: tagId } });
      if (projects.length) await Project.updateMany({ _id: { $in: projects } }, { tags: tagId });
    }

    const editedTag = await Tag.findByIdAndUpdate(
      tagId,
      { name, slug, order, projects },
      { new: true },
    );

    return res.status(200).json(editedTag);
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'Ошибка изменения тега');
    return res.status(statusCode).json({ message });
  }
};
