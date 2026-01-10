import { Router } from 'express';
import * as controller from './menu.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { allowRoles } from '../../middlewares/role.middleware';

const router = Router();

router.post('/', authMiddleware, allowRoles('OWNER'), controller.createMenu);
router.put('/:id', authMiddleware, allowRoles('OWNER'), controller.updateMenu);
router.delete('/:id', authMiddleware, allowRoles('OWNER'), controller.deleteMenu);
router.get('/active', controller.getActiveMenu);

export default router;
