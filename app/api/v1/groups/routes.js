import { Router } from 'express';

import * as controller from './controller.js';
import { router as todosRouter } from './../todos/routes.js';
import { auth } from '../auth.js';

export const router = Router();

router.route('/').post(auth, controller.create).get(controller.all);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(auth, controller.update)
  .delete(auth, controller.remove);

router.use('/:groupId/todos', todosRouter);
