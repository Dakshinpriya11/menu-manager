import { Router } from 'express';
import * as controller from './user.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { allowRoles } from '../../middlewares/role.middleware';
import { validate } from '../../middlewares/validation.middleware';
import { addStaffSchema } from './user.validation';
import { ROLES } from '../../constants/constants';

const router = Router();

router.post('/staff', authMiddleware, allowRoles(ROLES.OWNER), validate(addStaffSchema), controller.addStaff);

export default router;
