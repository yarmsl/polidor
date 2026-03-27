import { Router } from 'express';

import { authCheck } from '~/modules/Auth/';

import {
  readMainVideosController,
  createVideoController,
  readVideosController,
  updateVideoController,
  deleteVideoController,
} from './controllers';

const router = Router();

router.get('/main', readMainVideosController);
router.post('/', authCheck, createVideoController);
router.get('/', authCheck, readVideosController);
router.delete('/:videoId', authCheck, deleteVideoController);
router.put('/:videoId', authCheck, updateVideoController);

export * from './Video.model';
export default router;
