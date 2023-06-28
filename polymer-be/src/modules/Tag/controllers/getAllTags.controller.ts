import { Request, Response } from 'express';

import { errorHandler } from '~/utils/errorHandler';

import { Tag } from '../Tag.model';

export const getAllTagsController = async (req: Request, res: Response) => {
  const userId = req.body?.user?.userId;
  try {
    const tags = await Tag.find().populate(['author', 'projects']);
    if (Array.isArray(tags) && tags.length > 0) {
      tags?.sort((a, b) => a.order - b.order);
    }
    if (userId) {
      return res.status(200).json(tags);
    } else {
      const tagsFE = tags?.map((tag) => {
        return {
          _id: tag._id,
          projects: tag.projects,
          name: tag.name,
          slug: tag.slug,
          order: tag.order,
        };
      });
      return res.status(200).json(tagsFE);
    }
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'Ошибка получения тегов');
    return res.status(statusCode).json({ message });
  }
};
