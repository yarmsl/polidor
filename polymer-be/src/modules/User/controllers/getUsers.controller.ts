import { Request, Response } from 'express';

import { errorHandler, notFoundError } from '~/utils/errorHandler';

import { User } from '../User.model';

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    if (!Array.isArray(users) || !users.length) throw notFoundError();

    return res.status(200).json(users);
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'get users error');
    return res.status(statusCode).json({ message });
  }
};
