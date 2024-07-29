import { Router } from 'express';

import * as controller from './controller.js';
import { auth } from '../auth.js';

export const router = Router();

router.route('/signup').post(controller.signup);
router.route('/signin').post(controller.signin);

router.route('/').get(controller.all);

router.param('id', controller.id);

router
  .route('/:id')
  .get(auth, controller.read)
  .put(auth, controller.update)
  .delete(auth, controller.remove);
