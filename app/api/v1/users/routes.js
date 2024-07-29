import { Router } from 'express';

import * as controller from './controller.js';

export const router = Router();

router.route('/signup').post(controller.signup);
router.route('/signin').post(controller.signin);

router.route('/').get(controller.all);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.remove);
