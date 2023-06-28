import { Request, Response } from 'express';

import { Project } from '~/modules/Project';
import { User } from '~/modules/User';
import { errorHandler, existsError } from '~/utils/errorHandler';

import { Tag } from '../Tag.model';

export const addTagController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user;
    const { name, slug, order, projects } = req.body;

    const checkExistName = await Tag.findOne({ name });
    if (checkExistName) existsError();

    const checkExistSlug = await Tag.findOne({ slug });
    if (checkExistSlug) throw existsError();

    const tag = new Tag({ author: userId, name, slug, order, projects });

    if (Array.isArray(projects) && projects?.length) {
      await Project.updateMany({ _id: { $in: projects } }, { $push: { tags: tag._id } });
    }

    await User.findByIdAndUpdate(userId, { $push: { tags: tag._id } });

    await tag.save();
    return res.status(201).json(tag);
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'Ошибка добавления тега');
    return res.status(statusCode).json({ message });
  }
};
