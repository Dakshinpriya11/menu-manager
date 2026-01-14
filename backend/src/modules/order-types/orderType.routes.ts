// src/modules/order-types/orderType.routes.ts
import { Router } from 'express';
import * as controller from './orderType.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { allowRoles } from '../../middlewares/role.middleware';
import { validate } from '../../middlewares/validation.middleware';
import { updateOrderTypeSchema } from './orderType.validation';

const router = Router();

// PATCH /api/order-types => bulk update all order types
router.patch('/', authMiddleware, allowRoles('OWNER'), validate(updateOrderTypeSchema), controller.update);

// GET all order types
router.get('/', controller.getAll);

export default router;
