import { Router } from 'express';
import * as controller from './auth.controller';
import { validate } from '../../middlewares/validation.middleware';
import { loginSchema } from './auth.validation';

const router = Router();

// Login route
router.post('/login', validate(loginSchema), controller.login);

export default router;
