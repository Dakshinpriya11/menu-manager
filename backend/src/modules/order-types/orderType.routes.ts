import { Router } from 'express';
import * as controller from './orderType.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { allowRoles } from '../../middlewares/role.middleware';

const router = Router();
router.patch('/:id', authMiddleware, allowRoles('OWNER'), controller.update);
router.get('/', controller.getAll);

export default router;
