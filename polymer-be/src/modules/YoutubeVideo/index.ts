import { Router } from 'express';

import { authCheck } from '~/modules/Auth/';

import {
  readMainYouTubeVideosController,
  createYoutubeVideoController,
  readYouTubeVideosController,
  updateYoutubeVideoController,
  deleteYoutubeVideoController,
} from './controllers';

const router = Router();

router.get('/main', readMainYouTubeVideosController);
router.post('/', authCheck, createYoutubeVideoController);
router.get('/', authCheck, readYouTubeVideosController);
router.delete('/:videoId', authCheck, deleteYoutubeVideoController);
router.put('/:videoId', authCheck, updateYoutubeVideoController);

export * from './YoutubeVideo.model';
export default router;
