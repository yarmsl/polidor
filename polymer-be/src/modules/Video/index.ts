import { Router } from 'express';

import { authCheck } from '~/modules/Auth/';

import {
  createVideoController,
  readVideosController,
  updateVideoController,
  deleteVideoController,
  readMainVideosController,
} from './controllers';

const router = Router();

router.get('/main', readMainVideosController);
router.post('/', authCheck, createVideoController);
router.get('/cp', authCheck, readVideosController);
router.get('/', readVideosController);
router.delete('/:videoId', authCheck, deleteVideoController);
router.put('/:videoId', authCheck, updateVideoController);

export * from './Video.model';
export default router;
