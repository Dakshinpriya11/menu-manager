import { Router } from 'express';
import * as controller from './user.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { allowRoles } from '../../middlewares/role.middleware';

const router = Router();

// Owner can create staff
router.post('/staff', authMiddleware, allowRoles('OWNER'), controller.addStaff);

export default router; 
