import { Request, Response } from 'express';

import { StoryArticle } from '../StoryArticle.model';

export const editStoryArticleController = async (req: Request, res: Response) => {
  try {
    const { storyId } = req.params;
    const { title, content } = req.body;

    const result = await StoryArticle.findByIdAndUpdate(storyId, { title, content }, { new: true });
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ message: 'story article error' });
  }
};
