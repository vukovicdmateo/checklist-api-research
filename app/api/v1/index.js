import { Router } from 'express';

import { router as todos } from './todos/routes.js';

export const router = Router();

router.use('/todos', todos);
