// src/modules/menus/menu.routes.ts
import { Router } from 'express';
import * as controller from './menu.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { allowRoles } from '../../middlewares/role.middleware';
import { validate } from '../../middlewares/validation.middleware';
import { createMenuSchema, updateMenuSchema, deleteMenuSchema, getPriceModifierSchema } from './menu.validation';

const router = Router();

// Owner-only routes with validation
router.post('/', authMiddleware, allowRoles('OWNER'), validate(createMenuSchema), controller.createMenu);
router.put('/:id', authMiddleware, allowRoles('OWNER'), validate(updateMenuSchema), controller.updateMenu);
router.delete('/:id', authMiddleware, allowRoles('OWNER'), validate(deleteMenuSchema), controller.deleteMenu);

// Public routes
router.get('/active', controller.getActiveMenu);
router.get('/customer/menu', validate(getPriceModifierSchema), controller.getCustomerMenu);

export default router;
