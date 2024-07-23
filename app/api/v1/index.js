import { Router } from 'express';

import { router as todos } from './todos/index.js';

export const router = Router();

router.use('/todos', todos);
