import { Router } from 'express';
import * as controller from './orderType.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { allowRoles } from '../../middlewares/role.middleware';
import { validate } from '../../middlewares/validation.middleware';
import { updateOrderTypeSchema } from './orderType.validation';
import { ROLES } from '../../constants/constants';

const router = Router();

router.patch('/', authMiddleware, allowRoles(ROLES.OWNER), validate(updateOrderTypeSchema), controller.update);
router.get('/', controller.getAll);

export default router;
