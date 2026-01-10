import { Router } from 'express';
import * as controller from './menu.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { allowRoles } from '../../middlewares/role.middleware';

const router = Router();

// Owner-only routes
router.post('/', authMiddleware, allowRoles('OWNER'), controller.createMenu);
router.put('/:id', authMiddleware, allowRoles('OWNER'), controller.updateMenu);
router.delete('/:id', authMiddleware, allowRoles('OWNER'), controller.deleteMenu);

// Everyone can get active menu
router.get('/active', controller.getActiveMenu);

// Customer menu with price modifier (order_type query param required)
router.get('/customer/menu', controller.getCustomerMenu);

export default router;
