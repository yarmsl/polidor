import { Request, Response } from 'express';

import { Story } from '../Story.model';

export const editStoryController = async (req: Request, res: Response) => {
  try {
    const { storyId } = req.params;
    const { from, content, to } = req.body;

    const editedStory = Story.findByIdAndUpdate(storyId, { to, content, from }, { new: true });
    return res.status(200).json(editedStory);
  } catch (e) {
    return res.status(500).json({ message: 'story error' });
  }
};
