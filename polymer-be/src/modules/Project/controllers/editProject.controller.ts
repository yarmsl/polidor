import { existsSync, unlinkSync } from 'fs';

import { Request, Response } from 'express';

import { Customer } from '~/modules/Customer';
import { Tag } from '~/modules/Tag';
import { errorHandler, existsError, notFoundError } from '~/utils/errorHandler';

import { Project } from '../Project.model';

export const editProjectController = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    let images: string[] | undefined = undefined;
    const imagesFilesPaths =
      req.files != null ? (req.files as Express.Multer.File[]).map((file) => file.path) : [];
    const { title, year, done, customer, tags, images: imagesPaths, slug, order } = req.body;
    const projectExist = await Project.findOne({ slug });
    if (projectExist) {
      throw existsError('this project exists');
    }

    const editingProject = await Project.findById(projectId);

    if (imagesFilesPaths.length > 0) {
      if (
        editingProject != null &&
        Array.isArray(editingProject.images) &&
        editingProject.images.length > 0
      ) {
        images = editingProject.images.concat(imagesFilesPaths);
      } else {
        images = imagesFilesPaths;
      }
    } else if (Array.isArray(imagesPaths) && imagesPaths.length > 0) {
      if (
        editingProject != null &&
        Array.isArray(editingProject.images) &&
        editingProject.images.length > 0
      ) {
        editingProject.images.forEach((img) => {
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

    if (editingProject) {
      if ((customer && customer !== editingProject?.customer?.toString()) || '') {
        await Customer.findByIdAndUpdate(editingProject.customer, {
          $pull: { projects: editingProject._id },
        });
        await Customer.findByIdAndUpdate(customer, {
          $push: { projects: editingProject._id },
        });
      }
      if (Array.isArray(tags)) {
        await Tag.updateMany(
          { projects: { $eq: editingProject._id } },
          { $pull: { projects: editingProject._id } },
        );
        if (tags.length)
          await Tag.updateMany({ _id: { $in: tags } }, { $push: { projects: editingProject._id } });
      }

      const result = await Project.findByIdAndUpdate(projectId, {
        title,
        year,
        done,
        customer,
        tags,
        images,
        slug,
        order,
      });
      return res.status(200).json(result);
    } else {
      throw notFoundError('project not found');
    }
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'editing project error');
    return res.status(statusCode).json({ message });
  }
};
