import { Router } from 'express';
import * as controller from './menu.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { allowRoles } from '../../middlewares/role.middleware';
import { validate } from '../../middlewares/validation.middleware';
import { createMenuSchema, updateMenuSchema, deleteMenuSchema, getPriceModifierSchema } from './menu.validation';
import { ROLES } from '../../constants/constants';

const router = Router();

router.post('/', authMiddleware, allowRoles(ROLES.OWNER), validate(createMenuSchema), controller.createMenu);
router.put('/:id', authMiddleware, allowRoles(ROLES.OWNER), validate(updateMenuSchema), controller.updateMenu);
router.delete('/:id', authMiddleware, allowRoles(ROLES.OWNER), validate(deleteMenuSchema), controller.deleteMenu);

router.get('/active', controller.getActiveMenu);
router.get('/customer/menu', validate(getPriceModifierSchema), controller.getCustomerMenu);

export default router;
