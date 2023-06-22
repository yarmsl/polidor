import { existsSync, unlinkSync } from 'fs';

import { Request, Response } from 'express';

import { Article } from '../Article.model';

export const updateArticleController = async (req: Request, res: Response) => {
  try {
    const { articleId } = req.params;
    let images: string[] | undefined = undefined;
    const imagesFilesPaths =
      req.files != null ? (req.files as Express.Multer.File[]).map((file) => file.path) : [];
    const { title, content, images: imagesPaths } = req.body;

    const editingArticle = await Article.findById(articleId);

    if (imagesFilesPaths.length > 0) {
      if (
        editingArticle != null &&
        Array.isArray(editingArticle.images) &&
        editingArticle.images.length > 0
      ) {
        images = editingArticle.images.concat(imagesFilesPaths);
      } else {
        images = imagesFilesPaths;
      }
    } else if (Array.isArray(imagesPaths) && imagesPaths.length > 0) {
      if (
        editingArticle != null &&
        Array.isArray(editingArticle.images) &&
        editingArticle.images.length > 0
      ) {
        editingArticle.images.forEach((img) => {
          if (!imagesPaths.includes(img)) {
            if (existsSync(img)) {
              unlinkSync(img);
            }
          }
        });
      }
      images = imagesPaths;
    } else {
      images = undefined;
    }

    if (editingArticle) {
      const result = await Article.findByIdAndUpdate(
        editingArticle._id,
        { title, content, images },
        { new: true },
      );
      return res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'article not found' });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: 'editing article error' });
    return;
  }
};
