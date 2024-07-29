import { Router } from 'express';

import * as controller from './controller.js';
import { auth, owner } from '../auth.js';

export const router = Router({ mergeParams: true });

router.route('/').post(auth, controller.create).get(controller.all);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(auth, owner, controller.update)
  .delete(auth, owner, controller.remove);
