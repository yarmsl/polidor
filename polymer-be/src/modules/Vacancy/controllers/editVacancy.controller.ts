import { Request, Response } from 'express';

import { Vacancy } from '../Vacancy.model';

export const editVacancyController = async (req: Request, res: Response) => {
  try {
    const { vacancyId } = req.params;
    const { title, requirements, wage } = req.body;

    const result = await Vacancy.findByIdAndUpdate(
      vacancyId,
      {
        title,
        requirements,
        wage,
      },
      { new: true },
    );

    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ message: 'vacancy error' });
  }
};
