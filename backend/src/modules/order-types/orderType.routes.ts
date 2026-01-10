import { Router } from 'express';
import * as controller from './orderType.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { allowRoles } from '../../middlewares/role.middleware';

const router = Router();

// PATCH /api/order-types => bulk update all order types
router.patch('/', authMiddleware, allowRoles('OWNER'), controller.update);

// GET all order types
router.get('/', controller.getAll);

export default router;
