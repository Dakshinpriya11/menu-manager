import { Router } from 'express';
import * as controller from './auth.controller';

const router = Router();

// Login route
router.post('/login', controller.login);

export default router;
