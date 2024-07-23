import { Router } from 'express';

import * as controller from './controller.js';

export const router = Router();

router.route('/').post(controller.create).get(controller.all);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.remove);
