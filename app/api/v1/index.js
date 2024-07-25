import { Router } from 'express';
import { router as todos } from './todos/routes.js';
import { router as groups } from './groups/routes.js';
import { router as users } from './users/routes.js';

export const router = Router();

router.use('/todos', todos);
router.use('/groups', groups);
router.use('/users', users);
