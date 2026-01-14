// src/modules/users/user.routes.ts
import { Router } from 'express';
import * as controller from './user.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { allowRoles } from '../../middlewares/role.middleware';
import { validate } from '../../middlewares/validation.middleware';
import { addStaffSchema } from './user.validation';

const router = Router();

// Owner can create staff
router.post('/staff', authMiddleware, allowRoles('OWNER'), validate(addStaffSchema), controller.addStaff);

export default router;
