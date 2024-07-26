import { Router } from 'express';

import * as controller from './controller.js';

export const router = Router({ mergeParams: true });

router.route('/').post(controller.create).get(controller.all);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.remove);
