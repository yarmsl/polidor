import { Request, Response } from 'express';

import { Customer } from '~/modules/Customer/';
import { Tag } from '~/modules/Tag';
import { User } from '~/modules/User/';
import { Video } from '~/modules/Video';

import { Project } from '../Project.model';

export const addProjectController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user;
    const images =
      req.files != null ? (req.files as Express.Multer.File[]).map((file) => file.path) : [];
    const { title, year, done, customer, tags, slug, order, video } = req.body;
    const arrTags = Array.isArray(tags) ? tags : tags != null ? [tags] : [];
    const projectExist = await Project.findOne({ slug });
    if (projectExist) {
      res.status(400).json({ message: 'this project exists' });
      return;
    }
    const newProject = new Project({
      author: userId,
      title,
      year,
      done,
      images,
      customer,
      tags: arrTags,
      slug,
      order,
      video,
    });
    await newProject.save();
    await Customer.findByIdAndUpdate(customer, {
      $push: { projects: newProject._id },
    });
    arrTags?.forEach(async (tag: string) => {
      await Tag.findByIdAndUpdate(tag, { $push: { projects: newProject._id } });
    });
    await User.findByIdAndUpdate(req.body.user.userId, {
      $push: { projects: newProject._id },
    });
    if (video) await Video.findByIdAndUpdate(video, { $push: { projects: newProject._id } });
    return res.status(201).json(newProject);
  } catch (e) {
    return res.status(500).json({ message: 'adding project error' });
  }
};
